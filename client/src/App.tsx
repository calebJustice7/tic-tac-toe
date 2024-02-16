import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AbilityProvider } from "./context/AbilityContext";
import AppRouterProvider from "./router";
import { SocketProvider } from "./context/SocketContext";

const queryClient = new QueryClient();

function App() {
  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AbilityProvider>
            <ToastContainer position="top-left" pauseOnHover={false} />
            <AppRouterProvider queryClient={queryClient} />
          </AbilityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default App;
