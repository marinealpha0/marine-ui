import { useEffect, useState } from "react";
import { isProduction } from "@/utils/environment";

export const usePwaInstall = () => {
    const [prompt, setPrompt] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // 🧪 TEST MODE - Set to true to see prompt immediately in development
        const TEST_MODE = false; // Change to true for testing

        if (TEST_MODE) {
            console.log('[PWA] 🧪 TEST MODE - Showing install prompt immediately');
            setShow(true);
            return;
        }

        // Check if app is already installed and running in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone || // iOS Safari
            document.referrer.includes('android-app://'); // Android TWA

        if (isStandalone) {
            console.log('[PWA] App is already installed and running in standalone mode');
            localStorage.setItem("pwa-install-status", "installed");
            return;
        }

        // Check install status
        const installStatus = localStorage.getItem("pwa-install-status");
        const declinedTimestamp = localStorage.getItem("pwa-declined-timestamp");

        // If user installed the app, NEVER show prompt again
        if (installStatus === "installed") {
            console.log('[PWA] User has already installed the app');
            return;
        }

        // If user declined, check if 7 days have passed
        if (installStatus === "declined" && declinedTimestamp) {
            const daysSinceDeclined = (Date.now() - parseInt(declinedTimestamp)) / (1000 * 60 * 60 * 24);

            if (daysSinceDeclined < 7) {
                console.log(`[PWA] Install prompt declined ${Math.floor(daysSinceDeclined)} days ago. Will show again in ${Math.ceil(7 - daysSinceDeclined)} days.`);
                return;
            } else {
                console.log('[PWA] 7 days have passed since decline. User can see prompt again.');
                // Clear the declined status so prompt can show
                localStorage.removeItem("pwa-install-status");
                localStorage.removeItem("pwa-declined-timestamp");
            }
        }

        // Only show in production
        if (!isProduction()) {
            console.log('[PWA] Install prompt disabled - not in production');
            return;
        }

        const handleBeforeInstallPrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();

            // Stash the event so it can be triggered later
            setPrompt(e);

            // Show the install prompt UI
            setShow(true);

            console.log('[PWA] Install prompt ready');
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Check if app is already installed
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            localStorage.setItem("pwa-install-status", "installed");
            localStorage.removeItem("pwa-declined-timestamp");
            setShow(false);
        });

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const install = async () => {
        if (!prompt) {
            console.warn('[PWA] Install prompt not available');
            return;
        }

        try {
            // Show the install prompt
            prompt.prompt();

            // Wait for the user to respond to the prompt
            const { outcome } = await prompt.userChoice;

            console.log(`[PWA] User response: ${outcome}`);

            if (outcome === 'accepted') {
                // User accepted - mark as installed
                localStorage.setItem("pwa-install-status", "installed");
                localStorage.removeItem("pwa-declined-timestamp");
            } else {
                // User dismissed the browser prompt - treat as declined
                localStorage.setItem("pwa-install-status", "declined");
                localStorage.setItem("pwa-declined-timestamp", Date.now().toString());
            }

            // Hide the UI
            setShow(false);
            setPrompt(null);
        } catch (error) {
            console.error('[PWA] Install error:', error);
        }
    };

    const decline = () => {
        console.log('[PWA] User declined install');
        localStorage.setItem("pwa-install-status", "declined");
        localStorage.setItem("pwa-declined-timestamp", Date.now().toString());
        setShow(false);
        setPrompt(null);
    };

    return { show, install, decline };
};
