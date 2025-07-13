import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Banker<span className="text-gray-800">Op</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/features" className="hover:text-blue-600 transition">Features</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm px-4 py-2 border rounded-xl hover:bg-gray-50 transition">
            Login
          </Link>
          <Link to="/signup" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
