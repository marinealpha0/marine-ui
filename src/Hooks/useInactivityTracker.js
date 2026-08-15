import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '@/store';

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
const WARNING_DURATION = 30 * 1000; // 30 seconds
const THROTTLE_LIMIT = 1000; // 1 second

const STORAGE_KEY = 'uv_last_activity';

// Broadcast Channel Message Types
const MSG_USER_ACTIVE = 'USER_ACTIVE';
const MSG_SHOW_WARNING = 'SHOW_WARNING';
const MSG_FORCE_LOGOUT = 'FORCE_LOGOUT';

export const useInactivityTracker = () => {
    // Access logout from useAuthStore
    const logout = useAuthStore((state) => state.logout);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState(WARNING_DURATION / 1000);

    // Refs for timers and state
    const inactivityTimerRef = useRef(null);
    const warningCountdownRef = useRef(null);
    const lastActivityRef = useRef(Date.now());
    const channelRef = useRef(null);

    // Initialize Broadcast Channel
    useEffect(() => {
        channelRef.current = new BroadcastChannel('uv_session_sync');

        channelRef.current.onmessage = (event) => {
            if (!isAuthenticated) return;

            switch (event.data) {
                case MSG_USER_ACTIVE:
                    // Another tab is active, reset local timers WITHOUT broadcast
                    resetInactivityTimer(false);
                    break;
                case MSG_SHOW_WARNING:
                    // Another tab triggered warning, show it here too
                    // We sync the warning state to ensure consistent UX
                    if (!isWarningOpen) {
                        startWarningPhase(false);
                    }
                    break;
                case MSG_FORCE_LOGOUT:
                    // Another tab logged out
                    performLogout(true);
                    break;
                default:
                    break;
            }
        };

        return () => {
            if (channelRef.current) {
                channelRef.current.close();
            }
        };
    }, [isAuthenticated, isWarningOpen]); // Dependencies might need tuning

    const performLogout = useCallback((isRemote = false) => {
        // Clear all timers
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (warningCountdownRef.current) clearInterval(warningCountdownRef.current);

        // Remove storage
        if (!isRemote) { // Only the initiator clears it, though safe to clear always
            localStorage.removeItem(STORAGE_KEY);
        }

        // If it's a local action, notify others
        if (!isRemote && channelRef.current) {
            channelRef.current.postMessage(MSG_FORCE_LOGOUT);
        }

        // Call the actual logout function
        // Pass true to logout() if it's a remote force logout (optimization to skip API call if needed, 
        // though typically we want to clear local state regardless)
        logout(isRemote);

        // UI Reset
        setIsWarningOpen(false);
    }, [logout]);

    const startWarningPhase = useCallback((broadcast = true) => {
        if (warningCountdownRef.current) clearInterval(warningCountdownRef.current);
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

        setIsWarningOpen(true);
        setRemainingTime(WARNING_DURATION / 1000);

        if (broadcast && channelRef.current) {
            channelRef.current.postMessage(MSG_SHOW_WARNING);
        }

        // Start countdown
        let secondsLeft = WARNING_DURATION / 1000;
        warningCountdownRef.current = setInterval(() => {
            secondsLeft -= 1;
            setRemainingTime(secondsLeft);

            if (secondsLeft <= 0) {
                clearInterval(warningCountdownRef.current);
                performLogout();
            }
        }, 1000);
    }, [performLogout]);

    const resetInactivityTimer = useCallback((broadcast = true) => {
        // Clear existing timers
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (warningCountdownRef.current) clearInterval(warningCountdownRef.current);

        // Reset UI state if warning was open
        setIsWarningOpen((prev) => {
            if (prev) return false;
            return prev;
        });

        if (broadcast) {
            // Local user activity: update storage + broadcast
            const nowStr = Date.now().toString();
            localStorage.setItem(STORAGE_KEY, nowStr);
            if (channelRef.current) {
                channelRef.current.postMessage(MSG_USER_ACTIVE);
            }
        }

        // Calculate how much time is actually left based on global storage
        // This ensures new tabs sync with the oldest active time
        let timeoutDuration = INACTIVITY_LIMIT;

        if (!broadcast) {
            // If checking from remote/init, don't assume full 10m.
            // Check when the last REAL activity was.
            const savedTime = localStorage.getItem(STORAGE_KEY);
            if (savedTime) {
                const elapsed = Date.now() - parseInt(savedTime, 10);
                if (elapsed < INACTIVITY_LIMIT) {
                    timeoutDuration = Math.max(0, INACTIVITY_LIMIT - elapsed);
                } else {
                    // We are already past limit?
                    // Safe buffer: if we just mounted and it's expired, trigger warning immediately
                    // But maybe smaller buffer to allow 'just barely' expired to sync via channel
                    timeoutDuration = 0;
                }
            }
        } else {
            // If we just broadcasted, we updated the time to NOW, so full duration is correct.
            timeoutDuration = INACTIVITY_LIMIT;
        }

        // Start new inactivity timer
        inactivityTimerRef.current = setTimeout(() => {
            startWarningPhase(true); // Always broadcast when THIS tab triggers the warning
        }, timeoutDuration);

    }, [startWarningPhase]);

    // Handle user activity (Throttled)
    const handleActivity = useCallback(() => {
        if (!isAuthenticated) return;

        // If warning dialog is open, ignore passive activity.
        // User must explicitly click "Continue" or "Logout".
        if (isWarningOpen) return;

        const now = Date.now();
        if (now - lastActivityRef.current < THROTTLE_LIMIT) {
            return;
        }
        lastActivityRef.current = now;

        resetInactivityTimer(true);

    }, [isAuthenticated, isWarningOpen, resetInactivityTimer]);

    // Initialize timer on auth
    useEffect(() => {
        if (isAuthenticated) {
            const lastActivity = localStorage.getItem(STORAGE_KEY);

            // Check if session has already expired based on storage
            if (lastActivity) {
                const elapsed = Date.now() - parseInt(lastActivity, 10);
                if (elapsed > INACTIVITY_LIMIT) {
                    performLogout();
                    return; // Stop execution, user is logged out
                }
            }

            // On mount/auth, ensure we have a valid start time if none exists
            if (!lastActivity) {
                localStorage.setItem(STORAGE_KEY, Date.now().toString());
            }

            resetInactivityTimer(true);
        }

        return () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
            if (warningCountdownRef.current) clearInterval(warningCountdownRef.current);
        };
    }, [isAuthenticated, resetInactivityTimer, performLogout]);

    // Setup Event Listeners
    useEffect(() => {
        if (!isAuthenticated) return;

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        const onEvent = () => handleActivity();

        events.forEach(event => {
            window.addEventListener(event, onEvent, { passive: true });
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, onEvent);
            });
        };
    }, [isAuthenticated, handleActivity]);

    return {
        isWarningOpen,
        remainingTime,
        keepAlive: () => resetInactivityTimer(true),
        handleLogout: () => performLogout(false)
    };
};
