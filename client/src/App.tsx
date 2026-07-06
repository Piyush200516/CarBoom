import AppRoutes from "./router/AppRoutes";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}

export default App;