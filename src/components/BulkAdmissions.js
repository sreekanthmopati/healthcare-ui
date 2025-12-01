
// import React, { useState, useEffect } from 'react';
// import { getDepartments, getDiagnosesForDepartment } from '../services/departmentService';
// import { getPatients } from '../services/patientService';
// import { getAllWards } from '../services/wardService';


  

 

// const BulkAdmission = () => {
//   const [departments, setDepartments] = useState([]);
//   const [diagnosesMap, setDiagnosesMap] = useState({});
//   const [departmentSelections, setDepartmentSelections] = useState([]);
//   const [registeredCounts, setRegisteredCounts] = useState({});
//   const [formData] = useState({
//     admissionDate: new Date().toISOString().split('T')[0],
//     remarks: 'Bulk admission'
//   });
//   const [showPreview, setShowPreview] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [wards, setWards] = useState([]);
//   const [loadingWards, setLoadingWards] = useState(false);

//   useEffect(() => {
//     const fetchWards = async () => {
//         setLoadingWards(true);
//         try {
//           const wardsData = await getAllWards();
//           setWards(wardsData);
//         } catch (error) {
//           console.error("Error fetching wards:", error);
//         } finally {
//           setLoadingWards(false);
//         }
//       };
//       fetchWards();
//     }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch all required data in parallel
//         const [depts, patients] = await Promise.all([
//           getDepartments(),
//           getPatients()
//         ]);

//         setDepartments(depts);

//         // Calculate registered patients count by department for today
//         const today = new Date().toISOString().split('T')[0];
//         const counts = {};
        
//         depts.forEach(dept => {
//           counts[dept.DepartmentID] = patients.filter(patient => 
//             patient.DepartmentID === dept.DepartmentID &&
//             new Date(patient.PatientRegistrationDate).toISOString().split('T')[0] === today
//           ).length;
//         });

//         setRegisteredCounts(counts);

//         // Initialize department selections and fetch diagnoses
//         const initialSelections = [];
//         const diagMap = {};

//         for (const dept of depts) {
//           initialSelections.push({
//             departmentId: dept.DepartmentID,
//             count: 0,
//             diagnosisId: '',
//             wardId: ''
//           });

//           const diagnoses = await getDiagnosesForDepartment(dept.DepartmentID);
//           diagMap[dept.DepartmentID] = diagnoses;
//         }

//         setDepartmentSelections(initialSelections);
//         setDiagnosesMap(diagMap);
//       } catch (error) {
//         console.error('Error initializing data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCountChange = (deptId, value) => {
//     if (value === '') {
//       setDepartmentSelections(prev =>
//         prev.map(item =>
//           item.departmentId === deptId ? { ...item, count: '' } : item
//         )
//       );
//       setErrors(prev => ({ ...prev, [deptId]: '' }));
//       return;
//     }

//     const intValue = parseInt(value);
//     const maxCount = registeredCounts[deptId] || 0;

//     setErrors(prev => ({
//       ...prev,
//       [deptId]: intValue > maxCount ? `Cannot admit more than ${maxCount}` : ''
//     }));

//     setDepartmentSelections(prev =>
//       prev.map(item =>
//         item.departmentId === deptId
//           ? { ...item, count: intValue < 0 ? 0 : intValue }
//           : item
//       )
//     );
//   };

//   const handleCountBlur = (deptId, value) => {
//     if (value === '') {
//       setDepartmentSelections(prev =>
//         prev.map(item =>
//           item.departmentId === deptId ? { ...item, count: 0 } : item
//         )
//       );
//       return;
//     }

//     const intValue = parseInt(value);
//     const maxCount = registeredCounts[deptId] || 0;

//     setDepartmentSelections(prev =>
//       prev.map(item =>
//         item.departmentId === deptId
//           ? { ...item, count: Math.min(intValue, maxCount) }
//           : item
//       )
//     );
//   };

//   const handleDiagnosisChange = (deptId, value) => {
//     setDepartmentSelections(prev =>
//       prev.map(item =>
//         item.departmentId === deptId
//           ? { ...item, diagnosisId: value }
//           : item
//       )
//     );
//   };

//   const handleWardChange = (deptId, value) => {
//     setDepartmentSelections(prev =>
//       prev.map(item =>
//         item.departmentId === deptId
//           ? { ...item, wardId: value }
//           : item
//       )
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const hasErrors = Object.values(errors).some(msg => msg);
//     if (hasErrors) {
//       alert('Please resolve all errors before submitting.');
//       return;
//     }

//     const admissionsToCreate = departmentSelections
//       .filter(item => item.count > 0)
//       .map(item => {
//         const dept = departments.find(d => d.DepartmentID === item.departmentId);
//         const diag = diagnosesMap[item.departmentId]?.find(d => d.DiagnosisID === parseInt(item.diagnosisId));
//         const ward = wards.find(w => w.id === parseInt(item.wardId));

//         return {
//           departmentId: item.departmentId,
//           departmentName: dept?.DepartmentName,
//           count: item.count,
//           diagnosisId: item.diagnosisId,
//           diagnosisName: diag?.DiagnosisName,
//           wardId: item.wardId,
//           wardName: ward?.name,
//           admissionDate: formData.admissionDate,
//           remarks: formData.remarks
//         };
//       });

//     setSubmittedData(admissionsToCreate);
//     setShowPreview(true);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-6 text-teal-800">🏥 Bulk Admissions</h1>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-teal-800">🏥 Bulk Admissions</h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
//         <div className="mb-6">
//           <label className="block mb-2 font-semibold">Admission Date</label>
//           <input
//             type="date"
//             value={formData.admissionDate}
//             readOnly
//             className="w-full p-2 border rounded bg-gray-100"
//           />
//         </div>

//         <div className="overflow-x-auto mb-6">
//           <table className="min-w-full border text-sm text-center">
//             <thead className="bg-teal-100 text-teal-800">
//               <tr>
//                 <th className="py-2 px-4 border">Department</th>
//                 <th className="py-2 px-4 border">Registered Today</th>
//                 <th className="py-2 px-4 border">Admit Count</th>
//                 <th className="py-2 px-4 border">Diagnosis</th>
//                 <th className="py-2 px-4 border">Ward</th>
//               </tr>
//             </thead>
//             <tbody>
//               {departments.map(dept => {
//                 const selection = departmentSelections.find(
//                   item => item.departmentId === dept.DepartmentID
//                 );
//                 const deptDiagnoses = diagnosesMap[dept.DepartmentID] || [];
//                 const registeredToday = registeredCounts[dept.DepartmentID] || 0;

//                 return (
//                   <tr key={dept.DepartmentID} className="border">
//                     <td className="py-2 px-4 border text-left font-medium">{dept.DepartmentName}</td>
//                     <td className="py-2 px-4 border text-teal-700 font-semibold">{registeredToday}</td>
//                     <td className="py-2 px-4 border">
//                       <input
//                         type="number"
//                         min="0"
//                         value={selection?.count}
//                         onChange={(e) => handleCountChange(dept.DepartmentID, e.target.value)}
//                         onBlur={(e) => handleCountBlur(dept.DepartmentID, e.target.value)}
//                         className={`w-20 p-1 border rounded text-center ${errors[dept.DepartmentID] ? 'border-red-500' : ''}`}
//                       />
//                       {errors[dept.DepartmentID] && (
//                         <div className="text-red-600 text-xs mt-1">{errors[dept.DepartmentID]}</div>
//                       )}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {selection?.count > 0 ? (
//                         <select
//                           value={selection?.diagnosisId}
//                           onChange={(e) => handleDiagnosisChange(dept.DepartmentID, e.target.value)}
//                           className="w-full p-1 border rounded"
//                           required
//                         >
//                           <option value="">Select</option>
//                           {deptDiagnoses.map(diag => (
//                             <option key={diag.DiagnosisID} value={diag.DiagnosisID}>
//                               {diag.DiagnosisName}
//                             </option>
//                           ))}
//                         </select>
//                       ) : <span className="text-gray-400">-</span>}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {selection?.count > 0 ? (
//                         <select
//                           value={selection?.wardId}
//                           onChange={(e) => handleWardChange(dept.DepartmentID, e.target.value)}
//                           className="w-full p-1 border rounded"
//                           required
//                         >
//                           <option value="">Select</option>
//                           {wards.map(ward => (
//                             <option key={ward.ward_id} value={ward.ward_id}>
//                               {ward.ward_name} ({ward.ward_type})
//                             </option>
//                           ))}
//                         </select>
//                       ) : <span className="text-gray-400">-</span>}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-teal-700">
//             Total Admissions: {departmentSelections.reduce((sum, item) => sum + (item.count || 0), 0)}
//           </span>
//           <button
//             type="submit"
//             className="bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800"
//           >
//             Admit All
//           </button>
//         </div>
//       </form>

//       {showPreview && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-teal-800 mb-4 border-b pb-2">Admission Summary</h2>
//             <div className="space-y-4">
//               {submittedData.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-teal-50 p-4 rounded-md border-l-4 border-teal-500 shadow-sm"
//                 >
//                   <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
//                     <p><span className="font-semibold text-gray-900">Department:</span> {item.departmentName}</p>
//                     <p><span className="font-semibold text-gray-900">Diagnosis:</span> {item.diagnosisName}</p>
//                     <p><span className="font-semibold text-gray-900">Ward:</span> {item.wardName}</p>
//                     <p><span className="font-semibold text-gray-900">Admission Date:</span> {item.admissionDate}</p>
//                     <p><span className="font-semibold text-gray-900">Count:</span> {item.count}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowPreview(false)}
//                 className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BulkAdmission;


// import React, { useState, useEffect } from 'react';
// import { getDepartments, getDiagnosesForDepartment } from '../services/departmentService';
// import { getTodaysPatientsByDepartment } from '../services/patientService';
// import { getAllWards } from '../services/wardService';
// import { createBulkAdmissions, getAvailableBedsCount } from '../services/admissionService';

// const BulkAdmission = () => {
//   const [departments, setDepartments] = useState([]);
//   const [diagnosesMap, setDiagnosesMap] = useState({});
//   const [departmentSelections, setDepartmentSelections] = useState([]);
//   const [registeredCounts, setRegisteredCounts] = useState({});
//   const [wards, setWards] = useState([]);
//   const [wardBedAvailability, setWardBedAvailability] = useState({});
//   const [formData] = useState({
//     admissionDate: new Date().toISOString().split('T')[0],
//     remarks: 'Bulk admission'
//   });
//   const [showPreview, setShowPreview] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch all required data in parallel
//         const [depts, wardsData, patientsCount] = await Promise.all([
//           getDepartments(),
//           getAllWards(),
//           getTodaysPatientsByDepartment()
//         ]);

//         setDepartments(depts);
//         setWards(wardsData);
//         setRegisteredCounts(patientsCount);

//         // Initialize department selections and fetch diagnoses
//         const initialSelections = [];
//         const diagMap = {};

//         for (const dept of depts) {
//           initialSelections.push({
//             departmentId: dept.DepartmentID,
//             count: 0,
//             diagnosisId: '',
//             wardId: ''
//           });

//           const diagnoses = await getDiagnosesForDepartment(dept.DepartmentID);
//           diagMap[dept.DepartmentID] = diagnoses;
//         }

//         setDepartmentSelections(initialSelections);
//         setDiagnosesMap(diagMap);
//       } catch (error) {
//         console.error('Error initializing data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCountChange = async (deptId, value) => {
//     if (value === '') {
//       setDepartmentSelections(prev =>
//         prev.map(item =>
//           item.departmentId === deptId ? { ...item, count: '' } : item
//         )
//       );
//       setErrors(prev => ({ ...prev, [deptId]: '' }));
//       return;
//     }

//     const intValue = parseInt(value);
//     const maxCount = registeredCounts[deptId] || 0;

//     // Get ward selection for this department
//     const selection = departmentSelections.find(item => item.departmentId === deptId);
//     if (selection?.wardId) {
//       const availableBeds = wardBedAvailability[selection.wardId] || 0;
//       if (intValue > availableBeds) {
//         setErrors(prev => ({
//           ...prev,
//           [deptId]: `Only ${availableBeds} beds available in selected ward`
//         }));
//       } else if (intValue > maxCount) {
//         setErrors(prev => ({
//           ...prev,
//           [deptId]: `Cannot admit more than ${maxCount} registered patients`
//         }));
//       } else {
//         setErrors(prev => ({ ...prev, [deptId]: '' }));
//       }
//     }

//     setDepartmentSelections(prev =>
//       prev.map(item =>
//         item.departmentId === deptId
//           ? { ...item, count: intValue < 0 ? 0 : intValue }
//           : item
//       )
//     );
//   };

//   const handleWardChange = async (deptId, value) => {
//     // Update ward selection
//     setDepartmentSelections(prev =>
//         prev.map(item =>
//           item.departmentId === deptId
//             ? { ...item, wardId: value }
//             : item
//         )
//       );

//     // Fetch available beds for the selected ward
//     if (value) {
//       try {
//         const count = await getAvailableBedsCount(value);
//         setWardBedAvailability(prev => ({
//           ...prev,
//           [value]: count
//         }));
//       } catch (error) {
//         console.error('Error fetching bed availability:', error);
//       }
//     }
//   };

//   const handleDiagnosisChange = (deptId, value) => {
//     setDepartmentSelections(prev =>
//       prev.map(item =>
//         item.departmentId === deptId
//           ? { ...item, diagnosisId: value }
//           : item
//       )
//     );
//   };





//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const hasErrors = Object.values(errors).some(msg => msg);
//     if (hasErrors) {
//       alert('Please resolve all errors before submitting.');
//       return;
//     }

//     const admissionsToCreate = departmentSelections
//       .filter(item => item.count > 0)
//       .map(item => {
//         const dept = departments.find(d => d.DepartmentID === item.departmentId);
//         const diag = diagnosesMap[item.departmentId]?.find(d => d.DiagnosisID === parseInt(item.diagnosisId));
//         const ward = wards.find(w => w.ward_id === parseInt(item.wardId));

//         return {
//           departmentId: item.departmentId,
//           departmentName: dept?.DepartmentName,
//           count: item.count,
//           diagnosisId: item.diagnosisId,
//           diagnosisName: diag?.DiagnosisName,
//           wardId: item.wardId,
//           wardName: ward?.ward_name,
//           admissionDate: formData.admissionDate,
//           remarks: formData.remarks
//         };
//       });

//     setSubmittedData(admissionsToCreate);
//     setShowPreview(true);
//   };

//   const confirmBulkAdmission = async () => {
//     try {
//       setIsSubmitting(true);
      
//       // Prepare data for API
//       const bulkData = {
//         admissionDate: formData.admissionDate,
//         remarks: formData.remarks,
//         admissions: submittedData.map(item => ({
//           departmentId: item.departmentId,
//           wardId: item.wardId,
//           diagnosisId: item.diagnosisId,
//           count: item.count
//         }))
//       };
//       console.log('Submitting bulk admissions:', bulkData);

//       const result = await createBulkAdmissions(bulkData);
      
//       alert(`Bulk admission successful: ${result.totalSuccess} patients admitted`);
//       setShowPreview(false);
//       // Refresh data or reset form as needed
//     } catch (error) {
//       console.error('Error during bulk admission:', error);
//       alert(`Error during bulk admission: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-6 text-teal-800">🏥 Bulk Admissions</h1>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-teal-800">🏥 Bulk Admissions</h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
//         <div className="mb-6">
//           <label className="block mb-2 font-semibold">Admission Date</label>
//           <input
//             type="date"
//             value={formData.admissionDate}
//             readOnly
//             className="w-full p-2 border rounded bg-gray-100"
//           />
//         </div>

//         <div className="overflow-x-auto mb-6">
//           <table className="min-w-full border text-sm text-center">
//             <thead className="bg-teal-100 text-teal-800">
//               <tr>
//                 <th className="py-2 px-4 border">Department</th>
//                 <th className="py-2 px-4 border">Registered Today</th>
//                 <th className="py-2 px-4 border">Admit Count</th>
//                 <th className="py-2 px-4 border">Diagnosis</th>
//                 <th className="py-2 px-4 border">Ward (Available Beds)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {departments.map(dept => {
//                 const selection = departmentSelections.find(
//                   item => item.departmentId === dept.DepartmentID
//                 );
//                 const deptDiagnoses = diagnosesMap[dept.DepartmentID] || [];
//                 const registeredToday = registeredCounts[dept.DepartmentID] || 0;
//                 const availableBeds = selection?.wardId ? wardBedAvailability[selection.wardId] || 0 : 0;

//                 return (
//                   <tr key={dept.DepartmentID} className="border">
//                     <td className="py-2 px-4 border text-left font-medium">{dept.DepartmentName}</td>
//                     <td className="py-2 px-4 border text-teal-700 font-semibold">{registeredToday}</td>
//                     <td className="py-2 px-4 border">
//                       <input
//                         type="number"
//                         min="0"
//                         value={selection?.count || 0}
//                         onChange={(e) => handleCountChange(dept.DepartmentID, e.target.value)}
//                         className={`w-20 p-1 border rounded text-center ${errors[dept.DepartmentID] ? 'border-red-500' : ''}`}
//                       />
//                       {errors[dept.DepartmentID] && (
//                         <div className="text-red-600 text-xs mt-1">{errors[dept.DepartmentID]}</div>
//                       )}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {selection?.count > 0 ? (
//                         <select
//                           value={selection?.diagnosisId || ''}
//                           onChange={(e) => handleDiagnosisChange(dept.DepartmentID, e.target.value)}
//                           className="w-full p-1 border rounded"
//                           required
//                         >
//                           <option value="">Select</option>
//                           {deptDiagnoses.map(diag => (
//                             <option key={diag.DiagnosisID} value={diag.DiagnosisID}>
//                               {diag.DiagnosisName}
//                             </option>
//                           ))}
//                         </select>
//                       ) : <span className="text-gray-400">-</span>}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {selection?.count > 0 ? (
//                         <select
//                           value={selection?.wardId || ''}
//                           onChange={(e) => handleWardChange(dept.DepartmentID, e.target.value)}
//                           className="w-full p-1 border rounded"
//                           required
//                         >
//                           <option value="">Select</option>
//                           {wards.map(ward => (
//                             <option key={ward.ward_id} value={ward.ward_id}>
//                               {ward.ward_name} ({ward.ward_type}) - {wardBedAvailability[ward.ward_id] || 0} available
//                             </option>
//                           ))}
//                         </select>
//                       ) : <span className="text-gray-400">-</span>}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-teal-700">
//             Total Admissions: {departmentSelections.reduce((sum, item) => sum + (item.count || 0), 0)}
//           </span>
//           <button
//             type="submit"
//             className="bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800"
//           >
//             Preview Admissions
//           </button>
//         </div>
//       </form>

//       {showPreview && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-teal-800 mb-4 border-b pb-2">Admission Summary</h2>
//             <div className="space-y-4">
//               {submittedData.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-teal-50 p-4 rounded-md border-l-4 border-teal-500 shadow-sm"
//                 >
//                   <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
//                     <p><span className="font-semibold text-gray-900">Department:</span> {item.departmentName}</p>
//                     <p><span className="font-semibold text-gray-900">Diagnosis:</span> {item.diagnosisName}</p>
//                     <p><span className="font-semibold text-gray-900">Ward:</span> {item.wardName}</p>
//                     <p><span className="font-semibold text-gray-900">Admission Date:</span> {item.admissionDate}</p>
//                     <p><span className="font-semibold text-gray-900">Count:</span> {item.count}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end mt-6 space-x-4">
//               <button
//                 onClick={() => setShowPreview(false)}
//                 className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmBulkAdmission}
//                 className="bg-teal-700 text-white px-5 py-2 rounded hover:bg-teal-800 transition"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Processing...' : 'Confirm Admissions'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BulkAdmission;



import React, { useState, useEffect } from 'react';
import { getDepartments, getDiagnosesForDepartment } from '../services/departmentService';
import { getTodaysPatientsByDepartment } from '../services/patientService';
import { getAllWards } from '../services/wardService';
import { createBulkAdmissions, getAvailableBedsCount } from '../services/admissionService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BulkAdmission = () => {
  // ... (keep all the state declarations and hooks the same as before)
  const [departments, setDepartments] = useState([]);
  const [diagnosesMap, setDiagnosesMap] = useState({});
  const [departmentSelections, setDepartmentSelections] = useState([]);
  const [registeredCounts, setRegisteredCounts] = useState({});
  const [wards, setWards] = useState([]);
  const [wardBedAvailability, setWardBedAvailability] = useState({});
  const [formData] = useState({
    admissionDate: new Date().toISOString().split('T')[0],
    remarks: 'Bulk admission'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dateRange, setDateRange] = useState({
    fromDate: '',
    toDate: ''
  });
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [depts, wardsData, patientsCount] = await Promise.all([
        getDepartments(),
        getAllWards(),
        getTodaysPatientsByDepartment(dateRange.fromDate, dateRange.toDate)
      ]);

      setDepartments(depts);
      setWards(wardsData);
      console.log("fetched")
      setRegisteredCounts(patientsCount);

      const initialSelections = [];
      const diagMap = {};

      for (const dept of depts) {
        initialSelections.push({
          departmentId: dept.DepartmentID,
          count: '',
          diagnosisId: '',
          wardId: ''
        });

        const diagnoses = await getDiagnosesForDepartment(dept.DepartmentID);
        diagMap[dept.DepartmentID] = diagnoses;
      }

      setDepartmentSelections(initialSelections);
      setDiagnosesMap(diagMap);
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, []);

  // Check form validity whenever department selections change
  useEffect(() => {
    const isValid = departmentSelections.some(selection => {
      if (selection.count > 0) {
        return selection.diagnosisId && selection.wardId;
      }
      return false;
    });
    setIsFormValid(isValid);
  }, [departmentSelections]);

  const handleCountChange = async (deptId, value) => {
    // Clear the field if backspace is pressed
    if (value === '') {
      setDepartmentSelections(prev =>
        prev.map(item =>
          item.departmentId === deptId ? { ...item, count: '', diagnosisId: '', wardId: '' } : item
        )
      );
      setErrors(prev => ({ ...prev, [deptId]: '' }));
      return;
    }

    const intValue = parseInt(value) || 0;
    const maxCount = registeredCounts[deptId] || 0;

    // Validate against registered count
    if (maxCount === 0) {
      setErrors(prev => ({
        ...prev,
        [deptId]: 'No registered patients for this department today'
      }));
    } else if (intValue > maxCount) {
      setErrors(prev => ({
        ...prev,
        [deptId]: `Cannot admit more than ${maxCount} registered patients`
      }));
    } else {
      // Clear error if validation passes
      setErrors(prev => ({ ...prev, [deptId]: '' }));
    }

    // Update the count
    setDepartmentSelections(prev =>
      prev.map(item =>
        item.departmentId === deptId
          ? { 
              ...item, 
              count: isNaN(intValue) ? '' : intValue,
              // Clear diagnosis and ward if count is 0
              ...(intValue <= 0 && { diagnosisId: '', wardId: '' })
            }
          : item
      )
    );
  };

  const handleWardChange = async (deptId, value) => {
    // Update ward selection
    const updatedSelections = prev =>
      prev.map(item =>
        item.departmentId === deptId
          ? { ...item, wardId: value }
          : item
      );
    
    setDepartmentSelections(updatedSelections);

    // Validate bed availability
    const selection = departmentSelections.find(item => item.departmentId === deptId);
    if (value && selection?.count > 0) {
      try {
        const count = await getAvailableBedsCount(value);
        setWardBedAvailability(prev => ({
          ...prev,
          [value]: count
        }));

        if (selection.count > count) {
          setErrors(prev => ({
            ...prev,
            [deptId]: `Only ${count} beds available in selected ward`
          }));
        } else {
          setErrors(prev => ({ ...prev, [deptId]: '' }));
        }
      } catch (error) {
        console.error('Error fetching bed availability:', error);
      }
    }
  };

  const handleDiagnosisChange = (deptId, value) => {
    setDepartmentSelections(prev =>
      prev.map(item =>
        item.departmentId === deptId
          ? { ...item, diagnosisId: value }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    const hasErrors = Object.values(errors).some(msg => msg) || !isFormValid;
    if (hasErrors) {
      alert('Please resolve all errors and fill required fields before submitting.');
      return;
    }

    const admissionsToCreate = departmentSelections
      .filter(item => item.count > 0)
      .map(item => {
        const dept = departments.find(d => d.DepartmentID === item.departmentId);
        const diag = diagnosesMap[item.departmentId]?.find(d => d.DiagnosisID === parseInt(item.diagnosisId));
        const ward = wards.find(w => w.ward_id === parseInt(item.wardId));

        return {
          departmentId: item.departmentId,
          departmentName: dept?.DepartmentName,
          count: item.count,
          diagnosisId: item.diagnosisId,
          diagnosisName: diag?.DiagnosisName,
          wardId: item.wardId,
          wardName: ward?.ward_name,
          admissionDate: formData.admissionDate,
          remarks: formData.remarks
        };
      });

    setSubmittedData(admissionsToCreate);
    setShowPreview(true);
  };


  const confirmBulkAdmission = async () => {
    try {
      setIsSubmitting(true);
      
      // Prepare data for API
      const bulkData = {
        admissionDate: formData.admissionDate,
        remarks: formData.remarks,
        admissions: submittedData.map(item => ({
          departmentId: item.departmentId,
          wardId: item.wardId,
          diagnosisId: item.diagnosisId,
          count: item.count
        }))
      };
      console.log('Submitting bulk admissions:', bulkData);

      const result = await createBulkAdmissions(bulkData);
      
      toast.success(`✅ Bulk admission successful: ${result.totalSuccess} patients admitted`);
      setShowPreview(false);
      // Refresh data or reset form as needed
      setSubmittedData([]);
      
      // Reset department selections to initial state
      const resetSelections = departmentSelections.map(item => ({
        ...item,
        count: '',
        diagnosisId: '',
        wardId: ''
      }));
      setDepartmentSelections(resetSelections);
      
      // Clear any errors
      setErrors({});
      
      // Optionally: Refresh data from server
      fetchData(); // You'll need to extract the fetch logic to a reusable function
    } catch (error) {
      console.error('Error during bulk admission:', error);
      toast.error(`❌ Error during bulk admission: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-teal-800">🏥 Convert IP'S</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4">
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
      <h1 className="text-3xl font-bold mb-6 text-teal-800">🏥 Convert IP'S</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Admission Date</label>
          <input
            type="date"
            value={formData.admissionDate}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="overflow-x-auto mb-6">

        <div className="mb-4 flex space-x-4">
  <div>
    <label className="block text-sm font-medium">From Date</label>
    <input
      type="date"
      className="border p-2 rounded"
      value={dateRange.fromDate}
      onChange={e => setDateRange(prev => ({ ...prev, fromDate: e.target.value }))}
    />
  </div>
  <div>
    <label className="block text-sm font-medium">To Date</label>
    <input
      type="date"
      className="border p-2 rounded"
      value={dateRange.toDate}
      onChange={e => setDateRange(prev => ({ ...prev, toDate: e.target.value }))}
    />
  </div>
  <button
    type="button"
    className="bg-blue-600 text-white px-4 py-2 rounded mt-auto"
    onClick={fetchData}
  >
    Filter
  </button>
</div>


          <table className="min-w-full border text-sm text-center">
            <thead className="bg-teal-100 text-teal-800">
              <tr>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Registered Today</th>
                <th className="py-2 px-4 border">Admit Count</th>
                <th className="py-2 px-4 border">Diagnosis</th>
                <th className="py-2 px-4 border">Ward (Available Beds)</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => {
                const selection = departmentSelections.find(
                  item => item.departmentId === dept.DepartmentID
                );
                const deptDiagnoses = diagnosesMap[dept.DepartmentID] || [];
                const registeredToday = registeredCounts[dept.DepartmentID] || 0;
                const availableBeds = selection?.wardId ? wardBedAvailability[selection.wardId] || 0 : 0;

                return (
                  <tr key={dept.DepartmentID} className="border">
                    <td className="py-2 px-4 border text-left font-medium">{dept.DepartmentName}</td>
                    <td className="py-2 px-4 border text-teal-700 font-semibold">{registeredToday}</td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        min="0"
                        value={selection?.count ?? ''}
                        onChange={(e) => handleCountChange(dept.DepartmentID, e.target.value)}
                        className={`w-20 p-1 border rounded text-center ${errors[dept.DepartmentID] ? 'border-red-500' : ''}`}
                        placeholder="0"
                      />
                      {errors[dept.DepartmentID] && (
                        <div className="text-red-600 text-xs mt-1">{errors[dept.DepartmentID]}</div>
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {selection?.count > 0 ? (
                        <select
                          value={selection?.diagnosisId || ''}
                          onChange={(e) => handleDiagnosisChange(dept.DepartmentID, e.target.value)}
                          className="w-full p-1 border rounded"
                          required
                        >
                          <option value="">Select</option>
                          {deptDiagnoses.map(diag => (
                            <option key={diag.DiagnosisID} value={diag.DiagnosisID}>
                              {diag.DiagnosisName}
                            </option>
                          ))}
                        </select>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="py-2 px-4 border">
                      {selection?.count > 0 ? (
                        <select
                          value={selection?.wardId || ''}
                          onChange={(e) => handleWardChange(dept.DepartmentID, e.target.value)}
                          className="w-full p-1 border rounded"
                          required
                        >
                          <option value="">Select</option>
                          {wards.map(ward => (
                            // <option key={ward.ward_id} value={ward.ward_id}>
                            //   {ward.ward_name} ({ward.ward_type}) - {wardBedAvailability[ward.ward_id] || 0} available
                            // </option>
                            <option key={ward.ward_id} value={ward.ward_id}>
                            {ward.ward_name} ({ward.ward_type}) 
                          </option>
                          ))}
                        </select>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-teal-700">
            Total Admissions: {departmentSelections.reduce((sum, item) => sum + (item.count || 0), 0)}
          </span>
          <button
            type="submit"
            className={`bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid}
          >
            Preview Admissions
          </button>
        </div>
      </form>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-teal-800 mb-4 border-b pb-2">Admission Summary</h2>
            <div className="space-y-4">
              {submittedData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-teal-50 p-4 rounded-md border-l-4 border-teal-500 shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <p><span className="font-semibold text-gray-900">Department:</span> {item.departmentName}</p>
                    <p><span className="font-semibold text-gray-900">Diagnosis:</span> {item.diagnosisName}</p>
                    <p><span className="font-semibold text-gray-900">Ward:</span> {item.wardName}</p>
                    <p><span className="font-semibold text-gray-900">Admission Date:</span> {item.admissionDate}</p>
                    <p><span className="font-semibold text-gray-900">Count:</span> {item.count}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkAdmission}
                className="bg-teal-700 text-white px-5 py-2 rounded hover:bg-teal-800 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Admissions'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>



  );
};

export default BulkAdmission;


















