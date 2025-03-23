import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaSignOutAlt, FaUser } from "react-icons/fa";
import { getDashboardData } from "../services/dashboardService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDashboardData();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FaClipboardList /> },
    { name: "Appointments", icon: <FaCalendarCheck /> },
    { name: "Billing", icon: <FaMoneyBill /> },
    { name: "Admissions", icon: <FaBed /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Healthcare App</h1>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 hover:bg-blue-700 transition ${
                active === item.name ? "bg-blue-700" : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div
          className="mt-auto flex items-center gap-3 p-3 cursor-pointer hover:bg-red-500 transition rounded-lg"
          onClick={() => {
            localStorage.removeItem("token"); // Remove token
            toast.success("Logged out");
            navigate("/login");
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{active}</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaUser className="text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "UMR", value: data.totalDoctors, icon: <FaUser className="text-blue-500" />, onClick: () => alert("Coming soon!") },
            { title: "OP Bills", value: 1441, icon: <FaClipboardList className="text-red-500" />, onClick: () => alert("Coming soon!")  },
            { title: "IP Admissions", value: data.totalPatients, icon: <FaCalendarCheck className="text-green-500" />, onClick: () => navigate("/ip-admissions") },
            { title: "Discharges", value: 31, icon: <FaBed className="text-orange-500" />, onClick: () => alert("Coming soon!")  },
            { title: "On Bed Count", value: data.totalAppointments, icon: <FaMoneyBill className="text-purple-500" />, onClick: () => alert("Coming soon!")  },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-xl transition"
              onClick={card.onClick}
            >
              <div className="text-4xl">{card.icon}</div>
              <div>
                <p className="text-gray-600">{card.title}</p>
                <h3 className="text-2xl font-bold">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;