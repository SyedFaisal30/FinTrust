import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

function App() {
  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
          {
            withCredentials: true,
          }
        );

        const accessToken = res?.data?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      } catch (err) {
        console.log("Refresh token failed or expired", err?.response?.data?.message);
        localStorage.removeItem("accessToken");
      }
    };

    tryRefreshToken();
  }, []);

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
