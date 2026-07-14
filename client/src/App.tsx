import AppRoutes from "./router/AppRoutes";
import { ToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./store/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;