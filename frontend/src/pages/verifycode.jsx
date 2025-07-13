import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/useToast";

const VerifyCode = ({ email }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/verify`,
        { email, code }
      );

      if (res?.data?.status === 201) {
        showToast("success", "Account created successfully!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Enter Verification Code</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          name="code"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 flex items-center justify-center gap-2 text-white rounded-lg transition-all ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Verifying...
            </>
          ) : (
            "Verify & Create Account"
          )}
        </button>
      </form>
    </>
  );
};

export default VerifyCode;
