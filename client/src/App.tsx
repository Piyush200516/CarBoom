import AppRoutes from "./router/AppRoutes";
import { GlobalToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./store/AuthContext";

function App() {
  return (
    <AuthProvider>
      <GlobalToastProvider>
        <AppRoutes />
      </GlobalToastProvider>
    </AuthProvider>
  );
}

export default App;