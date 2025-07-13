import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, LogOut, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const updateLoginState = () => {
      const isAuth = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isAuth);
    };

    updateLoginState();
    const onStorageChange = () => updateLoginState();
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isLoggedIn");
      localStorage.setItem("logout-event", Date.now());
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2"
        >
          <UserCircle className="text-gray-800 w-6 h-6" />
          Banker<span className="text-gray-800">Op</span>
        </Link>

        {/* Auth Button */}
        <nav className="flex items-center gap-3 text-sm">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Signin</span>
            </Link>
          )}
        </nav>
      </div>    
    </header>
  );
};

export default Header;
