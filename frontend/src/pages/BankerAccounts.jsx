import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/useToast";
import { useNavigate } from "react-router-dom";
import { UserCircle, Loader2 } from "lucide-react";

const BankerAccounts = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/banker/customers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        setCustomers(res?.data?.data || []);
      } catch (err) {
        showToast(
          "error",
          err?.response?.data?.message || "Failed to fetch customers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [showToast]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <UserCircle className="w-7 h-7 text-blue-600" />
          Welcome, Banker 👋
        </h1>

        <h2 className="text-xl font-semibold mb-4">Customer Accounts</h2>

        {loading ? (
          <div className="flex justify-center mt-12">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : customers.length === 0 ? (
          <p className="text-gray-600">No customers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="border rounded-xl shadow-sm bg-white p-4 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {customer.email}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>User ID:</strong> {customer.id}
                </p>
                <button
                  onClick={() => navigate(`/banker/customers/${customer.id}/transactions`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                >
                  View Transactions
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BankerAccounts;
