


// import React, { useState, useEffect } from "react";
// import Sidebar from '../components/Sidebar';
// import { getPatients } from "../services/patientService";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Inpatientconversion = () => {
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     admissionDate: "",
//     wardNumber: "",
//     bedNumber: "",
//     admittingDoctor: "",
//     diagnosis: "",
//     treatmentPlan: "",
//     remarks: ""
//   });

//   // Fetch patients from API
//   const fetchPatients = async () => {
//     try {
//       const data = await getPatients();
//       // Filter for OP patients only
//       const opPatients = data.filter(patient => patient.Ptype === "OP");
//       setPatients(opPatients);
//     } catch (error) {
//       console.error(error.message);
//       toast.error("Failed to fetch patients");
//     }
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   // Search function
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setSearchResults([]);
//       return;
//     }

//     const results = patients.filter(patient =>
//       patient.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (patient.ContactNumber && patient.ContactNumber.includes(searchTerm)) ||
//       patient.PatientID.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(results);
//   }, [searchTerm, patients]);

//   // Handle patient selection
//   const handlePatientSelect = (patient) => {
//     setSelectedPatient(patient);
//     setShowForm(true);
//     setSearchResults([]);  // Close the search suggestions once a patient is selected
//     setFormData({
//       admissionDate: new Date().toISOString().split('T')[0], // Today's date
//       wardNumber: "",
//       bedNumber: "",
//       departmentName: patient.DepartmentName || "",  // Changed from admittingDoctor to departmentName
//       diagnosis: "",
//       treatmentPlan: "",
//       remarks: `Converted from OP to IP on ${new Date().toLocaleDateString()}`
//     });
//   };

//   // Handle form input changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleConvertToInpatient = async (e) => {
//     e.preventDefault();
//     try {
//       // Here you would typically call an API to update the patient record
//       // For now, we'll just show a success message
//       toast.success(`Patient ${selectedPatient.Name} converted to inpatient successfully!`);
      
//       // Reset form and search
//       setShowForm(false);
//       setSearchTerm("");
//       setSelectedPatient(null);
//       // Refresh patient list
//       await fetchPatients();
//     } catch (error) {
//       console.error("Conversion error:", error);
//       toast.error("Failed to convert patient to inpatient");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar/>
//       <ToastContainer />

//       <div className="flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg">
//         <h2 className="text-lg font-semibold text-center mb-4 text-teal-700">Inpatient Conversion</h2>
        
//         {/* Search Section */}
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by Patient Name, Contact Number or Patient ID"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//                 onClick={() => {
//                   setSearchTerm("");
//                   setSearchResults([]);
//                 }}
//               >
//                 ✕
//               </button>
//             )}
//           </div>

//           {/* Search Results */}
//           {searchResults.length > 0 && (
//             <div className="mt-2 border rounded-lg shadow-lg max-h-60 overflow-y-auto">
//               {searchResults.map(patient => (
//                 <div
//                   key={patient.PatientID}
//                   className="p-3 hover:bg-gray-100 cursor-pointer border-b"
//                   onClick={() => handlePatientSelect(patient)}
//                 >
//                   <div className="font-medium">{patient.Name}</div>
//                   <div className="text-sm text-gray-600">ID: {patient.PatientID}</div>
//                   <div className="text-sm text-gray-600">Contact: {patient.ContactNumber}</div>
//                   <div className="text-sm text-gray-600">Department: {patient.DepartmentName}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Conversion Form (shown when patient is selected) */}
//         {showForm && selectedPatient && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Convert Patient to Inpatient</h3>
            
//             {/* Patient Info Summary */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <h4 className="font-medium mb-2">Patient Information</h4>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p><span className="font-medium">Name:</span> {selectedPatient.Name}</p>
//                   <p><span className="font-medium">ID:</span> {selectedPatient.PatientID}</p>
//                   <p><span className="font-medium">Age:</span> {selectedPatient.Age}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Contact:</span> {selectedPatient.ContactNumber}</p>
//                   {/* <p><span className="font-medium">Department:</span> {selectedPatient.DepartmentName}</p> */}
//                   <p><span className="font-medium">Current Status:</span> Outpatient</p>
//                 </div>
//               </div>
//             </div>

//             {/* Conversion Form */}
//             <form onSubmit={handleConvertToInpatient}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div className="flex flex-col">
//                   <label className="font-medium mb-1">Admission Date*</label>
//                   <input
//                     type="date"
//                     name="admissionDate"
//                     value={formData.admissionDate}
//                     onChange={handleFormChange}
//                     className="border p-2 rounded"
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="font-medium mb-1">Ward Number*</label>
//                   <input
//                     type="text"
//                     name="wardNumber"
//                     value={formData.wardNumber}
//                     onChange={handleFormChange}
//                     className="border p-2 rounded"
//                     placeholder="Enter ward number"
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="font-medium mb-1">Bed Number*</label>
//                   <input
//                     type="text"
//                     name="bedNumber"
//                     value={formData.bedNumber}
//                     onChange={handleFormChange}
//                     className="border p-2 rounded"
//                     placeholder="Enter bed number"
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col">
//   <label className="font-medium mb-1">Department Name*</label>
//   <input
//     type="text"
//     name="departmentName"  // Changed field name
//     value={formData.departmentName}  // Adjusted value reference
//     onChange={handleFormChange}
//     className="border p-2 rounded"
//     placeholder="Enter department name"
//     required
//   />
// </div>

//                 <div className="flex flex-col md:col-span-2">
//                   <label className="font-medium mb-1">Diagnosis*</label>
//                   <input
//                     type="text"
//                     name="diagnosis"
//                     value={formData.diagnosis}
//                     onChange={handleFormChange}
//                     className="border p-2 rounded"
//                     placeholder="Enter diagnosis"
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col md:col-span-2">
//                   <label className="font-medium mb-1">Treatment Plan</label>
//                   <textarea
//                     name="treatmentPlan"
//                     value={formData.treatmentPlan}
//                     onChange={handleFormChange}
//                     className="border p-2 rounded"
//                     placeholder="Enter treatment plan"
//                     rows="3"
//                   />
//                 </div>

//                 <div className="flex flex-col md:col-span-2">
//                   <label className="font-medium mb-1">Remarks</label>
//                   <textarea
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleFormChange}
//                     className="border p-2 rounded"
//                     placeholder="Enter any remarks"
//                     rows="2"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForm(false);
//                     setSelectedPatient(null);
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Convert to Inpatient
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inpatientconversion;




import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import { getPatients } from "../services/patientService";
import { getDepartments, getDiagnosesForDepartment } from "../services/departmentService";
import { 
  getAllWards,
  getRoomsByWard,
  getBedsByRoom,occupyBed
} from "../services/wardService";
import { createAdmission} from "../services/admissionService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inpatientconversion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    admissionDate: "",
    wardId: "",
    roomId: "",
    bedId: "",
    departmentName: "",
    diagnosis: "",
    diagnosisId: "",
    treatmentPlan: "",
    remarks: ""
  });
  const [departments, setDepartments] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [wards, setWards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingDiagnoses, setLoadingDiagnoses] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingBeds, setLoadingBeds] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      // const opPatients = data.filter(patient => patient.Ptype === "OP");
      setPatients(data);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch patients");
    }
  };

  // Fetch departments from the database
  const fetchDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const departmentsData = await getDepartments();
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to fetch departments");
    } finally {
      setLoadingDepartments(false);
    }
  };

  // Fetch diagnoses for a selected department
  const fetchDiagnoses = async (departmentId) => {
    setLoadingDiagnoses(true);
    try {
      const diagnosesData = await getDiagnosesForDepartment(departmentId);
      setDiagnoses(diagnosesData);
    } catch (error) {
      console.error("Error fetching diagnoses:", error);
      toast.error("Failed to fetch diagnoses");
    } finally {
      setLoadingDiagnoses(false);
    }
  };

  // Fetch all wards
  const fetchWards = async () => {
    setLoadingWards(true);
    try {
      const wardsData = await getAllWards();
      setWards(wardsData);
    } catch (error) {
      console.error("Error fetching wards:", error);
      toast.error("Failed to fetch wards");
    } finally {
      setLoadingWards(false);
    }
  };

  // Fetch rooms for selected ward
  const fetchRoomsByWard = async (wardId) => {
    if (!wardId) return;
    
    setLoadingRooms(true);
    try {
      const roomsData = await getRoomsByWard(wardId);
      setRooms(roomsData);
      setFormData(prev => ({
        ...prev,
        roomId: "",
        bedId: ""
      }));
      setBeds([]);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms for selected ward");
    } finally {
      setLoadingRooms(false);
    }
  };
  const [allBeds, setAllBeds] = useState([]);
  // Fetch beds for selected room
  const fetchBedsByRoom = async (roomId) => {
    if (!roomId) return;
    
    setLoadingBeds(true);
    try {
      const bedsData = await getBedsByRoom(roomId);
      setAllBeds(bedsData);
      const vacantBeds = bedsData.filter(bed => bed.occupied_status === "Vacant");
      setBeds(vacantBeds);
      setFormData(prev => ({
        ...prev,
        bedId: ""
      }));
    } catch (error) {
      console.error("Error fetching beds:", error);
      toast.error("Failed to fetch beds for selected room");
    } finally {
      setLoadingBeds(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDepartments();
    fetchWards();
  }, []);

  // Handle patient selection
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
    setSearchResults([]);
    setFormData({
      admissionDate: new Date().toISOString().split('T')[0],
      wardId: "",
      roomId: "",
      bedId: "",
      departmentName: patient.DepartmentName || "",
      diagnosis: "",
      treatmentPlan: "",
      remarks: `Converted from OP to IP on ${new Date().toLocaleDateString()}`
    });
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for diagnosis select
    if (name === "diagnosis") {
      const selectedDiagnosis = diagnoses.find(d => d.DiagnosisName === value);
      setFormData(prev => ({
        ...prev,
        diagnosis: value,
        diagnosisId: selectedDiagnosis?.DiagnosisID || ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle department selection
  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setFormData(prev => ({
      ...prev,
      departmentName: departmentId,
      diagnosis: "",
      diagnosisId: "" // Reset diagnosisId when department changes
    }));
    fetchDiagnoses(departmentId);
  };

  // Handle ward selection
  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setFormData(prev => ({
      ...prev,
      wardId: wardId,
      roomId: "",
      bedId: ""
    }));
    fetchRoomsByWard(wardId);
  };

  const isFormValid = () => {
    return (
      selectedPatient?.PatientID &&
      formData.admissionDate &&
      formData.wardId &&
      formData.roomId &&
      formData.bedId &&
      formData.departmentName &&
      formData.diagnosisId // Check for diagnosisId instead of diagnosis
    );
  };

  // Handle room selection
  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    setFormData(prev => ({
      ...prev,
      roomId: roomId,
      bedId: ""
    }));
    fetchBedsByRoom(roomId);
  };

  // Handle form submission
  // const handleConvertToInpatient = async (e) => {
  //   e.preventDefault();
    
  //   // Validate required fields
  //   if (!selectedPatient?.PatientID) {
  //     toast.error("Please select a patient");
  //     return;
  //   }
    
  //   if (!formData.bedId) {
  //     toast.error("Please select a bed");
  //     return;
  //   }
    
  //   if (!formData.admissionDate) {
  //     toast.error("Please select an admission date");
  //     return;
  //   }

  //   if (!formData.departmentName) {
  //     toast.error("Please select a department");
  //     return;
  //   }

  //   if (!formData.diagnosisId) { // Check for diagnosisId instead of diagnosis
  //     toast.error("Please select a diagnosis");
  //     return;
  //   }

  //   setIsSubmitting(true);
    
  //   try {

  //     await occupyBed(parseInt(formData.bedId));
  //     // 1. Create the admission record
  //     const admissionData = {
  //       PatientID: selectedPatient.PatientID,
  //       bed_id: parseInt(formData.bedId),
  //       admission_date: formData.admissionDate,
  //       diagnosis_id: formData.diagnosisId, // Include diagnosis_id in the request
  //       treatment_plan: formData.treatmentPlan || undefined,
  //       remarks: formData.remarks || undefined
  //     };

  //     await createAdmission(admissionData);
      
  //     // 2. Update bed status to "Occupied"
  //     // await updateBedStatus(formData.bedId, "Occupied");
      
  //     toast.success(`Patient ${selectedPatient.Name} converted to inpatient successfully!`);
      
  //     // Reset form and search
  //     setShowForm(false);
  //     setSearchTerm("");
  //     setSelectedPatient(null);
      
  //     // Refresh data
  //     await fetchPatients();
  //     await fetchBedsByRoom(formData.roomId);
  //   } catch (error) {
  //     console.error("Conversion error:", error);
  //     toast.error(error.message || "Failed to convert patient to inpatient");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const [createdAdmission, setCreatedAdmission] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConvertToInpatient = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!selectedPatient?.PatientID) {
      toast.error("Please select a patient");
      return;
    }
    
    if (!formData.bedId) {
      toast.error("Please select a bed");
      return;
    }
    
    if (!formData.admissionDate) {
      toast.error("Please select an admission date");
      return;
    }

    if (!formData.departmentName) {
      toast.error("Please select a department");
      return;
    }

    if (!formData.diagnosisId) {
      toast.error("Please select a diagnosis");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await occupyBed(parseInt(formData.bedId));
      
      const admissionData = {
        PatientID: selectedPatient.PatientID,
        bed_id: parseInt(formData.bedId),
        admission_date: formData.admissionDate,
        diagnosis_id: formData.diagnosisId,
        treatment_plan: formData.treatmentPlan || undefined,
        remarks: formData.remarks || undefined
      };

      const admissionResult = await createAdmission(admissionData);
      setCreatedAdmission(admissionResult);
      setShowSuccess(true);
      
      toast.success(`Patient ${selectedPatient.Name} converted successfully!`);
      
      await fetchPatients();
      await fetchBedsByRoom(formData.roomId);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error(error.message || "Failed to convert patient to inpatient");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Display Component
  const AdmissionSuccess = ({ admission, patient, onClose }) => {
    const handleCopyAdmissionNumber = () => {
      navigator.clipboard.writeText(admission.admission_no.toString());
      toast.info('Admission number copied to clipboard!');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-teal-700 mb-4">Admission Successful</h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                <p className="text-sm font-medium text-teal-800 mb-1">Admission Number</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold text-teal-900">
                    {admission.admission_no}
                  </span>
                  <button
                    onClick={handleCopyAdmissionNumber}
                    className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-100"
                    title="Copy to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient Name</p>
                  <p className="font-medium">{patient.Name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient ID</p>
                  <p className="font-mono">{patient.PatientID}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Admission Date</p>
                  <p>{new Date(admission.admission_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Bed Number</p>
                  <p>Bed {beds.find(b => b.bed_id === admission.bed_id)?.bed_number}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Diagnosis</p>
                  <p>{diagnoses.find(d => d.DiagnosisID === admission.diagnosis_id)?.DiagnosisName}</p>
                </div>
              </div>

              {admission.treatment_plan && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Treatment Plan</p>
                  <p className="whitespace-pre-wrap">{admission.treatment_plan}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle search input change and filter patients
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      const filteredPatients = patients.filter(patient =>
        patient.Name.toLowerCase().includes(value.toLowerCase()) ||
        patient.ContactNumber.includes(value) ||
        patient.PatientID.includes(value)
      );
      setSearchResults(filteredPatients);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <ToastContainer position="top-center" autoClose={5000} />

      <div className="flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-teal-700">Inpatient Conversion</h2>
        
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Patient Name, Contact Number or Patient ID"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map(patient => (
                <div
                  key={patient.PatientID}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="font-medium">{patient.Name}</div>
                  <div className="text-sm text-gray-600">ID: {patient.PatientID}</div>
                  <div className="text-sm text-gray-600">Contact: {patient.ContactNumber}</div>
                  <div className="text-sm text-gray-600">Department: {patient.DepartmentName}</div>
                  <div className="text-sm text-gray-600">Address: {patient.Address}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conversion Form */}
        {showForm && selectedPatient && (
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-teal-700">Convert Patient to Inpatient</h3>
            
            {/* Patient Info Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium mb-3 text-lg">Patient Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium">Name:</span> {selectedPatient.Name}</p>
                  <p><span className="font-medium">ID:</span> {selectedPatient.PatientID}</p>
                  <p><span className="font-medium">Age:</span> {selectedPatient.Age}</p>
                </div>
                <div>
                  <p><span className="font-medium">Contact:</span> {selectedPatient.ContactNumber}</p>
                  <p><span className="font-medium">Current Status:</span> Outpatient</p>
                </div>
              </div>
            </div>

            {/* Conversion Form */}
            <form onSubmit={handleConvertToInpatient}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Admission Date */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Admission Date*</label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleFormChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Ward Selection */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Ward*</label>
                  <select
                    name="wardId"
                    value={formData.wardId}
                    onChange={handleWardChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Ward</option>
                    {wards.map(ward => (
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name} ({ward.ward_type})
                      </option>
                    ))}
                  </select>
                  {loadingWards && <span className="text-sm text-gray-500 mt-1">Loading wards...</span>}
                </div>

                {/* Room Selection */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Room*</label>
                  <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleRoomChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={!formData.wardId}
                    required
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room.room_id} value={room.room_id}>
                        {room.room_number} (Floor: {room.floor_number})
                      </option>
                    ))}
                  </select>
                  {loadingRooms && <span className="text-sm text-gray-500 mt-1">Loading rooms...</span>}
                </div>

                {/* Bed Selection */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Bed*</label>
                  <select
                    name="bedId"
                    value={formData.bedId}
                    onChange={handleFormChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={!formData.roomId}
                    required
                  >
                    <option value="">Select Bed</option>
                    {beds.map(bed => (
                      <option key={bed.bed_id} value={bed.bed_id}>
                        {bed.bed_number} (Status: {bed.occupied_status})
                      </option>
                    ))}
                  </select>
                  {loadingBeds && <span className="text-sm text-gray-500 mt-1">Loading beds...</span>}
                  {formData.roomId && beds.length === 0 && !loadingBeds && (
                    <span className="text-sm text-red-500 mt-1">No available beds in this room</span>
                  )}
                </div>

                {/* Department Selection */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Department*</label>
                  <select
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleDepartmentChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(department => (
                      <option key={department.DepartmentID} value={department.DepartmentID}>
                        {department.DepartmentName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Diagnosis Selection */}
     {/* Diagnosis Selection */}
<div className="flex flex-col">
  <label className="font-medium mb-2">Diagnosis*</label>
  <select
    name="diagnosis"
    value={formData.diagnosis}
    onChange={handleFormChange}
    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    disabled={!formData.departmentName}
    required
  >
    <option value="">Select Diagnosis</option>
    {diagnoses.map(diagnosis => (
      <option key={diagnosis.DiagnosisID} value={diagnosis.DiagnosisName}>
        {diagnosis.DiagnosisName}
      </option>
    ))}
  </select>
</div>

                {/* Treatment Plan */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Treatment Plan</label>
                  <textarea
                    name="treatmentPlan"
                    value={formData.treatmentPlan}
                    onChange={handleFormChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter treatment plan"
                    rows={3}
                  />
                </div>

                {/* Remarks */}
                <div className="flex flex-col">
                  <label className="font-medium mb-2">Remarks</label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleFormChange}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter any remarks"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedPatient(null);
                    setSearchTerm("");
                  }}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
      type="submit"
      className="bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50"
      disabled={!isFormValid() || isSubmitting} // Disable if form is invalid or submitting
    >
      {isSubmitting ? 'Processing...' : 'Convert to Inpatient'}
    </button>
              </div>
            </form>
          </div>
        )}
      </div>




 {/* Show success modal after admission */}
 {showSuccess && createdAdmission && selectedPatient && (
        <AdmissionSuccess
          admission={createdAdmission}
          patient={selectedPatient}
          onClose={() => {
            setShowSuccess(false);
            setShowForm(false);
            setSelectedPatient(null);
            setSearchTerm("");
          }}
        />
      )}






    </div>
  );
};

export default Inpatientconversion;