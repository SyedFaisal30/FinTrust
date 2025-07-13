import React, { useState } from "react";
import axios from "axios";
import VerifyCode from "./Verifycode";
import { useToast } from "../context/useToast";

const Signup = () => {
  const [step, setStep] = useState("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [emailForVerification, setEmailForVerification] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register`,
        form
      );

      if (res?.data?.status === 200) {
        showToast("success", "Verification code sent to email");
        setEmailForVerification(form.email);
        setStep("verify");
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {step === "signup" ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 flex items-center justify-center gap-2 text-white rounded-lg transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </form>
          </>
        ) : (
          <VerifyCode email={emailForVerification} />
        )}
      </div>
    </div>
  );
};

export default Signup;
