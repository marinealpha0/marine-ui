import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/store";
import { formatNotificationData } from "@/constant";
import { markNotificationAsRead } from "@/api";

// Export this so it can be used elsewhere (like Login)
export const fetchToken = async () => {
    try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            let permission = Notification.permission;
            if (permission !== "granted") {
                permission = await Notification.requestPermission();
            }

            if (permission === "granted") {
                const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

                // Get the existing service worker registration
                const registration = await navigator.serviceWorker.ready;

                const currentToken = await getToken(messaging, {
                    vapidKey: vapidKey,
                    serviceWorkerRegistration: registration,
                });
                if (currentToken) {
                    return currentToken;
                } else {
                    console.error(
                        "No registration token available. Request permission to generate one."
                    );
                }
            } else {
                console.error("Notification permission denied");
            }
        }
    } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
    }
    return null;
};

const useFcmToken = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [token, setToken] = useState(null);
    const [notificationPermissionStatus, setNotificationPermissionStatus] =
        useState(Notification.permission);

    useEffect(() => {
        const retrieveToken = async () => {
            const currentToken = await fetchToken();
            setToken(currentToken);
            setNotificationPermissionStatus(Notification.permission);
        };

        retrieveToken();
    }, []);

    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Foreground message received:", payload);

            // Play sound
            // Using a generic pleasant notification sound
            const audio = new Audio("/notification_tone.mp3");
            audio.play().catch((error) => console.error("Error playing sound:", error));

            // Push to Zustand store
            const rawNotification = {
                _id: payload.data?.id || payload.data?._id || payload.messageId,
                actorName: payload.data?.actorName || "",
                targetName: payload.data?.targetName || "",
                action: payload.data?.action || "",
                actionId: payload.data?.actionId || "",
                isRead: false,
                createdAt: payload.data?.createdAt || new Date().toISOString(),
                data: payload.data || {},
            };

            const formatted = formatNotificationData(rawNotification);
            useNotificationStore.getState().addNotification(formatted);

            // Show fully clickable custom toast
            toast.custom((id) => (
                <div
                    onClick={() => {
                        toast.dismiss(id);
                        if (formatted.path) navigate(formatted.path);

                        // Mark as read API call
                        markNotificationAsRead(formatted._id)
                            .then((res) => {
                                if (res.status) {
                                    useNotificationStore.getState().markAsRead(formatted._id);
                                    queryClient.invalidateQueries(["admin_notifications"]);
                                }
                            })
                            .catch((err) => console.error("Error marking FCM notification as read:", err));
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        background: '#fff',
                        border: '1px solid #adadadff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        padding: '12px 14px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                        cursor: formatted.path ? 'pointer' : 'default',
                        width: '100%',
                        maxWidth: '360px',
                        userSelect: 'none',
                    }}
                >
                    <img
                        src="/logo192.png"
                        alt="App Logo"
                        style={{ width: 35, height: 28, borderRadius: '6px', objectFit: 'contain', flexShrink: 0, marginTop: 2 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {formatted.title}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {formatted.message}
                        </p>
                    </div>
                </div>
            ), {
                duration: 5000,
                unstyled: true,
                style: {
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                }
            });
        });

        return () => unsubscribe();
    }, [navigate]);

    return { token, notificationPermissionStatus };
};

export default useFcmToken;
