import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useAuthInitialization } from "@/Hooks/useAuthInitialization";
import { ErrorProvider, useError } from "@/store/ErrorContext";
import { AppContent } from "@/routes/AppRoutes";
import useFcmToken from "@/Hooks/useFcmToken";
import { usePwaInstall } from "@/Hooks/usePwaInstall";
import { useOfflineDetection } from "@/Hooks/useOfflineDetection";
import GlobalErrorScreen from "@/components/GlobalErrorScreen";
import InstallPrompt from "@/components/InstallPrompt";
import SessionManager from "@/components/Session/SessionManager";

import { queryClient } from "@/config/queryClient";
import './App.css';

const NotificationHandler = () => {
  useFcmToken();
  return null;
};

const AppWrapper = () => {
  const { hasError } = useError();
  const { show, install, decline } = usePwaInstall();

  // Set up auth initialization and offline detection
  useAuthInitialization();
  useOfflineDetection();

  // If there's a global error, show the error screen
  if (hasError) {
    return <GlobalErrorScreen />;
  }

  return (
    <>
      {show && <InstallPrompt onInstall={install} onCancel={decline} />}
      <SessionManager />
      <NotificationHandler />
      <AppContent />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </ErrorProvider>
  </QueryClientProvider>
);

export default App;
