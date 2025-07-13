import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, ArrowLeft, UserCircle } from "lucide-react";
import { useToast } from "../context/useToast";

const BankerCustomerTransactions = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/banker/customers/${userId}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );

        const { user, transactions } = res?.data?.data || {};
        setTransactions(transactions || []);
        setCustomerName(user?.name || "");
      } catch (err) {
        showToast(
          "error",
          err?.response?.data?.message || "Failed to fetch transactions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId, showToast]);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Top Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <button
              onClick={() => navigate("/banker/accounts")}
              className="hover:underline flex items-center gap-1 text-blue-600"
            >
              <ArrowLeft size={16} /> All Customers
            </button>
            <span className="text-gray-400">/</span>
            <span className="font-medium">{customerName || "Customer"}</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UserCircle className="w-6 h-6 text-blue-600" />
            {customerName
              ? `${customerName}'s Transactions`
              : "Customer Transaction History"}
          </h1>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-gray-600 mt-12 text-center">
            No transactions found for this customer.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 text-gray-700 border-b">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Amount (₹)</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={txn.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 capitalize">{txn.type}</td>
                    <td className="py-2 px-4">₹{txn.amount}</td>
                    <td className="px-4 py-3 text-gray-800">
                      {formatDate(txn.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankerCustomerTransactions;
