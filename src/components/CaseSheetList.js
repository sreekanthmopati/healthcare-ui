// import React, { useEffect, useState } from "react";
// import { getAllCaseSheetsWithDetails } from "../services/caseSheetService";

// const CaseSheetList = () => {
//   const [allCaseSheets, setAllCaseSheets] = useState([]);
//   const [filteredCaseSheets, setFilteredCaseSheets] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("both");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchCaseSheets();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, filterType, allCaseSheets]);

//   const fetchCaseSheets = async () => {
//     try {
//       setIsLoading(true);
//       const data = await getAllCaseSheetsWithDetails();
//       setAllCaseSheets(data);
//       console.log(data)
//     } catch (error) {
//       console.error("Error fetching case sheets:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const applyFilters = () => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const filtered = allCaseSheets.filter((sheet) => {
//       const patient = sheet.MedicalRecord?.Patients || {};
      
//       // Search functionality
//       const searchMatch = 
//         patient.PatientID?.toLowerCase().includes(lowerSearch) ||
//         patient.ContactNumber?.includes(searchTerm) ||
//         patient.Name?.toLowerCase().includes(lowerSearch);
      
//       // Filter by patient type (OP/IP)
//       let typeMatch = true;
//       if (filterType !== "both") {
//         typeMatch = patient.Ptype === filterType;
//       }
      
//       return searchMatch && typeMatch;
//     });
//     setFilteredCaseSheets(filtered);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col space-y-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Patient Case Sheets</h1>
//           {!isLoading && (
//             <div className="text-sm text-gray-500">
//               {filteredCaseSheets.length} {filteredCaseSheets.length === 1 ? 'record' : 'records'} found
//             </div>
//           )}
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
//           {/* Patient Type Filter */}
//           <div className="w-full md:w-auto">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Patient Type</label>
//             <div className="flex gap-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   checked={filterType === "IP"}
//                   onChange={() => setFilterType("IP")}
//                 />
//                 <span className="ml-2 text-gray-700">Inpatient (IP)</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   checked={filterType === "OP"}
//                   onChange={() => setFilterType("OP")}
//                 />
//                 <span className="ml-2 text-gray-700">Outpatient (OP)</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   checked={filterType === "both"}
//                   onChange={() => setFilterType("both")}
//                 />
//                 <span className="ml-2 text-gray-700">Both</span>
//               </label>
//             </div>
//           </div>

//           {/* Search Input */}
//           <div className="w-full md:w-96 relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg
//                 className="h-5 w-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Search by Patient ID, Name or Contact"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Loading State */}
//       {isLoading ? (
//         <div className="mt-8 flex justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         /* Results */
//         <div className="border rounded-lg overflow-hidden">
//           {filteredCaseSheets.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <svg
//                 className="h-12 w-12 text-gray-400 mb-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <h3 className="text-lg font-medium text-gray-900">No case sheets found</h3>
//               <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200 max-h-[calc(100vh-220px)] overflow-y-auto">
//               {filteredCaseSheets.map((sheet) => {
//                 const patient = sheet.MedicalRecord?.Patients || {};
//                 const admission = sheet.MedicalRecord?.Admissions || {};
//                 const diagnosis = admission?.diagnosis || {};
//                 const department = admission?.Departments || {};
                
//                 // Fallback to patient's department if admission department is not available
//                 const departmentName = department?.DepartmentName || patient?.DepartmentName || "--";
                
//                 const diagnosisName = diagnosis?.DiagnosisName || "--";

//                 return (
//                   <div key={sheet.CaseSheetID} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                     <div className="flex flex-col md:flex-row justify-between gap-4">
//                       {/* Patient Info */}
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2">
//                           <span className="text-gray-500">
//                             <svg
//                               className="h-5 w-5"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                               />
//                             </svg>
//                           </span>
//                           <h3 className="text-lg font-semibold text-gray-800">
//                             {patient.Name}
//                           </h3>
//                           <span
//                             className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                               patient.Ptype === 'IP'
//                                 ? 'bg-blue-100 text-blue-800'
//                                 : 'bg-green-100 text-green-800'
//                             }`}
//                           >
//                             {patient.Ptype === 'IP' ? 'Inpatient' : 'Outpatient'}
//                           </span>
//                         </div>

//                         <div className="space-y-1 ml-7">
//                           <div className="flex items-center text-sm text-gray-600">
//                             <span className="font-medium w-20">Patient ID:</span>
//                             <span className="font-mono">{patient.PatientID || "--"}</span>
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <span className="font-medium w-20">Contact:</span>
//                             <span>{patient.ContactNumber || "--"}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Admission Info */}
//                       <div className="space-y-2 min-w-[250px] ml-7 md:ml-0">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <span className="text-gray-500 mr-1">
//                             <svg
//                               className="h-5 w-5"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                               />
//                             </svg>
//                           </span>
//                           <span className="ml-1">
//                             <span className="font-medium">Department:</span> {departmentName}
//                           </span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <span className="text-gray-500 mr-1">
//                             <svg
//                               className="h-5 w-5"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                               />
//                             </svg>
//                           </span>
//                           <span className="ml-1">
//                             <span className="font-medium">Diagnosis:</span> {diagnosisName}
//                           </span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <span className="text-gray-500 mr-1">
//                             <svg
//                               className="h-5 w-5"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               />
//                             </svg>
//                           </span>
//                           <span className="ml-1">
//                             <span className="font-medium">Admitted:</span> {admission.admission_date ? new Date(admission.admission_date).toLocaleDateString() : "--"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Case Sheet Content */}
//                     <div className="mt-4 p-3 bg-gray-50 rounded-md">
//                       <h4 className="font-medium text-gray-700 mb-1">Case Sheet Details</h4>
//                       <p className="text-sm text-gray-600">{sheet.CaseSheet || "No details available"}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CaseSheetList;






import React, { useEffect, useState } from 'react';
import { getAllCaseSheetsWithDetails } from '../services/caseSheetService';
import { useNavigate } from 'react-router-dom';
import CaseSheetPopup from './CaseSheetPopup';
import { 
  FaSearch, 
  FaUserInjured, 
  FaProcedures, 
  FaNotesMedical, 
  FaFileMedical, 
  FaHospitalUser,
  FaPhone,
  FaIdCard,
  FaCalendarAlt,
  FaStethoscope,
  FaPills,
  FaClinicMedical
} from 'react-icons/fa';
import { MdOutlineSick, MdHealthAndSafety, MdFilterAlt, MdDateRange } from 'react-icons/md';

const CaseSheetList = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await getAllCaseSheetsWithDetails();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const filteredRecords = records.filter(record => {
    // Filter by IP/OP status
    if (filter !== 'ALL' && record.Patients?.Ptype?.toUpperCase() !== filter) {
      return false;
    }
  
    // Search functionality
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        record.Patients?.Name?.toLowerCase().includes(searchLower) ||
        record.Patients?.ContactNumber?.includes(searchTerm) ||
        record.Patients?.UMR?.toLowerCase().includes(searchLower) ||
        record.PatientID?.toLowerCase().includes(searchLower) // ✅ closing parenthesis fixed
      );
    }
  
    return true;
  });
  

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Function to format diagnosis text
  const formatDiagnosis = (text) => {
    if (!text) return 'No diagnosis details available';
    // Remove markdown-like formatting if present
    return text.replace(/\*\*/g, '').replace(/\n/g, ' ').substring(0, 100) + '...';
  };

  // Function to extract first medication
  const getFirstMedication = (medicationText) => {
    if (!medicationText) return 'No medications listed';
    const firstMed = medicationText.split('\n')[0];
    return firstMed.length > 50 ? firstMed.substring(0, 50) + '...' : firstMed;
  };

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FaFileMedical className="text-blue-600 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-600">Medical</span> Records
            </h2>
          </div>
          
          {/* Search and Filter Section */}
          <div className="w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, UMR, mobile..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative flex items-center">
              <MdFilterAlt className="absolute left-3 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="ALL">All Patients</option>
                <option value="IP">Inpatient <FaProcedures className="inline" /></option>
                <option value="OP">Outpatient <FaHospitalUser className="inline" /></option>
              </select>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 gap-5">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div
                key={record.RecordID}
                className={'border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 bg-white'}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {record.Patients?.Gender === 'female' ? (
                        <FaUserInjured className="text-pink-500 mr-2" />
                      ) : (
                        <FaUserInjured className="text-blue-500 mr-2" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800">
                        {record.Patients?.Name} 
                        <span className="ml-2 text-sm font-normal px-2 py-1 rounded-full 
                          bg-blue-100 text-blue-800">
                          {record.Patients?.UMR}
                        </span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                          record.Patients?.Ptype === 'IP' 
                            ? 'bg-blue-200 text-blue-800' 
                            : 'bg-green-200 text-green-800'
                        }`}>
                          {record.Patients?.Ptype === 'IP' ? 'Inpatient' : 'Outpatient'}
                        </span>
                      </h3>
                    </div>
                    
                    <div className="ml-6 space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Patient Demographics */}
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 flex items-center">
                            <MdHealthAndSafety className="mr-2 text-blue-500" />
                            {record.Patients?.Gender}, {record.Patients?.Age} years
                            {record.Patients?.BloodGroup && (
                              <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                                {record.Patients.BloodGroup}
                              </span>
                            )}
                          </p>
                          
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaPhone className="mr-2 text-green-500" />
                            {record.Patients?.ContactNumber || 'No contact'}
                          </p>
                          
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaIdCard className="mr-2 text-purple-500" />
                            {record.PatientID}
                          </p>
                        </div>
                        
                        {/* Medical Information */}
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 flex items-start">
                            <FaStethoscope className="mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Diagnosis:</span> {formatDiagnosis(record.DiagnosisDetails)}
                          </p>
                          
                          <p className="text-sm text-gray-600 flex items-start">
                            <FaPills className="mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Medication:</span> {getFirstMedication(record.Medication)}
                          </p>
                          
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaClinicMedical className="mr-2 text-indigo-500" />
                            <span className="font-medium">Department:</span> {record.Patients?.DepartmentID || 'General'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <MdDateRange className="mr-1" />
                        <span>Created: {new Date(record.CreatedAt).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>Updated: {new Date(record.UpdatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 mt-3 md:mt-0 md:ml-4">
                    <button
                      onClick={() => openModal(record)}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${
                        record.Patients?.Ptype === 'IP' 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      <FaFileMedical className="mr-2" />
                      View Full Case
                    </button>
                    
                    <button
                      onClick={() => navigate(`/patient/${record.PatientID}`)}
                      className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      <FaUserInjured className="mr-2" />
                      Patient Profile
                    </button>
                    
                    {record.AdmissionNo && (
                      <button
                        onClick={() => navigate(`/admissions/${record.AdmissionNo}`)}
                        className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200"
                      >
                        <FaProcedures className="mr-2" />
                        Admission Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
              <MdOutlineSick className="mx-auto text-4xl text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-600">No records found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Case Sheet Modal */}
      {selectedRecord && isModalOpen && (
        <CaseSheetPopup
          caseSheet={selectedRecord.CaseSheet}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CaseSheetList;






