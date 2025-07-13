import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/useToast";

import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import Transactions from "../components/Transactions";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");
  const { showToast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setName(user.name);

    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/accounts/balance`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        setBalance(res?.data?.data?.balance);
      } catch (err) {
        showToast("error", err?.response?.data?.message || "Failed to fetch balance");
      }
    };

    fetchBalance();
  }, [showToast]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Welcome to Your Dashboard,{" "}
          <span className="text-blue-600">{name || "Customer"}</span>
        </h1>

        <div className="bg-white shadow-md rounded-xl p-4 md:p-6 mb-6 text-center w-full">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Current Balance</h2>
          <p className="text-2xl md:text-3xl font-bold text-green-600">
            ₹{balance !== null ? balance : "Loading..."}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "deposit"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "withdraw"
                ? "bg-green-600 text-white"
                : "bg-white border border-green-600 text-green-600"
            }`}
          >
            Withdraw
          </button>
        </div>

        <div className="bg-white shadow rounded-xl p-4 md:p-6 mb-8">
          {activeTab === "deposit" && (
            <>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Deposit Funds</h2>
              <Deposit />
            </>
          )}
          {activeTab === "withdraw" && (
            <>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Withdraw Funds</h2>
              <Withdraw />
            </>
          )}
        </div>

        <div className="bg-white shadow rounded-xl p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <div className="w-[95vw] md:w-full">
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
