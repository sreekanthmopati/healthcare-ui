// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar"; // ✅ import sidebar
// import { FaFileCsv, FaFilePdf, FaPrint, FaFileExcel } from "react-icons/fa";
// import { Menu } from "@headlessui/react";
// import { MoreVertical } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { getPatients } from "../services/patientService";

// const IPAdmissions = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const department = params.get("departmentName");

//   const [active, setActive] = useState("Admissions");
//   const [patients, setPatients] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await getPatients(department);
//         setPatients(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     if(department){
//       navigate("/ip-admissions",{replace:true});
//     }

//     fetchPatients();
//   }, [department,navigate]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar active={active} setActive={setActive} /> {/* 👈 include sidebar */}

//       <div className="flex-1 p-8 overflow-auto">
//         <h2 className="text-2xl font-bold mb-4">IP Admissions - {department || "All"}</h2>

//         {/* Filters */}
//         <div className="flex gap-4 mb-4 items-center">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="p-2 border rounded w-40"
//             placeholderText="Start Date"
//           />
//           <span>to</span>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="p-2 border rounded w-40"
//             placeholderText="End Date"
//           />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
//         </div>
        

//         {/* Export Buttons */}
//         <div className="flex gap-2 mb-4">
//           <button className="bg-green-500 text-white p-2 rounded flex items-center gap-2"><FaFileCsv /> CSV</button>
//           <button className="bg-red-500 text-white p-2 rounded flex items-center gap-2"><FaFilePdf /> PDF</button>
//           <button className="bg-gray-500 text-white p-2 rounded flex items-center gap-2"><FaPrint /> Print</button>
//           <button className="bg-green-700 text-white p-2 rounded flex items-center gap-2"><FaFileExcel /> Excel</button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded shadow-md">
//           <table className="w-full border-collapse">
//             <thead className="bg-blue-500 text-white text-left">
//               <tr>
//                 <th className="p-3">Admission No</th>
//                 <th className="p-3">Date of Admission</th>
//                 <th className="p-3">Patient Name</th>
//                 <th className="p-3">Department</th>
//                 <th className="p-3">Gender</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((patient, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-100">
//                   <td className="p-3">{(patient.PatientID.toUpperCase())}</td>
//                   <td className="p-3">{new Date(patient.CreatedAt).toLocaleDateString()}</td>
//                   <td className="p-3">{patient.Name}</td>
//                   <td className="p-3">{patient.DepartmentName}</td>
//                   <td className="p-3">{patient.Gender}</td>
//                   <td className="p-3">{patient.Status}</td>
                  // <td className="p-3">
                  //   <Menu as="div" className="relative inline-block text-left">
                  //     <Menu.Button className="p-2">
                  //       <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                  //     </Menu.Button>
                  //     <Menu.Items className="absolute right-0 w-40 bg-white border rounded-md shadow-lg">
                  //       <Menu.Item>
                  //         {({ active }) => (
                  //           <button
                  //             onClick={() => navigate(`/patient/${patient.PatientID}`)}
                  //             className={`${active ? "bg-blue-500 text-white" : "text-gray-700"} block px-4 py-2 w-full text-center font-bold`}
                  //           >
                  //             View
                  //           </button>
                  //         )}
                  //       </Menu.Item>
                  //       <div className="border-t"></div>
                  //       <Menu.Item>
                  //         {({ active }) => (
                  //           <button
                  //             onClick={() => alert("Coming soon!")}
                  //             className={`${active ? "bg-blue-500 text-white" : "text-gray-700"} block px-4 py-2 w-full text-center font-bold`}
                  //           >
                  //             Discharge
                  //           </button>
                  //         )}
                  //       </Menu.Item>
                  //     </Menu.Items>
                  //   </Menu>
                  // </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IPAdmissions;






// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar"; // ✅ import sidebar
// import { FaFileCsv, FaFilePdf, FaPrint, FaFileExcel } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { getPatients } from "../services/patientService";

// const IPAdmissions = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const department = params.get("departmentName");  // Get department name from URL params

//   const [active, setActive] = useState("Admissions");
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Fetch all patients initially
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await getPatients();  // Assuming this fetches all patients
//         setPatients(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchPatients();
//   }, []); // Only fetch once on mount

//   // Filter patients based on the department or other filters
//   useEffect(() => {
//     let filtered = patients;

//     if (department) {
//       filtered = filtered.filter((patient) => patient.DepartmentName === department);
//     }

//     // Apply date filters
//     if (startDate && endDate) {
//       filtered = filtered.filter((patient) => {
//         const admissionDate = new Date(patient.CreatedAt);
//         return admissionDate >= startDate && admissionDate <= endDate;
//       });
//     } else if (startDate) {
//       filtered = filtered.filter((patient) => {
//         const admissionDate = new Date(patient.CreatedAt);
//         return admissionDate >= startDate;
//       });
//     } else if (endDate) {
//       filtered = filtered.filter((patient) => {
//         const admissionDate = new Date(patient.CreatedAt);
//         return admissionDate <= endDate;
//       });
//     }

//     setFilteredPatients(filtered); // Update filtered patients
//   }, [patients, department, startDate, endDate]); // Re-run when patients, department, or date filters change

//   const clearDateFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setFilteredPatients(patients); // Show all patients when filters are cleared
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar active={active} setActive={setActive} /> {/* 👈 include sidebar */}

//       <div className="flex-1 p-8 overflow-auto">
//         <h2 className="text-2xl font-bold mb-4">
//           IP Admissions - {department || "All"}
//         </h2>

//         {/* Filters */}
//         <div className="flex gap-4 mb-4 items-center">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="p-2 border rounded w-40"
//             placeholderText="Start Date"
//           />
//           <span>to</span>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="p-2 border rounded w-40"
//             placeholderText="End Date"
//           />
//           <button
//             onClick={clearDateFilters}
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded shadow-md">
//           <table className="w-full border-collapse">
//             <thead className="bg-blue-500 text-white text-left">
//               <tr>
//                 <th className="p-3">Admission No</th>
//                 <th className="p-3">Date of Admission</th>
//                 <th className="p-3">Patient Name</th>
//                 <th className="p-3">Department</th>
//                 <th className="p-3">Gender</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPatients.map((patient, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-100">
//                   <td className="p-3">{patient.PatientID.toUpperCase()}</td>
//                   <td className="p-3">{new Date(patient.CreatedAt).toLocaleDateString()}</td>
//                   <td className="p-3">{patient.Name}</td>
//                   <td className="p-3">{patient.DepartmentName}</td>
//                   <td className="p-3">{patient.Gender}</td>
//                   <td className="p-3">{patient.Status}</td>
//                   <td className="p-3">
//                     <button className="text-blue-500">View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IPAdmissions;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { getPatients } from "../services/patientService";
// import { Menu } from "@headlessui/react";
// import { MoreVertical } from "lucide-react";

// const IPAdmissions = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const department = params.get("departmentName");

  
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await getPatients();
//         setPatients(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchPatients();
//   }, []);

//   useEffect(() => {
//     let filtered = [...patients];

//     if (department) {
//       filtered = filtered.filter((patient) => patient.DepartmentName === department);
//     }

//     if (startDate && endDate) {
//       filtered = filtered.filter((patient) => {
//         const admissionDate = new Date(patient.CreatedAt);
//         return admissionDate >= startDate && admissionDate <= endDate;
//       });
//     } else if (startDate) {
//       filtered = filtered.filter((patient) => new Date(patient.CreatedAt) >= startDate);
//     } else if (endDate) {
//       filtered = filtered.filter((patient) => new Date(patient.CreatedAt) <= endDate);
//     }

//     // Sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aVal = a[sortConfig.key];
//         let bVal = b[sortConfig.key];

//         if (sortConfig.key === "CreatedAt") {
//           aVal = new Date(aVal);
//           bVal = new Date(bVal);
//         } else {
//           aVal = aVal?.toString().toLowerCase();
//           bVal = bVal?.toString().toLowerCase();
//         }

//         if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredPatients(filtered);
//   }, [patients, department, startDate, endDate, sortConfig]);

//   const clearDateFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setFilteredPatients(patients);
//   };

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === "asc" ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />;
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar/>

//       <div className="flex-1 p-8 overflow-auto">
//         <h2 className="text-2xl font-bold mb-4">
//           IP Admissions - {department || "All"}
//         </h2>

//         {/* Filters */}
//         <div className="flex gap-4 mb-4 items-center">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="p-2 border rounded w-40"
//             placeholderText="Start Date"
//           />
//           <span>to</span>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="p-2 border rounded w-40"
//             placeholderText="End Date"
//           />
//           <button
//             onClick={clearDateFilters}
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded shadow-md">
//           <table className="w-full border-collapse">
//             <thead className="bg-blue-500 text-white text-left">
//               <tr>
//                 <th className="p-3">Admission No</th>
//                 <th className="p-3 cursor-pointer" onClick={() => requestSort("CreatedAt")}>
//                   Date of Admission {getSortIcon("CreatedAt")}
//                 </th>
//                 <th className="p-3 cursor-pointer" onClick={() => requestSort("Name")}>
//                   Patient Name {getSortIcon("Name")}
//                 </th>
//                 <th className="p-3">Department</th>
//                 <th className="p-3">Gender</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>
          


//             <tbody>
//   {filteredPatients.map((patient, index) => (
//     <tr
//       key={index}
//       className={`${
//         index % 2 === 0 ? "bg-white" : "bg-gray-50 border border-gray-200"
//       } hover:bg-yellow-50 hover:shadow-sm transition duration-200 border-b border-gray-300`}
//     >
//       <td className="p-3 font-semibold text-gray-800">{patient.PatientID?.toUpperCase()}</td>
//       <td className="p-3 font-semibold text-gray-800">
//         {new Date(patient.CreatedAt).toLocaleDateString()}
//       </td>
//       <td className="p-3 font-semibold text-gray-800">{patient.Name}</td>
//       <td className="p-3 font-semibold text-gray-800">{patient.DepartmentName}</td>
//       <td className="p-3 font-semibold text-gray-800">{patient.Gender}</td>
//       <td className="p-3 font-semibold text-gray-800">{patient.Status}</td>
//       <td className="p-3">
//         <Menu as="div" className="relative inline-block text-left">
//           <Menu.Button className="p-2">
//             <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
//           </Menu.Button>
//           <Menu.Items className="absolute right-0 w-40 bg-white border rounded-md shadow-lg z-10">
//             <Menu.Item>
//               {({ active }) => (
//                 <button
//                   onClick={() => navigate(`/patient/${patient.PatientID}`)}
//                   className={`${
//                     active ? "bg-blue-500 text-white" : "text-gray-700"
//                   } block px-4 py-2 w-full text-center font-bold`}
//                 >
//                   View
//                 </button>
//               )}
//             </Menu.Item>
//             <div className="border-t"></div>
//             {/* <Menu.Item>
//               {({ active }) => (
//                 <button
//                   onClick={() => alert("Coming soon!")}
//                   className={`${
//                     active ? "bg-blue-500 text-white" : "text-gray-700"
//                   } block px-4 py-2 w-full text-center font-bold`}
//                 >
//                   Discharge
//                 </button>
//               )}
//             </Menu.Item> */}
//           </Menu.Items>
//         </Menu>
//       </td>
//     </tr>
//   ))}
//   {filteredPatients.length === 0 && (
//     <tr>
//       <td colSpan="7" className="p-4 text-center text-gray-500">
//         No patients found.
//       </td>
//     </tr>
//   )}
// </tbody>




//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IPAdmissions;









// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaArrowUp, FaArrowDown, FaFilter, FaFileExport, FaCalendarAlt, FaClock } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { getAllAdmissionsWithDetails } from "../services/admissionService";
// import { Menu } from "@headlessui/react";
// import { MoreVertical, Printer, FileText, FileSpreadsheet } from "lucide-react";

// const IPAdmissions = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const department = params.get("departmentName");

//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [wardFilter, setWardFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await getAllAdmissionsWithDetails();
//         console.log(data)
//         setPatients(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchPatients();
//   }, []);

//   useEffect(() => {
//     let filtered = [...patients];

//     if (department) {
//       filtered = filtered.filter((patient) => patient.DepartmentName === department);
//     }

//     if (startDate && endDate) {
//       filtered = filtered.filter((patient) => {
//         const admissionDate = new Date(patient.CreatedAt);
//         return admissionDate >= startDate && admissionDate <= endDate;
//       });
//     } else if (startDate) {
//       filtered = filtered.filter((patient) => new Date(patient.CreatedAt) >= startDate);
//     } else if (endDate) {
//       filtered = filtered.filter((patient) => new Date(patient.CreatedAt) <= endDate);
//     }

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (patient) =>
//           patient.Name?.toLowerCase().includes(term) ||
//           patient.PatientID?.toLowerCase().includes(term) ||
//           patient.ContactNumber?.includes(term)
//       );
//     }

//     if (wardFilter) {
//       filtered = filtered.filter((patient) => 
//         patient.Ward?.toLowerCase().includes(wardFilter.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       filtered = filtered.filter((patient) => 
//         patient.Status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aVal = a[sortConfig.key];
//         let bVal = b[sortConfig.key];

//         if (sortConfig.key === "CreatedAt") {
//           aVal = new Date(aVal);
//           bVal = new Date(bVal);
//         } else {
//           aVal = aVal?.toString().toLowerCase();
//           bVal = bVal?.toString().toLowerCase();
//         }

//         if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredPatients(filtered);
//   }, [patients, department, startDate, endDate, searchTerm, wardFilter, statusFilter, sortConfig]);

//   const clearFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setSearchTerm("");
//     setWardFilter("");
//     setStatusFilter("");
//     setFilteredPatients(patients);
//   };

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === "asc" ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />;
//   };

//   const calculateLOS = (admissionDate) => {
//     const today = new Date();
//     const admission = new Date(admissionDate);
//     const diffTime = Math.abs(today - admission);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div className="flex-1 p-6 overflow-auto bg-gray-50">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">
//           On Bed List - {department || "All Departments"}
//         </h2>
//       </div>

//       {/* Main Filters */}
//       <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center gap-2">
//             <span className="text-gray-600">Select Dates:</span>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               className="p-2 border rounded w-40 text-sm"
//               placeholderText="From Date"
//               dateFormat="dd-MMM-yyyy"
//             />
//             <span className="text-gray-400">to</span>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               className="p-2 border rounded w-40 text-sm"
//               placeholderText="To Date"
//               dateFormat="dd-MMM-yyyy"
//             />
//           </div>

//           {/* Export buttons moved under date filter */}
//           <div className="flex gap-2">
//             <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
//               <Printer size={16} />
//               Print
//             </button>
//             <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
//               <FileSpreadsheet size={16} />
//               Excel
//             </button>
//             <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
//               <FileText size={16} />
//               PDF
//             </button>
//             <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
//               Copy
//             </button>
//           </div>

//           <div className="relative ml-auto">
//             <input
//               type="text"
//               placeholder="Search patients..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="p-2 border rounded w-64 text-sm pl-8"
//             />
//             <FaFilter className="absolute left-2 top-3 text-gray-400" />
//           </div>

//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 text-blue-600 text-sm"
//           >
//             <FaFilter /> {showFilters ? "Hide" : "Show"} Advanced Filters
//           </button>

//           <button
//             onClick={clearFilters}
//             className="text-sm text-red-600 hover:text-red-800"
//           >
//             Clear All Filters
//           </button>
//         </div>

//         {/* Advanced Filters */}
//         {showFilters && (
//           <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Ward</label>
//               <select
//                 value={wardFilter}
//                 onChange={(e) => setWardFilter(e.target.value)}
//                 className="w-full p-2 border rounded text-sm"
//               >
//                 <option value="">All Wards</option>
//                 <option value="General">General Ward</option>
//                 <option value="Medical">Medical Ward</option>
//                 <option value="Surgical">Surgical Ward</option>
//                 <option value="ICU">ICU</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Status</label>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full p-2 border rounded text-sm"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="Admitted">Admitted</option>
//                 <option value="Discharged">Discharged</option>
//                 <option value="Transferred">Transferred</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Admission No</th>
//                 <th 
//                   className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
//                   onClick={() => requestSort("CreatedAt")}
//                 >
//                   Date of Admission {getSortIcon("CreatedAt")}
//                 </th>
//                 <th 
//                   className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
//                   onClick={() => requestSort("Name")}
//                 >
//                   Patient Details {getSortIcon("Name")}
//                 </th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">LOS</th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Category</th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Sponsor</th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Consultant</th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Ward/Bed</th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Amount</th>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredPatients.map((patient, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="p-3">
//                     <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
//                       {patient.PatientID}
//                     </span>
//                   </td>
//                   <td className="p-3 text-sm text-gray-600">
//                     <div className="flex items-center gap-1">
//                       <FaCalendarAlt className="text-green-500 text-xs" />
//                       <span>
//                         {new Date(patient.admission_date).toLocaleDateString('en-GB', {
//                           day: '2-digit',
//                           month: 'short',
//                           year: 'numeric'
//                         })}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1 mt-1">
//                       <FaClock className="text-green-500 text-xs" />
//                       <span>
//                         {new Date(patient.CreatedAt).toLocaleTimeString('en-GB', {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3 text-sm text-gray-800">
//                   <div className="font-bold text-black text-lg">{patient.Name}</div>
// <div className="flex items-center gap-1 mt-1">
//   <span className="text-xs text-green-600">Mobile:</span>
//   <span className="text-xs text-gray-800">{patient.ContactNumber || 'N/A'}</span>
// </div>
//                     <div className="flex items-center gap-1 mt-1">
//   <span className="text-xs text-green-600">UMR:</span>
//   <span className="text-xs text-gray-800">{patient.UMRNumber || 'N/A'}</span>
// </div>
//                   </td>
//                   <td className="p-3 text-sm text-gray-600">{calculateLOS(patient.CreatedAt)} days</td>
//                   <td className="p-3 text-sm text-gray-600">CORPORATE</td>
//                   <td className="p-3 text-sm text-gray-600">SHARE CARE</td>
//                   <td className="p-3 text-sm text-gray-600">{patient.DepartmentName}</td>
//                   <td className="p-3 text-sm text-gray-600">
//                     <span className="text-green-600">{patient.Ward || 'N/A'}</span> {patient.BedNumber && <span className="text-green-600">Bed {patient.BedNumber}</span>}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <div className="text-green-600">Total: 0</div>
//                     <div className="text-green-600">Received: 0</div>
//                     <div className="text-red-600">Balance: 0</div>
//                   </td>
//                   <td className="p-3 text-sm">
//                     <Menu as="div" className="relative inline-block text-left">
//                       <Menu.Button className="p-1 rounded hover:bg-gray-200">
//                         <MoreVertical className="w-4 h-4 text-gray-500" />
//                       </Menu.Button>
//                       <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
//                         <div className="px-1 py-1">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={() => navigate(`/patient/${patient.PatientID}`)}
//                                 className={`${
//                                   active ? 'bg-blue-500 text-white' : 'text-gray-900'
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                               >
//                                 View Details
//                               </button>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={() => alert('Sponsor transfer functionality')}
//                                 className={`${
//                                   active ? 'bg-blue-500 text-white' : 'text-gray-900'
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                               >
//                                 Sponsor Transfer
//                               </button>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={() => alert('OT booking functionality')}
//                                 className={`${
//                                   active ? 'bg-blue-500 text-white' : 'text-gray-900'
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                               >
//                                 OT Booking
//                               </button>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={() => alert('Admission form functionality')}
//                                 className={`${
//                                   active ? 'bg-blue-500 text-white' : 'text-gray-900'
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                               >
//                                 Admission Form
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </div>
//                       </Menu.Items>
//                     </Menu>
//                   </td>
//                 </tr>
//               ))}
//               {filteredPatients.length === 0 && (
//                 <tr>
//                   <td colSpan="10" className="p-4 text-center text-gray-500 text-sm">
//                     No admissions found matching your criteria.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IPAdmissions;






import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaFilter, FaFileExport, FaCalendarAlt, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllAdmissionsWithDetails } from "../services/admissionService";
import { Menu } from "@headlessui/react";
import { MoreVertical, Printer, FileText, FileSpreadsheet } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const IPAdmissions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const department = params.get("departmentName");

  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        setIsLoading(true);
        const data = await getAllAdmissionsWithDetails();
        setAdmissions(data);
        setFilteredAdmissions(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  useEffect(() => {
    let filtered = [...admissions];

    // if (department) {
    //   filtered = filtered.filter((admission) => 
    //     admission.patient.DepartmentName === department
    //   );
    // }

    if (department) {
      const deptLower = department.toLowerCase();
      filtered = filtered.filter((admission) => 
        admission.diagnosis?.Departments?.DepartmentName?.toLowerCase() === deptLower
      );
    }
    

    if (startDate && endDate) {
      filtered = filtered.filter((admission) => {
        const admissionDate = new Date(admission.admission_date);
        return admissionDate >= startDate && admissionDate <= endDate;
      });
    } else if (startDate) {
      filtered = filtered.filter((admission) => 
        new Date(admission.admission_date) >= startDate
      );
    } else if (endDate) {
      filtered = filtered.filter((admission) => 
        new Date(admission.admission_date) <= endDate
      );
    }



    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (admission) =>
          admission.patient.Name?.toLowerCase().includes(term) ||
          admission.PatientID?.toLowerCase().includes(term) ||
          admission.patient.ContactNumber?.includes(term) ||
          // admission.admission_no?.toLowerCase().includes(term)
          admission.admission_no?.toString().includes(term)
      );
    }

    if (wardFilter) {
      filtered = filtered.filter((admission) => 
        admission.bed.room.ward.ward_name.toLowerCase().includes(wardFilter.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((admission) => 
        admission.bed.occupied_status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal, bVal;

        if (sortConfig.key === "admission_date") {
          aVal = new Date(a.admission_date);
          bVal = new Date(b.admission_date);
        } else if (sortConfig.key === "patient") {
          aVal = a.patient.Name?.toLowerCase();
          bVal = b.patient.Name?.toLowerCase();
        } else {
          aVal = a[sortConfig.key]?.toString().toLowerCase();
          bVal = b[sortConfig.key]?.toString().toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredAdmissions(filtered);
  }, [admissions, department, startDate, endDate, searchTerm, wardFilter, statusFilter, sortConfig]);

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
    setWardFilter("");
    setStatusFilter("");
    setFilteredAdmissions(admissions);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />;
  };

  const calculateLOS = (admissionDate) => {
    const today = new Date();
    const admission = new Date(admissionDate);
    const diffTime = Math.abs(today - admission);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Export functions
  const exportToExcel = () => {
    const data = filteredAdmissions.map(admission => ({
      "Admission No": admission.admission_no,
      "Patient Name": admission.patient.Name,
      "Admission Date": new Date(admission.admission_date).toLocaleDateString(),
      "Ward": admission.bed.room.ward.ward_name,
      "Bed": admission.bed.bed_number,
      "Status": admission.bed.occupied_status,
      "Diagnosis": admission.diagnosis.DiagnosisName,
      "LOS": `${calculateLOS(admission.admission_date)} days`
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Admissions");
    writeFile(wb, "Admissions.xlsx");
  };

  const exportToCSV = () => {
    const headers = [
      "Admission No,Patient Name,Admission Date,Ward,Bed,Status,Diagnosis,LOS"
    ];
    const data = filteredAdmissions.map(admission => 
      `"${admission.admission_no}","${admission.patient.Name}","${new Date(admission.admission_date).toLocaleDateString()}","${admission.bed.room.ward.ward_name}","${admission.bed.bed_number}","${admission.bed.occupied_status}","${admission.diagnosis.DiagnosisName}","${calculateLOS(admission.admission_date)} days"`
    ).join("\n");

    const csv = headers.join("\n") + "\n" + data;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Admissions.csv");
  };

  const exportToPDF = () => {
    const input = document.getElementById("admissions-table");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");
        pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
        pdf.save("Admissions.pdf");
      });
    }
  };

  const printTable = () => {
    const printContents = document.getElementById("admissions-table")?.outerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const copyToClipboard = () => {
    const table = document.getElementById("admissions-table");
    if (table) {
      const range = document.createRange();
      range.selectNode(table);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
      alert("Table copied to clipboard");
    }
  };

  // Get unique wards for filter dropdown
  const uniqueWards = [...new Set(
    admissions.map(admission => admission.bed.room.ward.ward_name)
  )];

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          On Bed List - {department || "All Departments"}
        </h2>
      </div>

      {/* Main Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Select Dates:</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="p-2 border rounded w-40 text-sm"
              placeholderText="From Date"
              dateFormat="dd-MMM-yyyy"
            />
            <span className="text-gray-400">to</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="p-2 border rounded w-40 text-sm"
              placeholderText="To Date"
              dateFormat="dd-MMM-yyyy"
            />
          </div>

          {/* Export buttons */}
          <div className="flex gap-2">
            <button 
              onClick={printTable}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              <Printer size={16} />
              Print
            </button>
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              <FileSpreadsheet size={16} />
              Excel
            </button>
            <button 
              onClick={exportToPDF}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              <FileText size={16} />
              PDF
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Copy
            </button>
          </div>

          <div className="relative ml-auto">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded w-64 text-sm pl-8"
            />
            <FaFilter className="absolute left-2 top-3 text-gray-400" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-blue-600 text-sm"
          >
            <FaFilter /> {showFilters ? "Hide" : "Show"} Advanced Filters
          </button>

          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear All Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ward</label>
              <select
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="">All Wards</option>
                {uniqueWards.map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="">All Statuses</option>
                <option value="Occupied">Occupied</option>
                <option value="Vacant">Vacant</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">Loading admissions...</div>
        ) : (
          <div className="overflow-x-auto" id="admissions-table">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Admission No</th>
                  <th 
                    className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                    onClick={() => requestSort("admission_date")}
                  >
                    Date of Admission {getSortIcon("admission_date")}
                  </th>
                  <th 
                    className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                    onClick={() => requestSort("patient")}
                  >
                    Patient Details {getSortIcon("patient")}
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">LOS</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Sponsor</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Consultant</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Ward/Bed</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAdmissions.map((admission) => (
                  
                  <tr key={admission.admission_id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        {admission.admission_no}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-green-500 text-xs" />
                        <span>
                          {new Date(admission.admission_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <FaClock className="text-green-500 text-xs" />
                        <span>
                          {new Date(admission.admission_date).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      <div className="font-bold text-black text-lg">{admission.patient.Name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-green-600">Mobile:</span>
                        <span className="text-xs text-gray-800">{admission.patient.ContactNumber || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-green-600">Age:</span>
                        <span className="text-xs text-gray-800">{admission.patient.Age}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{calculateLOS(admission.admission_date)} days</td>
                    <td className="p-3 text-sm text-gray-600">CORPORATE</td>
                    <td className="p-3 text-sm font-semibold text-orange-600">SPECIMEN</td>

                    <td className="p-3 text-sm text-gray-600">{admission.diagnosis.Departments.DepartmentName}</td>
                    <td className="p-3 text-sm text-gray-600">
                      <span className="text-green-600">{admission.bed.room.ward.ward_name}</span> {admission.bed.bed_number && <span className="text-green-600">Bed {admission.bed.bed_number}</span>}
                    </td>
                    <td className="p-3 text-sm">
                      <div className="text-green-600">Total: 0</div>
                      <div className="text-green-600">Received: 0</div>
                      <div className="text-red-600">Balance: 0</div>
                    </td>
                    <td className="p-3 text-sm">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="p-1 rounded hover:bg-gray-200">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => navigate(`/patient/${admission.PatientID}`)}
                                  className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  View Details
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => alert('Sponsor transfer functionality')}
                                  className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Sponsor Transfer
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => alert('OT booking functionality')}
                                  className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  OT Booking
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => alert('Admission form functionality')}
                                  className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Admission Form
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </td>
                  </tr>
                ))}
                {filteredAdmissions.length === 0 && (
                  <tr>
                    <td colSpan="10" className="p-4 text-center text-gray-500 text-sm">
                      No admissions found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IPAdmissions;

















