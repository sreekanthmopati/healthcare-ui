import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileCsv, FaFilePdf, FaPrint, FaFileExcel } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPatients } from "../services/patientService";

const IPAdmissions = () => {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setAdmissions(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPatients();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600"; // Green for Completed
      case "scheduled":
        return "text-orange-600"; // Orange for Scheduled
      case "cancelled":
        return "text-red-600"; // Red for Cancelled
      default:
        return "text-gray-600"; // Default Gray
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">IP Admissions</h2>
      
      {/* Filters */}
      <div className="flex gap-4 mb-4 items-center">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="p-2 border rounded w-40"
          placeholderText="Start Date"
        />
        <span>to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="p-2 border rounded w-40"
          placeholderText="End Date"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="bg-green-500 text-white p-2 rounded flex items-center gap-2"><FaFileCsv /> CSV</button>
        <button className="bg-red-500 text-white p-2 rounded flex items-center gap-2"><FaFilePdf /> PDF</button>
        <button className="bg-gray-500 text-white p-2 rounded flex items-center gap-2"><FaPrint /> Print</button>
        <button className="bg-green-700 text-white p-2 rounded flex items-center gap-2"><FaFileExcel /> Excel</button>
      </div>

      {/* Admissions Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-blue-500 text-white text-left">
            <tr>
              <th className="p-3">Admission No</th>
              <th className="p-3">Date of Admission</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Admitted Ward</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="p-3">{admission.admissionNo}</td>
                <td className="p-3">
                  <DatePicker
                    selected={new Date(admission.admissionDate)}
                    className="border rounded p-1 w-32 bg-blue-500 text-white text-center"
                    readOnly
                  />
                </td>
                <td className="p-3">{admission.patientName}</td>
                <td className="p-3">{admission.department}</td>
                <td className="p-3">{admission.ward}</td>
                <td className={`p-3 font-bold ${getStatusColor(admission.status)}`}>
                  {admission.status}
                </td>
                <td className="p-3">
                  {/* Dropdown menu for actions */}
                  <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="p-2">
                    <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    </Menu.Button>

                    <Menu.Items 
                        className="absolute right-0 w-40 bg-white border rounded-md shadow-lg"
                        style={{ transform: "translateY(-100%)" }} // This ensures it stays within the visible area
                    >
                        <Menu.Item>
                        {({ active }) => (
                            <button
                            onClick={() => navigate(`/patient/${admission.admissionNo}`)}
                            className={`${
                                active ? "bg-blue-500 text-white" : "text-gray-700"
                            } block px-4 py-2 w-full text-center font-bold`}
                            >
                            View
                            </button>
                        )}
                        </Menu.Item>
                        <div className="border-t"></div>
                        <Menu.Item>
                        {({ active }) => (
                            <button
                            onClick={() => alert("Coming soon!")}
                            className={`${
                                active ? "bg-blue-500 text-white" : "text-gray-700"
                            } block px-4 py-2 w-full text-center font-bold`}
                            >
                            Edit
                            </button>
                        )}
                        </Menu.Item>
                    </Menu.Items>
                    </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IPAdmissions;