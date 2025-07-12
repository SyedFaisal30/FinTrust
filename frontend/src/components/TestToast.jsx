import React from "react";
import { useToast } from "../context/ToastContext";

const TestToast = () => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-4 text-white">
      <button
        onClick={() => showToast("success", "Login successful!")}
        className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md"
      >
        Show Success Toast
      </button>

      <button
        onClick={() => showToast("error", "Something went wrong!")}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md"
      >
        Show Error Toast
      </button>

      <button
        onClick={() => showToast("info", "ℹJust so you know...")}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md"
      >
        Show Info Toast
      </button>

      <button
        onClick={() => showToast("warning", "Be careful!")}
        className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-md text-black"
      >
        Show Warning Toast
      </button>
    </div>
  );
};

export default TestToast;
