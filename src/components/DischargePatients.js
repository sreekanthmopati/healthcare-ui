// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaArrowUp, FaArrowDown, FaFilter, FaFileExport, FaCalendarAlt, FaClock } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { getAllAdmissionsWithDetails, dischargePatient } from "../services/admissionService";
// import { getDischargeReasons } from "../services/DischargeReasonsService";
// import { Menu } from "@headlessui/react";
// import { MoreVertical, Printer, FileText, FileSpreadsheet } from "lucide-react";
// import Modal from "./Modal"; // You'll need a modal component

// const DischargePatients = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const department = params.get("departmentName");

//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [selectedPatients, setSelectedPatients] = useState([]);
//   const [showDischargeModal, setShowDischargeModal] = useState(false);
//   const [dischargeReason, setDischargeReason] = useState("");
//   const [isBulkDischarge, setIsBulkDischarge] = useState(false);
//   const [currentPatient, setCurrentPatient] = useState(null);
//   const [dischargeReasons, setDischargeReasons] = useState([]);

//   // Discharge reasons - you can customize these
 

//     // Fetch dashboard data
//     useEffect(() => {
//       const fetchDischargeReasons = async () => {
//         try {
//           const result = await getDischargeReasons();
//           setDischargeReasons(result);
//         } catch (error) {
//          console.log(error);
//         }
//       };
//       fetchDischargeReasons();
//     }, []);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await getAllAdmissionsWithDetails();
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
//   }, [patients, department, startDate, endDate, searchTerm, sortConfig]);

//   const clearFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setSearchTerm("");
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

//   // Toggle patient selection for bulk discharge
//   const togglePatientSelection = (patientId) => {
//     setSelectedPatients(prev => 
//       prev.includes(patientId) 
//         ? prev.filter(id => id !== patientId) 
//         : [...prev, patientId]
//     );
//   };

//   // Handle discharge confirmation
//   const handleConfirmDischarge = async () => {
//     try {
//       const patientsToDischarge = isBulkDischarge 
//         ? selectedPatients 
//         : [currentPatient.PatientID];
//         console.log(selectedPatients);
      
//       // Call your discharge service for each patient
//       // await Promise.all(patientsToDischarge.map(patientId => 
//       //   dischargePatient(patientId, dischargeReason)
//       // ));
      
//       // Refresh patient list
//       const data = await getAllAdmissionsWithDetails();
//       setPatients(data);
      
//       // Reset state
//       setShowDischargeModal(false);
//       setDischargeReason("");
//       setSelectedPatients([]);
//       setCurrentPatient(null);
//     } catch (error) {
//       console.error("Error discharging patient:", error);
//     }
//   };

//   // Open discharge modal for single patient
//   const openSingleDischarge = (patient) => {
//     setCurrentPatient(patient);
//     setIsBulkDischarge(false);
//     setShowDischargeModal(true);
//   };

//   // Open discharge modal for bulk operation
//   const openBulkDischarge = () => {
//     setIsBulkDischarge(true);
//     setShowDischargeModal(true);
//   };

//   return (
//     <div className="flex-1 p-6 overflow-auto bg-gray-50">
//       {/* Discharge Modal */}
//       <Modal 
//         isOpen={showDischargeModal}
//         onClose={() => setShowDischargeModal(false)}
//         title={`${isBulkDischarge ? 'Bulk' : ''} Discharge Patient${isBulkDischarge ? 's' : ''}`}
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Discharge Reason
//             </label>
//             <select
//               value={dischargeReason}
//               onChange={(e) => setDischargeReason(e.target.value)}
//               className="w-full p-2 border rounded text-sm"
//               required
//             >
//               <option value="">Select reason</option>
//               {dischargeReasons.map((dr, index) => (
//                 <option key={dr.id} value={dr.id}>{dr.reason}</option>
//               ))}
//             </select>
//           </div>
          
//           {!isBulkDischarge && currentPatient && (
//             <div className="bg-gray-50 p-3 rounded">
//               <p className="font-medium">Patient: {currentPatient.Name}</p>
//               <p className="text-sm">ID: {currentPatient.PatientID}</p>
//               <p className="text-sm">Ward/Bed: {currentPatient.Ward} {currentPatient.BedNumber && `Bed ${currentPatient.BedNumber}`}</p>
//             </div>
//           )}
          
//           {isBulkDischarge && (
//             <div className="bg-gray-50 p-3 rounded">
//               <p className="font-medium">Number of selected patients: {selectedPatients.length}</p>
//             </div>
//           )}
          
//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => setShowDischargeModal(false)}
//               className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleConfirmDischarge}
//               disabled={!dischargeReason}
//               className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
//             >
//               Confirm Discharge
//             </button>
//           </div>
//         </div>
//       </Modal>

//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Discharge Patients
//         </h2>
        
//         {/* Bulk discharge button */}
//         {selectedPatients.length > 0 && (
//           <button
//             onClick={openBulkDischarge}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
//           >
//             Discharge Selected ({selectedPatients.length})
//           </button>
//         )}
//       </div>

//       {/* Main Filters - Simplified */}
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
//             onClick={clearFilters}
//             className="text-sm text-red-600 hover:text-red-800"
//           >
//             Clear All Filters
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left text-sm font-semibold text-gray-700 w-8">
//                   {/* Checkbox for bulk selection */}
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4"
//                     checked={selectedPatients.length > 0 && selectedPatients.length === filteredPatients.length}
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelectedPatients(filteredPatients.map(p => p.PatientID));
//                       } else {
//                         setSelectedPatients([]);
//                       }
//                     }}
//                   />
//                 </th>
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
//               {filteredPatients.map((admission, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="p-3">
//                     <input 
//                       type="checkbox" 
//                       className="h-4 w-4"
//                       checked={selectedPatients.includes(admission.admission_no)}
//                       onChange={() => togglePatientSelection(admission.admission_no)}
//                     />
//                   </td>
//                   <td className="p-3">
//                       <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
//                         {admission.admission_no}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm text-gray-600">
//                       <div className="flex items-center gap-1">
//                         <FaCalendarAlt className="text-green-500 text-xs" />
//                         <span>
//                           {new Date(admission.admission_date).toLocaleDateString('en-GB', {
//                             day: '2-digit',
//                             month: 'short',
//                             year: 'numeric'
//                           })}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1 mt-1">
//                         <FaClock className="text-green-500 text-xs" />
//                         <span>
//                           {new Date(admission.admission_date).toLocaleTimeString('en-GB', {
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-3 text-sm text-gray-800">
//                       <div className="font-bold text-black text-lg">{admission.patient.Name}</div>
//                       <div className="flex items-center gap-1 mt-1">
//                         <span className="text-xs text-green-600">Mobile:</span>
//                         <span className="text-xs text-gray-800">{admission.patient.ContactNumber || 'N/A'}</span>
//                       </div>
//                       <div className="flex items-center gap-1 mt-1">
//                         <span className="text-xs text-green-600">Age:</span>
//                         <span className="text-xs text-gray-800">{admission.patient.Age}</span>
//                       </div>
//                     </td>
//                     <td className="p-3 text-sm text-gray-600">{calculateLOS(admission.admission_date)} days</td>
//                     <td className="p-3 text-sm text-gray-600">CORPORATE</td>
//                     <td className="p-3 text-sm text-orange-600">SPECIMEN</td>
//                     <td className="p-3 text-sm text-gray-600">{admission.patient.DepartmentName}</td>
//                     <td className="p-3 text-sm text-gray-600">
//                       <span className="text-green-600">{admission.bed.room.ward.ward_name}</span> {admission.bed.bed_number && <span className="text-green-600">Bed {admission.bed.bed_number}</span>}
//                     </td>
//                     <td className="p-3 text-sm">
//                       <div className="text-green-600">Total: 0</div>
//                       <div className="text-green-600">Received: 0</div>
//                       <div className="text-red-600">Balance: 0</div>
//                     </td>
//                   <td className="p-3 text-sm">
                   
//                   <button
//   onClick={() => openSingleDischarge(admission)}
//   className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200"
// >
//   Discharge Patient
// </button>
                            
//                   </td>
//                 </tr>
//               ))}
//               {filteredPatients.length === 0 && (
//                 <tr>
//                   <td colSpan="11" className="p-4 text-center text-gray-500 text-sm">
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

// export default DischargePatients;

























// import React, { useEffect, useState } from "react";
// import {
//   getAllAdmissionsWithDetails,
//   dischargeAdmission,
//   dischargeAdmissionsBulk,
// } from "../services/admissionService";
// import { getDischargeReasons } from "../services/DischargeReasonsService";

// export default function DischargePatients() {
//   const [admissions, setAdmissions] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [reasons, setReasons] = useState([]);
//   const [selectedReasonId, setSelectedReasonId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isBulkDischarge, setIsBulkDischarge] = useState(false);

//   useEffect(() => {
//     fetchAdmissions();
//     fetchDischargeReasons();
//   }, []);

//   const fetchAdmissions = async () => {
//     const res = await getAllAdmissionsWithDetails();
//     const filtered = res.filter(
//         admission => 
//           admission.discharge_date === null && 
//           admission.dischargeReasonId === null && 
//           admission.is_discharged === false
//       );
      
//     setAdmissions(filtered);
//   };

//   const fetchDischargeReasons = async () => {
//     const res = await getDischargeReasons();
//     setReasons(res);
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   // Open modal for discharge; determine if single or bulk discharge
//   const openDischargeModal = (singleId = null) => {
//     if (singleId !== null) {
//       // Single discharge
//       setSelectedIds([singleId]);
//       setIsBulkDischarge(false);
//     } else {
//       // Bulk discharge
//       if (selectedIds.length === 0) return; // no selection
//       setIsBulkDischarge(true);
//     }
//     setSelectedReasonId(null); // reset reason
//     setShowModal(true);
//   };

//   const handleDischarge = async () => {
//     try {
//       if (isBulkDischarge) {
//         // Bulk discharge - backend assigns random reasons, no reason needed
//         console.log(selectedIds)
//         await dischargeAdmissionsBulk(selectedIds);
//       } else {
//         // Single discharge - require selected reason
//         if (!selectedReasonId) {
//           alert("Please select a discharge reason.");
//           return;
//         }
//         await dischargeAdmission(selectedIds[0], selectedReasonId);
//       }
//       setSelectedIds([]);
//       setSelectedReasonId(null);
//       setShowModal(false);
//       fetchAdmissions();
//     } catch (error) {
//       alert("Failed to discharge. Try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Inpatients for Discharge</h2>
//       <table className="min-w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th></th>
//             <th>Admission No</th>
//             <th>Patient Name</th>
//             <th>Bed</th>
//             <th>Diagnosis</th>
//             <th>Admit Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admissions.map((ad) => (
//             <tr key={ad.admission_id} className="border-b">
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(ad.admission_id)}
//                   onChange={() => toggleSelect(ad.admission_id)}
//                 />
//               </td>
//               <td>{ad.admission_no}</td>
//               <td>{ad.patient?.Name}</td>
//               <td>{ad.bed?.bed_number}</td>
//               <td>{ad.diagnosis?.DiagnosisName}</td>
//               <td>{new Date(ad.admission_date).toLocaleDateString()}</td>
//               <td>
//                 <button
//                   className="text-sm text-white bg-blue-600 px-3 py-1 rounded"
//                   onClick={() => openDischargeModal(ad.admission_id)}
//                 >
//                   Discharge
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//         onClick={() => openDischargeModal(null)}
//         disabled={selectedIds.length === 0}
//       >
//         Discharge Selected
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-[400px]">
//             <h3 className="text-lg font-semibold mb-4">
//               {isBulkDischarge
//                 ? "Confirm Bulk Discharge"
//                 : "Select Discharge Reason"}
//             </h3>

//             {!isBulkDischarge ? (
//               <select
//                 className="w-full border p-2 mb-4"
//                 value={selectedReasonId || ""}
//                 onChange={(e) => setSelectedReasonId(parseInt(e.target.value))}
//               >
//                 <option value="" disabled>
//                   Choose reason
//                 </option>
//                 {reasons.map((r) => (
//                   <option key={r.id} value={r.id}>
//                     {r.reason}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <p>
//                 Bulk discharge will assign random discharge reasons to each
//                 selected admission.
//               </p>
//             )}

//             <div className="flex justify-end space-x-3 mt-4">
//               <button
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//                 onClick={handleDischarge}
//               >
//                 Confirm Discharge
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  getAllAdmissionsWithDetails,
  dischargeAdmission,
  dischargeAdmissionsBulk,
} from "../services/admissionService";
import { getDischargeReasons } from "../services/DischargeReasonsService";
import { getDepartments } from "../services/departmentService";
import { getAllWards } from "../services/wardService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBed, FaPhone, FaVenusMars, FaCalendarAlt, FaClock, FaFilter, FaTimes } from "react-icons/fa";
import { GiHospital } from "react-icons/gi";
import { MdSick } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DischargePatients() {
  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isBulkDischarge, setIsBulkDischarge] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [sponsorFilter, setSponsorFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [wardFilter, setWardFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    fetchAdmissions();
    fetchDischargeReasons();
    fetchDepartments();
    fetchWards();
  }, []);

  useEffect(() => {
    filterAdmissions();
  }, [admissions, searchTerm, dateFilter, sponsorFilter, departmentFilter, wardFilter]);

  const fetchAdmissions = async () => {
    const res = await getAllAdmissionsWithDetails();
    const filtered = res.filter(
      admission => 
        admission.discharge_date === null && 
        admission.dischargeReasonId === null && 
        admission.is_discharged === false
    );
    setAdmissions(filtered);
  };

  const fetchDischargeReasons = async () => {
    const res = await getDischargeReasons();
    setReasons(res);
  };

  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res);
  };

  const fetchWards = async () => {
    const res = await getAllWards();
    setWards(res);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setDateFilter(null);
    setSponsorFilter("all");
    setDepartmentFilter("all");
    setWardFilter("all");
  };

  const filterAdmissions = () => {
    let filtered = [...admissions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(ad => 
        ad.admission_no.toString().includes(term) ||
        ad.patient?.Name.toLowerCase().includes(term) ||
        ad.patient?.ContactNumber.includes(term) ||
        ad.bed?.bed_number.toLowerCase().includes(term)
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(ad => 
        new Date(ad.admission_date).toDateString() === dateFilter.toDateString()
      );
    }

    if (sponsorFilter !== "all") {
      filtered = filtered.filter(ad => 
        ad.patient?.Sponsor === sponsorFilter
      );
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter(ad => 
        ad.diagnosis?.DepartmentID.toString() === departmentFilter
      );
    }

    if (wardFilter !== "all") {
      filtered = filtered.filter(ad => 
        ad.bed?.room?.ward_id.toString() === wardFilter
      );
    }

    setFilteredAdmissions(filtered);
    setCurrentPage(1);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      const idsOnCurrentPage = currentAdmissions.map(ad => ad.admission_id);
      setSelectedIds(idsOnCurrentPage);
    }
    setIsAllSelected(!isAllSelected);
  };

  const openDischargeModal = (singleId = null) => {
    if (singleId !== null) {
      setSelectedIds([singleId]);
      setIsBulkDischarge(false);
    } else {
      if (selectedIds.length === 0) return;
      setIsBulkDischarge(true);
    }
    setSelectedReasonId(null);
    setShowModal(true);
  };

//   const handleDischarge = async () => {
//     try {
//       if (isBulkDischarge) {
//         await dischargeAdmissionsBulk(selectedIds);
//       } else {
//         if (!selectedReasonId) {
//           alert("Please select a discharge reason.");
//           return;
//         }
//         await dischargeAdmission(selectedIds[0], selectedReasonId);
//       }
//       setSelectedIds([]);
//       setSelectedReasonId(null);
//       setShowModal(false);
//       setIsAllSelected(false);
//       fetchAdmissions();
//     } catch (error) {
//       alert("Failed to discharge. Try again.");
//       console.error(error);
//     }
//   };
const handleDischarge = async () => {
    try {
      if (isBulkDischarge) {
        await dischargeAdmissionsBulk(selectedIds);
        toast.success(`Successfully discharged ${selectedIds.length} patients!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (!selectedReasonId) {
          toast.warn("Please select a discharge reason.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        await dischargeAdmission(selectedIds[0], selectedReasonId);
        toast.success("Patient discharged successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setSelectedIds([]);
      setSelectedReasonId(null);
      setShowModal(false);
      setIsAllSelected(false);
      fetchAdmissions();
    } catch (error) {
      toast.error(`Failed to discharge: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  };


  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentAdmissions = filteredAdmissions.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredAdmissions.length / patientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
        <div className="flex items-center mb-6">
          <GiHospital className="text-3xl text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-blue-800">Inpatients for Discharge</h2>
        </div>
        
        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaFilter className="absolute left-2 top-3 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCalendarAlt className="mr-1" /> Admission Date
            </label>
            <div className="relative">
              <DatePicker
                selected={dateFilter}
                onChange={date => setDateFilter(date)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Filter by date"
                isClearable
              />
              <FaCalendarAlt className="absolute left-2 top-3 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={sponsorFilter}
              onChange={(e) => setSponsorFilter(e.target.value)}
            >
              <option value="all">All Sponsors</option>
              <option value="MEDICARE">Medicare</option>
              <option value="SPECIMEN">Specimen</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.DepartmentID} value={dept.DepartmentID}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
            >
              <option value="all">All Wards</option>
              {wards.map(ward => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || dateFilter || sponsorFilter !== "all" || departmentFilter !== "all" || wardFilter !== "all") && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={clearAllFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <FaTimes className="mr-1" /> Clear All Filters
            </button>
          </div>
        )}

        {/* Patient Count and Select All */}
        <div className="flex justify-between items-center mb-4 bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-700">{filteredAdmissions.length}</span> patients found
            <span className="mx-2">•</span>
            <span className="font-medium text-blue-700">{currentAdmissions.length}</span> on this page
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-blue-700">
              {selectedIds.length} selected
            </span>
            <button
              onClick={toggleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isAllSelected ? 'Deselect All' : 'Select All on Page'}
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-blue-200 focus:ring-blue-300 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Admission No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bed/Ward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Admission Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAdmissions.map((ad) => (
                <tr key={ad.admission_id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(ad.admission_id)}
                      onChange={() => toggleSelect(ad.admission_id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{ad.admission_no}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ad.patient?.Name}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaVenusMars className="mr-1" />
                      {ad.patient?.Gender}
                      <span className="mx-2">•</span>
                      <FaPhone className="mr-1" />
                      {ad.patient?.ContactNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FaBed className="mr-1 text-blue-500" />
                      {ad.bed?.bed_number}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {ad.bed?.room?.ward?.ward_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MdSick className="mr-1 text-red-500" />
                      {ad.diagnosis?.DiagnosisName}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {ad.diagnosis?.Departments?.DepartmentName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-blue-500" />
                      {new Date(ad.admission_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center mt-1">
                      <FaClock className="mr-1 text-blue-500" />
                      {new Date(ad.admission_date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
  className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 transform hover:scale-105 group"
  onClick={() => openDischargeModal(ad.admission_id)}
>
  {/* Button text with transition */}
  <span className="relative z-10 flex items-center transition-all duration-300 group-hover:tracking-wider">
    Discharge
    <svg 
      className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </span>
  
  {/* Ripple effect background */}
  <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"></span>
  
  {/* Pulse animation on hover */}
  <span className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-md transition-opacity duration-300"></span>
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredAdmissions.length > patientsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
              >
                Previous
              </button>
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`}
                >
                  {number}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Discharge Button */}
        <div className="mt-6 flex justify-end">
        <button
  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-2 rounded-md shadow-sm font-medium flex items-center disabled:opacity-50 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
  onClick={() => openDischargeModal(null)}
  disabled={selectedIds.length === 0}
>
  <span>Discharge Selected</span>
  {selectedIds.length > 0 && (
    <span className="ml-2 bg-green-700 px-2 py-1 rounded-full text-xs">
      {selectedIds.length}
    </span>
  )}
</button>

        </div>
      </div>

      {/* Discharge Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isBulkDischarge
                  ? `Confirm Discharge for ${selectedIds.length} Patients`
                  : "Select Discharge Reason"}
              </h3>

              {!isBulkDischarge ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discharge Reason
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={selectedReasonId || ""}
                    onChange={(e) => setSelectedReasonId(parseInt(e.target.value))}
                  >
                    <option value="" disabled>
                      Choose reason
                    </option>
                    {reasons.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.reason}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">
                  Bulk discharge will assign random discharge reasons to each selected admission.
                </p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
                  onClick={handleDischarge}
                >
                  Confirm Discharge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}