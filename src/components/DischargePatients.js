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

























import React, { useEffect, useState } from "react";
import { getAllAdmissionsWithDetails } from "../services/admissionService";
import { getDischargeReasons } from "../services/DischargeReasonsService";
import axios from "axios";
export default function DischargePatients() {
  const [admissions, setAdmissions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAdmissions();
    fetchDischargeReasons();
  }, []);

  const fetchAdmissions = async () => {
    const res = await getAllAdmissionsWithDetails();
    setAdmissions(res);
  };

  const fetchDischargeReasons = async () => {
    const res = await getDischargeReasons();
    setReasons(res);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDischarge = async () => {
    if (!selectedReasonId || selectedIds.length === 0) return;
    await axios.post("/api/admissions/discharge", {
      admissionIds: selectedIds,
      dischargeReasonId: selectedReasonId,
    });
    setSelectedIds([]);
    setShowModal(false);
    fetchAdmissions();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inpatients for Discharge</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th></th>
            <th>Admission No</th>
            <th>Patient Name</th>
            <th>Bed</th>
            <th>Diagnosis</th>
            <th>Admit Date</th>
          </tr>
        </thead>
        <tbody>
        {admissions.map((ad) => (
  <tr key={ad.admission_id} className="border-b">
    <td>
      <input
        type="checkbox"
        checked={selectedIds.includes(ad.admission_id)}
        onChange={() => toggleSelect(ad.admission_id)}
      />
    </td>
    <td>{ad.admission_no}</td>
    <td>{ad.patient?.Name}</td>
    <td>{ad.bed?.bed_number}</td>
    <td>{ad.diagnosis?.DiagnosisName}</td>
    <td>{new Date(ad.admission_date).toLocaleDateString()}</td>
    <td>
      <button
        className="text-sm text-white bg-blue-600 px-3 py-1 rounded"
        onClick={() => {
          setSelectedIds([ad.admission_id]);
          setShowModal(true);
        }}
      >
        Discharge
      </button>
    </td>
  </tr>
))}
        </tbody>
      </table>

      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
        disabled={selectedIds.length === 0}
      >
        Discharge Selected
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Select Discharge Reason</h3>
            <select
              className="w-full border p-2 mb-4"
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
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleDischarge}
              >
                Confirm Discharge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
