import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/useToast";
import { Loader2, Banknote } from "lucide-react";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleDeposit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast("error", "Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/accounts/deposit`,
        { amount: parsedAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
      showToast("success", res?.data?.message || "Deposit successful!");
      setAmount("");
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-700">
        <Banknote className="w-6 h-6" />
        Deposit Funds
      </h1>
      <form onSubmit={handleDeposit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Processing..." : "Deposit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
