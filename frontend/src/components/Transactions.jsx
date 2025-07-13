import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/useToast";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/accounts/transactions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        setTransactions(res?.data?.data || []);
      } catch (err) {
        showToast("error", err?.response?.data?.message || "Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, [showToast]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-[95vw] md:w-full table-auto text-sm md:text-base border border-gray-200 shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Amount (₹)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                No transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-3 text-gray-800">{formatDate(tx.created_at)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      tx.type === "deposit" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-700">₹{Number(tx.amount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
