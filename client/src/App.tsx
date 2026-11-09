import AppRoutes from "./router/AppRoutes";
import { GlobalToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./store/AuthContext";
import { SocketProvider } from "./store/SocketContext";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <GlobalToastProvider>
          <AppRoutes />
        </GlobalToastProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;