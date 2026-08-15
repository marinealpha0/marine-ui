import { useEffect } from 'react';
import { useError } from '@/store/ErrorContext';

export const useOfflineDetection = () => {
    const { setGlobalError, clearGlobalError } = useError();

    useEffect(() => {
        const handleOffline = () => {
            console.log('[Network] App is offline');
            setGlobalError('You are currently offline. Some features may not be available.');
        };

        const handleOnline = () => {
            console.log('[Network] App is back online');
            clearGlobalError();
        };

        // Check initial state
        if (!navigator.onLine) {
            handleOffline();
        }

        // Add event listeners
        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        // Cleanup
        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [setGlobalError, clearGlobalError]);
};
