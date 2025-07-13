import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/useToast";
import { Loader2, ArrowUpCircle } from "lucide-react"; 

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast("error", "Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/accounts/withdraw`,
        { amount: parsedAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      showToast("success", res?.data?.message || "Withdrawal successful!");
      setAmount("");
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-700">
        <ArrowUpCircle className="w-6 h-6" />
        Withdraw Funds
      </h1>
      <form onSubmit={handleWithdraw} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white flex items-center justify-center gap-2 rounded-lg transition cursor-pointer ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
