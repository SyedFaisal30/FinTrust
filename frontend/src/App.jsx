import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import BankerLogin from "./pages/BankerLogin";
import BankerAccounts from "./pages/BankerAccounts";
import BankerCustomerTransactions from "./pages/BankerCustomerTransactions";

function App() {
  const location = useLocation();

  useEffect(() => {
    const tryRefreshToken = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn || location.pathname === "/banker-login") return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
          { withCredentials: true }
        );
        const accessToken = res?.data?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      } catch (err) {
        console.log("🔁 Refresh token failed:", err?.response?.data?.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
      }
    };

    tryRefreshToken();
  }, [location.pathname]);

  return (
    <div className="w-full flex flex-col bg-white text-gray-900">
      <Header />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/banker-login" element={<BankerLogin />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ✅ Protected Banker Routes */}
          <Route
            path="/banker/accounts"
            element={
              <PrivateRoute allowedRoles={["banker"]}>
                <BankerAccounts />
              </PrivateRoute>
            }
          />
          <Route
            path="/banker/customers/:userId/transactions"
            element={
              <PrivateRoute allowedRoles={["banker"]}>
                <BankerCustomerTransactions />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
