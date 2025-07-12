import { ToastProvider } from "./context/ToastContext";
import TestToast from "./components/TestToast";

function App() {
  return (
    <ToastProvider>
      <TestToast />
    </ToastProvider>
  );
}

export default App;
