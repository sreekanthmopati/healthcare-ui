// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getPatientWithRecords } from "../services/patientService";
// import { getCaseSheet } from "../services/caseSheetService";
// import CaseSheetPopup from "./CaseSheetPopup";
// import Sidebar from "./Sidebar"; 

// const PatientDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [patient, setPatient] = useState(null);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [caseSheet, setCaseSheet] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [active, setActive] = useState("Dashboard"); // State for active menu item

//   useEffect(() => {
//     if (!id) {
//       console.error("Error: No patient ID found in URL");
//       setError("Invalid patient ID.");
//       setLoading(false);
//       return;
//     }

//     const fetchPatient = async () => {
//       try {
//         const data = await getPatientWithRecords(id);
//         if (!data || Object.keys(data).length === 0) {
//           setError("No patient records found.");
//         } else {
//           setPatient(data.patient);
//           setMedicalRecords(data.medicalRecords || []);
//         }
//       } catch (error) {
//         setError("Failed to load patient details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatient();
//   }, [id]);

//   const fetchCaseSheet = async () => {
//     try {
//       const data = await getCaseSheet(id);
//       setCaseSheet(data);
//       setIsPopupOpen(true);
//     } catch (error) {
//       console.error("Error fetching case sheet:", error);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (!patient) return <p className="text-center text-red-500">Patient not found.</p>;

//   const latestRecord = medicalRecords.length > 0 ? medicalRecords[0] : {};

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar active={active} setActive={setActive} />

//       {/* Main Content */}
//       <div className="flex-1 p-4 bg-gray-100 min-h-screen">
//         {/* Patient Info Header */}
//         <div className="bg-white p-4 rounded-md shadow-md">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div>
//               <h2 className="text-xl font-bold">{patient.Name}</h2>
//               <p className="text-gray-600">
//                 {patient.Gender} | {patient.Age} Years
//               </p>
//               <p className="text-gray-600">Patient ID: {patient.PatientID.toUpperCase()}</p>
//               <p className="text-gray-600">Department: {patient.DepartmentName}</p>
//               <p className="text-gray-600">Status: {patient.Status}</p>
//             </div>
//           </div>
//           <div className="mt-2 text-sm text-gray-500">
//             <p>Admission Date:{new Date(patient.CreatedAt).toLocaleDateString()}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-4 flex gap-2 flex-wrap">
          
//           {/* <button className="bg-gray-200 px-4 py-2 rounded-md">Anaesthesia Record</button> */} 
//           {/* <button className="bg-gray-200 px-4 py-2 rounded-md">PACS</button> */}
//           <button className="bg-gray-200 px-4 py-2 rounded-md">Drug Advice</button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md">Reports</button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={fetchCaseSheet}>Case Sheet</button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md">Discharge</button>
//         </div>

//         {/* Sections */}
//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <div className="bg-green-500 text-white p-2 rounded-t-md">Diagnosis Details</div>
//           <div className="bg-red-500 text-white p-2 rounded-t-md">Medications</div>
//           <div className="border p-4 col-span-1">{latestRecord.DiagnosisDetails || "No Records"}</div>
//           <div className="border p-4 col-span-1">{latestRecord.medication || "No Records"}</div>
//           <div className="bg-orange-500 text-white p-2 rounded-t-md">Treatment Plan</div>
//           <div className="bg-teal-500 text-white p-2 rounded-t-md">Admitted on</div>
//           <div className="border p-4 col-span-1">{latestRecord.TreatmentPlan || "No Records"}</div>
//           <div className="border p-4 col-span-1">{latestRecord.CreatedAt || "No Records"}</div>
//         </div>

//         {/* Case Sheet Popup */}
//         {isPopupOpen && caseSheet && (
//           <CaseSheetPopup caseSheet={caseSheet} onClose={() => setIsPopupOpen(false)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientDetails;



// import React, { useEffect, useState } from "react"; 
// import { useNavigate, useParams } from "react-router-dom";
// import { getPatientWithRecords } from "../services/patientService";
// import { getCaseSheet } from "../services/caseSheetService";
// import CaseSheetPopup from "./CaseSheetPopup";
// import Sidebar from "./Sidebar";

// const dischargeReasons = ["Treatment Completed", "Referred to Another Hospital", "Patient Request"];

// const capitalizeFirstLetter = (text) => {
//   if (!text) return "";
//   return text.charAt(0).toUpperCase() + text.slice(1);
// };

// const PatientDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [patient, setPatient] = useState(null);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [caseSheet, setCaseSheet] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [active, setActive] = useState("Dashboard");

//   const [isDrugAdviceOpen, setIsDrugAdviceOpen] = useState(false);
//   const [isDischargeDropdownOpen, setIsDischargeDropdownOpen] = useState(false);
//   const [selectedDischargeReason, setSelectedDischargeReason] = useState(null);
//   const [discharged, setDischarged] = useState(false);

//   useEffect(() => {
//     if (!id) {
//       console.error("Error: No patient ID found in URL");
//       setError("Invalid patient ID.");
//       setLoading(false);
//       return;
//     }

//     const fetchPatient = async () => {
//       try {
//         const data = await getPatientWithRecords(id);
//         if (!data || Object.keys(data).length === 0) {
//           setError("No patient records found.");
//         } else {
//           setPatient(data.patient);
//           setMedicalRecords(data.medicalRecords || []);
//         }
//       } catch (error) {
//         setError("Failed to load patient details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatient();
//   }, [id]);

//   const fetchCaseSheet = async () => {
//     try {
//       const data = await getCaseSheet(id);
//       setCaseSheet(data);
//       setIsPopupOpen(true);
//     } catch (error) {
//       console.error("Error fetching case sheet:", error);
//     }
//   };

//   const handleDischargeClick = () => {
//     setIsDischargeDropdownOpen(false);
//     setSelectedDischargeReason(null);
//     setDischarged(true);
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (!patient) return <p className="text-center text-red-500">Patient not found.</p>;

//   const latestRecord = medicalRecords.length > 0 ? medicalRecords[0] : {};

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar active={active} setActive={setActive} />

//       {/* Main Content */}
//       <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">

//         {/* Patient Info Header */}
//         <div className="bg-white p-4 rounded-md shadow-md">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div>
//               <h2 className="text-xl font-bold">{patient.Name}</h2>
//               <p className="text-gray-600">
//                 {patient.Gender} | {patient.Age} Years
//               </p>
//               <p className="text-gray-600">Patient ID: {patient.PatientID.toUpperCase()}</p>
//               <p className="text-gray-600">Department: {patient.DepartmentName}</p>
//               <p className="text-gray-600">Status: {patient.Status}</p>
//               <p className="text-gray-600">
//                 Admission Date: {new Date(patient.CreatedAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-4 flex gap-2 flex-wrap relative">
//           <button
//             className="bg-gray-200 px-4 py-2 rounded-md"
//             onClick={() => setIsDrugAdviceOpen(true)}
//           >
//             Drug Advice
//           </button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md">Reports</button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={fetchCaseSheet}>
//             Case Sheet
//           </button>

//           <div className="relative">
//             {discharged ? (
//               <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-not-allowed" disabled>
//                 Discharged
//               </button>
//             ) : (
//               <button
//                 className="bg-gray-200 px-4 py-2 rounded-md"
//                 onClick={() => setIsDischargeDropdownOpen(!isDischargeDropdownOpen)}
//               >
//                 Discharge
//               </button>
//             )}

//             {isDischargeDropdownOpen && (
//               <div className="absolute bg-white border mt-1 rounded shadow-md w-64 z-10">
//                 {dischargeReasons.map((reason, index) => (
//                   <div
//                     key={index}
//                     onClick={() => setSelectedDischargeReason(reason)}
//                     className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedDischargeReason === reason ? "bg-gray-100 font-medium" : ""}`}
//                   >
//                     {reason}
//                   </div>
//                 ))}
//                 {selectedDischargeReason && (
//                   <div className="p-2 text-center">
//                     <button
//                       className="bg-green-500 text-white px-4 py-1 rounded-md mt-2"
//                       onClick={handleDischargeClick}
//                     >
//                       Confirm Discharge
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Sections */}
//         {/* <div className="mt-4 grid grid-cols-2 gap-4">
//           <div className="bg-blue-500 text-white p-2 rounded-t-md">Diagnosis Details</div>
//           <div className="bg-blue-600 text-white p-2 rounded-t-md">Medications</div>
//           <div className="border p-4 col-span-1">
//             {capitalizeFirstLetter(latestRecord.DiagnosisDetails) || "No Records"}
//           </div>
//           <div className="border p-4 col-span-1">
//             {capitalizeFirstLetter(latestRecord.medication) || "No Records"}
//           </div>

//           <div className="bg-blue-700 text-white p-2 rounded-t-md">Treatment Plan</div>
//           <div className="bg-blue-800 text-white p-2 rounded-t-md">Admitted on</div>
          
//           <div className="border p-4 col-span-1">
//             {capitalizeFirstLetter(latestRecord.TreatmentPlan) || "No Records"}
//           </div>
//           <div className="border p-4 col-span-1">
//             {latestRecord.CreatedAt
//               ? new Date(latestRecord.CreatedAt).toLocaleDateString()
//               : "No Records"}
//           </div>
          
//         </div> */}



// <div className="mt-4 grid grid-cols-2 gap-4">
//   {/* Diagnosis Details Card */}
//   <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="flex items-center mb-4">
//       <i className="fas fa-stethoscope text-blue-600 mr-2"></i>
//       <h3 className="text-lg font-semibold text-blue-600">Diagnosis Details</h3>
//     </div>
//     <p className="text-gray-700">{capitalizeFirstLetter(latestRecord.DiagnosisDetails) || "No Records"}</p>
//   </div>

//   {/* Medications Card */}
//   <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="flex items-center mb-4">
//       <i className="fas fa-pills text-blue-600 mr-2"></i>
//       <h3 className="text-lg font-semibold text-blue-600">Medications</h3>
//     </div>
//     <p className="text-gray-700">{capitalizeFirstLetter(latestRecord.medication) || "No Records"}</p>
//   </div>

//   {/* Treatment Plan Card */}
//   <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="flex items-center mb-4">
//       <i className="fas fa-briefcase-medical text-blue-600 mr-2"></i>
//       <h3 className="text-lg font-semibold text-blue-600">Treatment Plan</h3>
//     </div>
//     <p className="text-gray-700">{capitalizeFirstLetter(latestRecord.TreatmentPlan) || "No Records"}</p>
//   </div>

//   {/* Admitted On Card */}
//   <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="flex items-center mb-4">
//       <i className="fas fa-calendar-day text-blue-600 mr-2"></i>
//       <h3 className="text-lg font-semibold text-blue-600">Admitted on</h3>
//     </div>
//     <p className="text-gray-700">
//       {latestRecord.CreatedAt
//         ? new Date(latestRecord.CreatedAt).toLocaleDateString()
//         : "No Records"}
//     </p>
//   </div>
// </div>




//         {/* Discharge Notes */}
//         <div className="bg-black text-white font-bold text-center p-2 rounded-t-md">Discharge Notes</div>
//         <div className="border p-4 col-span-1">
//             {"Patient is advised to take complete rest and follow the medication plan for at least a week and visit the hospital for final diagnosis"}
//         </div>

//         {/* Drug Advice Popup */}
//         {isDrugAdviceOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
//               <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">Drug Advice</h2>
//               <p className="text-gray-700 whitespace-pre-line mb-6">
//                 {capitalizeFirstLetter(latestRecord.medication)}
//               </p>
//               <div className="flex justify-center">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => setIsDrugAdviceOpen(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Case Sheet Popup */}
//         {isPopupOpen && caseSheet && (
//           <CaseSheetPopup caseSheet={caseSheet} onClose={() => setIsPopupOpen(false)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientDetails;










import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientWithRecords } from "../services/patientService";
import { getCaseSheet } from "../services/caseSheetService";
import CaseSheetPopup from "./CaseSheetPopup";
import Sidebar from "./Sidebar";
import { FaUser, FaVenusMars, FaBirthdayCake, FaIdCard, FaClinicMedical, FaHeartbeat, FaCalendarAlt, FaPills, FaStethoscope, FaBriefcaseMedical, FaFileMedicalAlt, FaNotesMedical, FaProcedures } from "react-icons/fa";

const dischargeReasons = ["Treatment Completed", "Referred to Another Hospital", "Patient Request"];

const capitalizeFirstLetter = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const PatientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [caseSheet, setCaseSheet] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const [isDrugAdviceOpen, setIsDrugAdviceOpen] = useState(false);
  const [isDischargeDropdownOpen, setIsDischargeDropdownOpen] = useState(false);
  const [selectedDischargeReason, setSelectedDischargeReason] = useState(null);
  const [discharged, setDischarged] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Error: No patient ID found in URL");
      setError("Invalid patient ID.");
      setLoading(false);
      return;
    }

    const fetchPatient = async () => {
      try {
        const data = await getPatientWithRecords(id);
        if (!data || Object.keys(data).length === 0) {
          setError("No patient records found.");
        } else {
          setPatient(data.patient);
          setMedicalRecords(data.medicalRecords || []);
        }
      } catch (error) {
        setError("Failed to load patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const fetchCaseSheet = async () => {
    try {
      const data = await getCaseSheet(id);
      setCaseSheet(data);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching case sheet:", error);
    }
  };

  const handleDischargeClick = () => {
    setIsDischargeDropdownOpen(false);
    setSelectedDischargeReason(null);
    setDischarged(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!patient) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-center text-red-500 text-xl font-medium">Patient not found.</p>
    </div>
  );

  const latestRecord = medicalRecords.length > 0 ? medicalRecords[0] : {};

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Patient Info Header - Hospital Card Style */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <FaUser className="text-3xl" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{patient.Name}</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                      <div className="flex items-center">
                        <FaVenusMars className="mr-2 opacity-80" />
                        <span>{patient.Gender}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBirthdayCake className="mr-2 opacity-80" />
                        <span>{patient.Age} Years</span>
                      </div>
                      <div className="flex items-center">
                        <FaIdCard className="mr-2 opacity-80" />
                        <span>ID: {patient.PatientID.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClinicMedical className="mr-2 opacity-80" />
                        <span>{patient.DepartmentName}</span>
                      </div>
                      <div className="flex items-center">
                        <FaHeartbeat className="mr-2 opacity-80" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.Status === 'Active' ? 'bg-green-100 text-green-800' : 
                          patient.Status === 'Discharged' ? 'bg-purple-100 text-purple-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.Status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                    <FaCalendarAlt className="inline mr-1" />
                    {new Date(patient.CreatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 flex-wrap relative">
          <button
            className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            onClick={() => setIsDrugAdviceOpen(true)}
          >
            <FaPills />
            <span>Drug Advice</span>
          </button>
          <button className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <FaFileMedicalAlt />
            <span>Reports</span>
          </button>
          <button 
            className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            onClick={fetchCaseSheet}
          >
            <FaNotesMedical />
            <span>Case Sheet</span>
          </button>

          <div className="relative">
            {discharged ? (
              <button 
                className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg cursor-not-allowed" 
                disabled
              >
                <FaProcedures />
                <span>Discharged</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                onClick={() => setIsDischargeDropdownOpen(!isDischargeDropdownOpen)}
              >
                <FaProcedures />
                <span>Discharge</span>
              </button>
            )}

            {isDischargeDropdownOpen && (
              <div className="absolute bg-white border border-gray-200 mt-2 rounded-lg shadow-lg w-64 z-10 overflow-hidden animate-fadeIn">
                {dischargeReasons.map((reason, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDischargeReason(reason)}
                    className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedDischargeReason === reason ? "bg-blue-50 font-medium text-blue-600" : ""
                    }`}
                  >
                    {reason}
                  </div>
                ))}
                {selectedDischargeReason && (
                  <div className="p-3 bg-gray-50 border-t">
                    <button
                      className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                      onClick={handleDischargeClick}
                    >
                      Confirm Discharge
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Medical Records Sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Diagnosis Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg text-white mr-3 group-hover:rotate-6 transition-transform">
                <FaStethoscope className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800">Diagnosis Details</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-700">
                {capitalizeFirstLetter(latestRecord.DiagnosisDetails) || (
                  <span className="text-gray-400">No diagnosis records available</span>
                )}
              </p>
            </div>
          </div>

          {/* Medications Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
            <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 flex items-center">
              <div className="bg-green-500 p-3 rounded-lg text-white mr-3 group-hover:rotate-6 transition-transform">
                <FaPills className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-green-800">Medications</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-700">
                {capitalizeFirstLetter(latestRecord.medication) || (
                  <span className="text-gray-400">No medication records available</span>
                )}
              </p>
            </div>
          </div>

          {/* Treatment Plan Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg text-white mr-3 group-hover:rotate-6 transition-transform">
                <FaBriefcaseMedical className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800">Treatment Plan</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-700">
                {capitalizeFirstLetter(latestRecord.TreatmentPlan) || (
                  <span className="text-gray-400">No treatment plan available</span>
                )}
              </p>
            </div>
          </div>

          {/* Admitted On Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
            <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-4 flex items-center">
              <div className="bg-amber-500 p-3 rounded-lg text-white mr-3 group-hover:rotate-6 transition-transform">
                <FaCalendarAlt className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-amber-800">Admission Details</h3>
            </div>
            <div className="p-5">
              <div className="text-gray-700">
                <p className="mb-1">
                  <span className="font-medium">Date:</span>{" "}
                  {latestRecord.CreatedAt ? (
                    new Date(latestRecord.CreatedAt).toLocaleDateString()
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {latestRecord.CreatedAt ? (
                    `${Math.floor((new Date() - new Date(latestRecord.CreatedAt)) / (1000 * 60 * 60 * 24))} days`
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Discharge Notes */}
        <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FaNotesMedical className="mr-2" />
              Discharge Notes
            </h3>
          </div>
          <div className="p-5 bg-gray-50">
            <p className="text-gray-700 italic">
              {discharged && selectedDischargeReason ? (
                <>
                  <span className="font-medium">Discharge Reason:</span> {selectedDischargeReason}.<br />
                  Patient is advised to take complete rest and follow the medication plan for at least a week and visit the hospital for final diagnosis.
                </>
              ) : (
                "Patient is advised to take complete rest and follow the medication plan for at least a week and visit the hospital for final diagnosis."
              )}
            </p>
          </div>
        </div>

        {/* Drug Advice Popup */}
        {isDrugAdviceOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
              <div className="bg-blue-600 p-4 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <FaPills className="mr-2" />
                  Drug Advice
                </h2>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-line">
                  {capitalizeFirstLetter(latestRecord.medication) || "No drug advice available."}
                </p>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end border-t">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsDrugAdviceOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Case Sheet Popup */}
        {isPopupOpen && caseSheet && (
          <CaseSheetPopup caseSheet={caseSheet} onClose={() => setIsPopupOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default PatientDetails;










