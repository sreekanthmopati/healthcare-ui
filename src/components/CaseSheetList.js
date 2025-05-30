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



import React, { useEffect, useState } from "react";
import { getAllCaseSheetsWithDetails } from "../services/caseSheetService";
import CaseSheetPopup from "./CaseSheetPopup"; // Make sure to import your popup component

const CaseSheetList = () => {
  const [allCaseSheets, setAllCaseSheets] = useState([]);
  const [filteredCaseSheets, setFilteredCaseSheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("both");
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCaseSheet, setSelectedCaseSheet] = useState(null);

  useEffect(() => {
    fetchCaseSheets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterType, allCaseSheets]);

  const fetchCaseSheets = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCaseSheetsWithDetails();
      setAllCaseSheets(data);
    } catch (error) {
      console.error("Error fetching case sheets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = allCaseSheets.filter((sheet) => {
      const patient = sheet.MedicalRecord?.Patients || {};
      
      // Search functionality
      const searchMatch = 
        patient.PatientID?.toLowerCase().includes(lowerSearch) ||
        patient.ContactNumber?.includes(searchTerm) ||
        patient.Name?.toLowerCase().includes(lowerSearch);
      
      // Filter by patient type (OP/IP)
      let typeMatch = true;
      if (filterType !== "both") {
        typeMatch = patient.Ptype === filterType;
      }
      
      return searchMatch && typeMatch;
    });
    setFilteredCaseSheets(filtered);
  };

  const handleCardClick = (sheet) => {
    setSelectedCaseSheet(sheet);
    setIsPopupOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Patient Case Sheets</h1>
          {!isLoading && (
            <div className="text-sm text-gray-500">
              {filteredCaseSheets.length} {filteredCaseSheets.length === 1 ? 'record' : 'records'} found
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Patient Type Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Type</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filterType === "IP"}
                  onChange={() => setFilterType("IP")}
                />
                <span className="ml-2 text-gray-700">Inpatient (IP)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filterType === "OP"}
                  onChange={() => setFilterType("OP")}
                />
                <span className="ml-2 text-gray-700">Outpatient (OP)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filterType === "both"}
                  onChange={() => setFilterType("both")}
                />
                <span className="ml-2 text-gray-700">Both</span>
              </label>
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-96 relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by Patient ID, Name or Contact"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        /* Results */
        <div className="border rounded-lg overflow-hidden">
          {filteredCaseSheets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="h-12 w-12 text-gray-400 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No case sheets found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-[calc(100vh-220px)] overflow-y-auto">
              {filteredCaseSheets.map((sheet) => {
                const patient = sheet.MedicalRecord?.Patients || {};
                const admission = sheet.MedicalRecord?.Admissions || {};
                const diagnosis = admission?.diagnosis || {};
                const department = admission?.Departments || {};
                
                // Fallback to patient's department if admission department is not available
                const departmentName = department?.DepartmentName || patient?.DepartmentName || "--";
                
                const diagnosisName = diagnosis?.DiagnosisName || "--";

                return (
                //   <div 
                //     key={sheet.CaseSheetID} 
                //     className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                //     onClick={() => handleCardClick(sheet)}
                //   >
                //     <div className="flex flex-col md:flex-row justify-between gap-4">
                //       {/* Patient Info */}
                //       <div className="space-y-2">
                //         <div className="flex items-center gap-2">
                //           <span className="text-gray-500">
                //             <svg
                //               className="h-5 w-5"
                //               xmlns="http://www.w3.org/2000/svg"
                //               fill="none"
                //               viewBox="0 0 24 24"
                //               stroke="currentColor"
                //             >
                //               <path
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //                 strokeWidth={2}
                //                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                //               />
                //             </svg>
                //           </span>
                //           <h3 className="text-lg font-semibold text-gray-800">
                //             {patient.Name}
                //           </h3>
                //           <span
                //             className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                //               patient.Ptype === 'IP'
                //                 ? 'bg-blue-100 text-blue-800'
                //                 : 'bg-green-100 text-green-800'
                //             }`}
                //           >
                //             {patient.Ptype === 'IP' ? 'Inpatient' : 'Outpatient'}
                //           </span>
                //         </div>

                //         <div className="space-y-1 ml-7">
                //           <div className="flex items-center text-sm text-gray-600">
                //             <span className="font-medium w-20">Patient ID:</span>
                //             <span className="font-mono">{patient.PatientID || "--"}</span>
                //           </div>
                //           <div className="flex items-center text-sm text-gray-600">
                //             <span className="font-medium w-20">Contact:</span>
                //             <span>{patient.ContactNumber || "--"}</span>
                //           </div>
                //         </div>
                //       </div>

                //       {/* Admission Info */}
                //       <div className="space-y-2 min-w-[250px] ml-7 md:ml-0">
                //         <div className="flex items-center text-sm text-gray-600">
                //           <span className="text-gray-500 mr-1">
                //             <svg
                //               className="h-5 w-5"
                //               xmlns="http://www.w3.org/2000/svg"
                //               fill="none"
                //               viewBox="0 0 24 24"
                //               stroke="currentColor"
                //             >
                //               <path
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //                 strokeWidth={2}
                //                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                //               />
                //             </svg>
                //           </span>
                //           <span className="ml-1">
                //             <span className="font-medium">Department:</span> {departmentName}
                //           </span>
                //         </div>
                //         <div className="flex items-center text-sm text-gray-600">
                //           <span className="text-gray-500 mr-1">
                //             <svg
                //               className="h-5 w-5"
                //               xmlns="http://www.w3.org/2000/svg"
                //               fill="none"
                //               viewBox="0 0 24 24"
                //               stroke="currentColor"
                //             >
                //               <path
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //                 strokeWidth={2}
                //                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                //               />
                //             </svg>
                //           </span>
                //           <span className="ml-1">
                //             <span className="font-medium">Diagnosis:</span> {diagnosisName}
                //           </span>
                //         </div>
                //         <div className="flex items-center text-sm text-gray-600">
                //           <span className="text-gray-500 mr-1">
                //             <svg
                //               className="h-5 w-5"
                //               xmlns="http://www.w3.org/2000/svg"
                //               fill="none"
                //               viewBox="0 0 24 24"
                //               stroke="currentColor"
                //             >
                //               <path
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //                 strokeWidth={2}
                //                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                //               />
                //             </svg>
                //           </span>
                //           <span className="ml-1">
                //             <span className="font-medium">Admitted:</span> {admission.admission_date ? new Date(admission.admission_date).toLocaleDateString() : "--"}
                //           </span>
                //         </div>
                //       </div>
                //     </div>

                //     {/* Case Sheet Content Preview */}
                //     <div className="mt-4 p-3 bg-gray-50 rounded-md">
                //       <h4 className="font-medium text-gray-700 mb-1">Case Sheet Preview</h4>
                //       <p className="text-sm text-gray-600 line-clamp-2">
                //         {sheet.CaseSheet || "No details available"}
                //       </p>
                //     </div>
                //   </div>
                <div 
  key={sheet.CaseSheetID} 
  className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200 mb-3"
  onClick={() => handleCardClick(sheet)}
>
  {/* Header Row */}
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 className="text-md font-semibold text-gray-800">
        {patient.Name}
      </h3>
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        patient.Ptype === 'IP' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {patient.Ptype === 'IP' ? 'Inpatient' : 'Outpatient'}
      </span>
    </div>
    <span className="text-xs font-mono text-gray-500">ID: {patient.PatientID || "--"}</span>
  </div>

  {/* Details Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
    <div className="space-y-1">
      {/* <p className="text-xs text-gray-500">Department</p>
      <p className="font-medium">{departmentName}</p> */}
    </div>
    <div className="space-y-1">
      <p className="text-xs text-gray-500">Diagnosis</p>
      <p className="font-medium">{diagnosisName}</p>
    </div>
    <div className="space-y-1">
      <p className="text-xs text-gray-500">Admitted</p>
      <p className="font-medium">
        {admission.admission_date ? new Date(admission.admission_date).toLocaleDateString() : "--"}
      </p>
    </div>
    <div className="space-y-1">
      <p className="text-xs text-gray-500">Contact</p>
      <p className="font-medium">{patient.ContactNumber || "--"}</p>
    </div>
  </div>

  {/* Case Sheet Preview */}
  <div className="mt-3 pt-3 border-t border-gray-100">
    <p className="text-xs text-gray-500 mb-1">Case Sheet Preview</p>
    <p className="text-sm text-gray-700 line-clamp-2">
      {sheet.CaseSheet || "No details available"}
    </p>
  </div>
</div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Case Sheet Popup */}
      {isPopupOpen && selectedCaseSheet && (
        <CaseSheetPopup 
          caseSheet={selectedCaseSheet} 
          onClose={() => setIsPopupOpen(false)} 
        />
      )}
    </div>
  );
};

export default CaseSheetList;





