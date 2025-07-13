import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
