// import { useState, useEffect } from 'react';
// import { getPatients } from '../services/patientService';
// import { getAllDiagnoses } from '../services/departmentService';
// import { getAllAdmissionsWithDetails } from '../services/admissionService';

// const ICDCodeManager = () => {
//   const [patients, setPatients] = useState([]);
//   const [diagnoses, setDiagnoses] = useState([]);
//   const [admissions, setAdmissions] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [selectedAdmission, setSelectedAdmission] = useState(null);
//   const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
//   const [icdCode, setIcdCode] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [patientsData, diagnosesData, admissionsData] = await Promise.all([
//           getPatients(),
//           getAllDiagnoses(),
//           getAllAdmissionsWithDetails()
//         ]);
//         setPatients(patientsData);
//         setDiagnoses(diagnosesData);
//         setAdmissions(admissionsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredPatients = patients.filter(patient =>
//     patient.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     patient.PatientID.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handlePatientSelect = (patient) => {
//     setSelectedPatient(patient);
//     setSearchTerm(''); 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       // Here you would call your API to update the admission with the ICD code
//       // await updateAdmissionWithICD(selectedAdmission.admission_id, icdCode);
//       setSuccessMessage('ICD code successfully assigned!');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (error) {
//       console.error("Error assigning ICD code:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 p-6 text-white">
//             <h1 className="text-2xl font-bold">ICD Code Management</h1>
//             <p className="opacity-90">Assign medical codes to patient diagnoses</p>
//           </div>

//           {/* Main Content */}
//           <div className="p-6">
//             {/* Search and Select Patient */}
//             <div className="mb-8">
//               <h2 className="text-lg font-semibold text-gray-700 mb-4">1. Select Patient</h2>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search patients by name or ID..."
//                   className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <svg
//                   className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>

//               {searchTerm && (
//                 <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
//                   {filteredPatients.length > 0 ? (
//                     filteredPatients.map(patient => (
//                       <div
//                         key={patient.PatientID}
//                         className={`p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${selectedPatient?.PatientID === patient.PatientID ? 'bg-indigo-100' : ''}`}
//                         onClick={() => {handlePatientSelect(patient)}}
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">{patient.Name}</span>
//                           <span className="text-sm text-gray-500">ID: {patient.PatientID}</span>
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           {patient.Gender}, {patient.Age} years • {patient.Department?.DepartmentName || 'No department'}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-3 text-gray-500">No patients found</div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Selected Patient Info */}
//             {selectedPatient && (
//               <div className="mb-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
//                 <h3 className="font-semibold text-blue-800 mb-2">Selected Patient</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-600">Name</p>
//                     <p className="font-medium">{selectedPatient.Name}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Patient ID</p>
//                     <p className="font-medium">{selectedPatient.PatientID}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Department</p>
//                     <p className="font-medium">{selectedPatient.Department?.DepartmentName || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Select Admission */}
//             {selectedPatient && (
//               <div className="mb-8">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">2. Select Admission</h2>
//                 <div className="space-y-3">
//                   {admissions
//                     .filter(adm => adm.PatientID === selectedPatient.PatientID)
//                     .map(admission => (
//                       <div
//                         key={admission.admission_id}
//                         className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAdmission?.admission_id === admission.admission_id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
//                         onClick={() => setSelectedAdmission(admission)}
//                       >
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="font-medium">
//                               Admission #{admission.admission_no} • {admission.diagnosis.DiagnosisName}
//                             </h3>
//                             <p className="text-sm text-gray-600 mt-1">
//                               {new Date(admission.admission_date).toLocaleDateString()} - {admission.discharge_date ? new Date(admission.discharge_date).toLocaleDateString() : 'Ongoing'}
//                             </p>
//                           </div>
//                           <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
//                             {admission.bed.room.ward.ward_name} (Bed {admission.bed.bed_number})
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Diagnosis and ICD Code */}
//             {selectedAdmission && (
//               <div className="mb-8">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">3. Assign ICD Code</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
//                     <select
//                       className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       value={selectedDiagnosis?.DiagnosisID || ''}
//                       onChange={(e) => {
//                         const selected = diagnoses.find(d => d.DiagnosisID.toString() === e.target.value);
//                         setSelectedDiagnosis(selected);
//                       }}
//                     >
//                       <option value="">Select a diagnosis</option>
//                       {diagnoses.map(diagnosis => (
//                         <option key={diagnosis.DiagnosisID} value={diagnosis.DiagnosisID}>
//                           {diagnosis.DiagnosisName} ({diagnosis.Departments?.DepartmentName})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">ICD Code</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Enter ICD-10 code (e.g., E11.65)"
//                         className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         value={icdCode}
//                         onChange={(e) => setIcdCode(e.target.value)}
//                       />
//                       <div className="absolute right-3 top-3.5 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
//                         ICD-10
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             {selectedAdmission && (
//               <div className="flex justify-end">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isLoading || !icdCode || !selectedDiagnosis}
//                   className={`px-6 py-3 rounded-lg font-medium text-white ${isLoading || !icdCode || !selectedDiagnosis ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors flex items-center`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     'Assign ICD Code'
//                   )}
//                 </button>
//               </div>
//             )}

//             {/* Success Message */}
//             {successMessage && (
//               <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//                 {successMessage}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ICD Code Reference */}
//         <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-indigo-600 p-4 text-white">
//             <h2 className="text-lg font-bold">ICD-10 Code Reference</h2>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                 <h3 className="font-semibold text-blue-800 mb-2">Common Codes</h3>
//                 <ul className="space-y-2">
//                   <li className="flex justify-between">
//                     <span>E11.65</span>
//                     <span className="text-gray-600">Type 2 diabetes</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span>I10</span>
//                     <span className="text-gray-600">Hypertension</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span>J18.9</span>
//                     <span className="text-gray-600">Pneumonia</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
//                 <h3 className="font-semibold text-purple-800 mb-2">Cardiology</h3>
//                 <ul className="space-y-2">
//                   <li className="flex justify-between">
//                     <span>I25.10</span>
//                     <span className="text-gray-600">Atherosclerotic heart disease</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span>I48.91</span>
//                     <span className="text-gray-600">Atrial fibrillation</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                 <h3 className="font-semibold text-green-800 mb-2">Orthopedics</h3>
//                 <ul className="space-y-2">
//                   <li className="flex justify-between">
//                     <span>M54.5</span>
//                     <span className="text-gray-600">Low back pain</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span>S72.001A</span>
//                     <span className="text-gray-600">Fracture of femur</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ICDCodeManager;



















import { useState, useEffect } from 'react';
import { getPatients } from '../services/patientService';
import { getAllDiagnoses } from '../services/departmentService';
import { getAllAdmissionsWithDetails } from '../services/admissionService';

const ICDCodeManager = () => {
  const [patients, setPatients] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [icdCode, setIcdCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [patientsData, diagnosesData, admissionsData] = await Promise.all([
          getPatients(),
          getAllDiagnoses(),
          getAllAdmissionsWithDetails()
        ]);
        setPatients(patientsData);
        setDiagnoses(diagnosesData);
        setAdmissions(admissionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.PatientID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(''); 
  };

  const groupAdmissions = (admissions) => {
    return admissions.reduce((acc, admission) => {
      const status = admission.discharge_date ? 'discharged' : 'active';
      return {
        ...acc,
        [status]: [...(acc[status] || []), admission]
      };
    }, {});
  };

  const patientAdmissions = selectedPatient 
    ? groupAdmissions(
        admissions.filter(adm => adm.PatientID === selectedPatient.PatientID)
      )
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Here you would call your API to update the admission with the ICD code
      // await updateAdmissionWithICD(selectedAdmission.admission_id, icdCode);
      setSuccessMessage('ICD code successfully assigned!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error assigning ICD code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-6 text-white">
            <h1 className="text-2xl font-bold">ICD Code Management</h1>
            <p className="opacity-90">Assign medical codes to patient diagnoses</p>
          </div>

          {/* Main Content */}
          <div className="p-3">
            {/* Search and Select Patient */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">1. Select Patient</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients by name or ID..."
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {searchTerm && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(patient => (
                      <div
                        key={patient.PatientID}
                        className={`p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${selectedPatient?.PatientID === patient.PatientID ? 'bg-indigo-100' : ''}`}
                        onClick={() => {handlePatientSelect(patient)}}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{patient.Name}</span>
                          <span className="text-sm text-gray-500">ID: {patient.PatientID}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {patient.Gender}, {patient.Age} years • {patient.Department?.DepartmentName || 'No department'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500">No patients found</div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Patient Info */}
            {selectedPatient && (
              <div className="mb-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Selected Patient</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedPatient.Name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Patient ID</p>
                    <p className="font-medium">{selectedPatient.PatientID}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{selectedPatient.Department?.DepartmentName || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Select Admission */}
            {selectedPatient && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">2. Select Admission</h2>
                
                {patientAdmissions?.active?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Ongoing Admission ({patientAdmissions.active.length})
                    </h3>
                    <div className="space-y-3">
                      {patientAdmissions.active.map(admission => (
                        <AdmissionCard 
                          key={admission.admission_id}
                          admission={admission}
                          isSelected={selectedAdmission?.admission_id === admission.admission_id}
                          onSelect={setSelectedAdmission}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {patientAdmissions?.discharged?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                      Past Admissions ({patientAdmissions.discharged.length})
                    </h3>
                    <div className="space-y-3">
                      {patientAdmissions.discharged.map(admission => (
                        <AdmissionCard 
                          key={admission.admission_id}
                          admission={admission}
                          isSelected={selectedAdmission?.admission_id === admission.admission_id}
                          onSelect={setSelectedAdmission}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {!patientAdmissions?.active?.length && !patientAdmissions?.discharged?.length && (
                  <div className="text-center py-6 text-gray-500">
                    No admissions found for this patient
                  </div>
                )}
              </div>
            )}

            {/* Diagnosis and ICD Code */}
            {selectedAdmission && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">3. Assign ICD Code</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedDiagnosis?.DiagnosisID || ''}
                      onChange={(e) => {
                        const selected = diagnoses.find(d => d.DiagnosisID.toString() === e.target.value);
                        setSelectedDiagnosis(selected);
                      }}
                    >
                      <option value="">Select a diagnosis</option>
                      {diagnoses.map(diagnosis => (
                        <option key={diagnosis.DiagnosisID} value={diagnosis.DiagnosisID}>
                          {diagnosis.DiagnosisName} ({diagnosis.Departments?.DepartmentName})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ICD Code</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter ICD-10 code (e.g., E11.65)"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={icdCode}
                        onChange={(e) => setIcdCode(e.target.value)}
                      />
                      <div className="absolute right-3 top-3.5 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                        ICD-10
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {selectedAdmission && (
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !icdCode || !selectedDiagnosis}
                  className={`px-6 py-3 rounded-lg font-medium text-white ${isLoading || !icdCode || !selectedDiagnosis ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors flex items-center`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Assign ICD Code'
                  )}
                </button>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}
          </div>
        </div>

        {/* ICD Code Reference */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 p-4 text-white">
            <h2 className="text-lg font-bold">ICD-10 Code Reference</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Common Codes</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>E11.65</span>
                    <span className="text-gray-600">Type 2 diabetes</span>
                  </li>
                  <li className="flex justify-between">
                    <span>I10</span>
                    <span className="text-gray-600">Hypertension</span>
                  </li>
                  <li className="flex justify-between">
                    <span>J18.9</span>
                    <span className="text-gray-600">Pneumonia</span>
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-2">Cardiology</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>I25.10</span>
                    <span className="text-gray-600">Atherosclerotic heart disease</span>
                  </li>
                  <li className="flex justify-between">
                    <span>I48.91</span>
                    <span className="text-gray-600">Atrial fibrillation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Orthopedics</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>M54.5</span>
                    <span className="text-gray-600">Low back pain</span>
                  </li>
                  <li className="flex justify-between">
                    <span>S72.001A</span>
                    <span className="text-gray-600">Fracture of femur</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICDCodeManager;













const AdmissionCard = ({ admission, isSelected, onSelect }) => {
    return (
      <div
        className={`p-4 rounded-lg border cursor-pointer transition-all ${
          isSelected 
            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
            : 'border-gray-200 hover:border-indigo-300'
        }`}
        onClick={() => onSelect(admission)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">
              Admission #{admission.admission_no} • {admission.diagnosis.DiagnosisName}
            </h3>
            <div className="text-sm text-gray-600 mt-1 space-y-1">
              <p>
                <span className="font-medium">Period:</span> {new Date(admission.admission_date).toLocaleDateString()} - 
                {admission.discharge_date 
                  ? ` ${new Date(admission.discharge_date).toLocaleDateString()}`
                  : ' Ongoing'}
              </p>
              <p>
                <span className="font-medium">Treatment:</span> {admission.treatment_plan || 'Not specified'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2">
              {admission.bed.room.ward.ward_name} (Bed {admission.bed.bed_number})
            </span>
            {admission.discharge_date && (
              <span className="text-xs text-gray-500">
                Discharged
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  