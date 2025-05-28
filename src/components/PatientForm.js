// import React, { useState, useEffect } from "react";
// import Sidebar from '../components/Sidebar';

// const PatientForm = () => {
//   const [active, setActive] = useState("Outpatient Registration");
//   const [formData, setFormData] = useState({
//     title: "",
//     firstName: "",
//     middleName: "",
//     surname: "",
//     gender: "",
//     dob: { day: "", month: "", year: "" },
//     age: { years: "", months: "", days: "" },
//     bloodGroup: "",
//     contactNumber: "",
//     email: "",
//     alternateNumber: "",
//     patientType: "OP",
//     guardianDetails: "",
//     village: "",
//     mandal: "",
//     district: "",
//     state: "TELANGANA",
//     nationality: "Indian",
//     pinCode: "",
//     idProof: "",
//     idProofNo: "",
//     paymentType: "",
//     regAmount: "0",
//     discount: "0",
//     totalAmount: "0",
//     referralCategory: "Walkin",
//     remarks: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Handling nested dob and age
//     if (name.startsWith("dob.")) {
//       const dobField = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         dob: {
//           ...prev.dob,
//           [dobField]: value,
//         },
//       }));
//     } else if (name.startsWith("age.")) {
//       const ageField = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         age: {
//           ...prev.age,
//           [ageField]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const calculateAgeFromDOB = (day, month, year) => {
//     if (!day || !month || !year) return;
//     const birthDate = new Date(`${year}-${month}-${day}`);
//     if (isNaN(birthDate)) return;

//     const today = new Date();
//     let ageYears = today.getFullYear() - birthDate.getFullYear();
//     let ageMonths = today.getMonth() - birthDate.getMonth();
//     let ageDays = today.getDate() - birthDate.getDate();

//     if (ageDays < 0) {
//       ageMonths--;
//       ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
//     }
//     if (ageMonths < 0) {
//       ageYears--;
//       ageMonths += 12;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       age: {
//         years: ageYears.toString(),
//         months: ageMonths.toString(),
//         days: ageDays.toString(),
//       },
//     }));
//   };

//   useEffect(() => {
//     const { day, month, year } = formData.dob;
//     if (day && month && year) {
//       calculateAgeFromDOB(day, month, year);
//     }
//   }, [formData.dob]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form Submitted", formData);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar active={active} setActive={setActive} />

//       <div className="flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg">
//         <form onSubmit={handleSubmit}>
//           <div className="p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-lg font-semibold text-center mb-4 text-teal-700">Patient Details</h2>
//             <div className="grid grid-cols-4 gap-4">
//               {/* Title */}
//               <div className="flex flex-col">
//                 <label className="font-medium">Title*</label>
//                 <select name="title" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Select Title</option>
//                   <option>Mr.</option>
//                   <option>Mrs.</option>
//                   <option>Ms.</option>
//                   <option>Dr.</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">First Name*</label>
//                 <input type="text" name="firstName" className="border p-2 rounded" placeholder="Enter First Name" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Middle Name</label>
//                 <input type="text" name="middleName" className="border p-2 rounded" placeholder="Enter Middle Name" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Surname</label>
//                 <input type="text" name="surname" className="border p-2 rounded" placeholder="Enter Surname" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Gender*</label>
//                 <select name="gender" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div className="flex flex-col col-span-2">
//                 <label className="font-medium">Date of Birth (DD-MM-YYYY)</label>
//                 <div className="flex gap-2">
//                   <input type="text" name="dob.day" className="border p-2 w-1/3 rounded" placeholder="DD" onChange={handleChange} />
//                   <input type="text" name="dob.month" className="border p-2 w-1/3 rounded" placeholder="MM" onChange={handleChange} />
//                   <input type="text" name="dob.year" className="border p-2 w-1/3 rounded" placeholder="YYYY" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="flex flex-col col-span-2">
//                 <label className="font-medium">Age (Years - Months - Days)</label>
//                 <div className="flex gap-2">
//                   <input type="text" name="age.years" className="border p-2 w-1/3 rounded" placeholder="Years" value={formData.age.years} onChange={handleChange} />
//                   <input type="text" name="age.months" className="border p-2 w-1/3 rounded" placeholder="Months" value={formData.age.months} onChange={handleChange} />
//                   <input type="text" name="age.days" className="border p-2 w-1/3 rounded" placeholder="Days" value={formData.age.days} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Blood Group</label>
//                 <select name="bloodGroup" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Select Blood Group</option>
//                   <option>A+</option>
//                   <option>A-</option>
//                   <option>B+</option>
//                   <option>B-</option>
//                   <option>O+</option>
//                   <option>O-</option>
//                   <option>AB+</option>
//                   <option>AB-</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Contact Number*</label>
//                 <input type="text" name="contactNumber" className="border p-2 rounded" placeholder="Enter Mobile Number" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Email</label>
//                 <input type="email" name="email" className="border p-2 rounded" placeholder="Enter Email ID" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Alternate Number</label>
//                 <input type="text" name="alternateNumber" className="border p-2 rounded" placeholder="Enter Mobile Number" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">IP/OP</label>
//                 <input
//                   type="text"
//                   name="emergencyNumber"
//                   value={formData.patientType}
//                   readOnly
//                   className="border p-2 rounded bg-gray-200 text-blue-700 font-semibold cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             <h2 className="text-lg font-semibold text-center mt-6 mb-4 text-teal-700">Address Details</h2>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="flex flex-col">
//                 <label className="font-medium">Village*</label>
//                 <input type="text" name="village" className="border p-2 rounded" placeholder="Enter Village" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Mandal*</label>
//                 <input type="text" name="mandal" className="border p-2 rounded" placeholder="Enter Mandal" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">District*</label>
//                 <input type="text" name="district" className="border p-2 rounded" placeholder="Enter District" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">State</label>
//                 <input type="text" name="state" value={formData.state} className="border p-2 rounded" onChange={handleChange} />
//               </div>
//             </div>

//             <h2 className="text-lg font-semibold text-center mt-6 mb-4 text-teal-700">Other Details</h2>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="flex flex-col">
//                 <label className="font-medium">Payment Type*</label>
//                 <select name="paymentType" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Select Payment Mode</option>
//                   <option>Cash</option>
//                   <option>Card</option>
//                   <option>UPI</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Reg. Amount</label>
//                 <input type="text" name="regAmount" className="border p-2 rounded bg-gray-200" value={formData.regAmount} readOnly />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Discount (%)</label>
//                 <input type="text" name="discount" className="border p-2 rounded bg-gray-200" value={formData.discount} readOnly />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Total Amount</label>
//                 <input type="text" name="totalAmount" className="border p-2 rounded bg-gray-200" value={formData.totalAmount} readOnly />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Referral Category*</label>
//                 <select name="referralCategory" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Walkin</option>
//                   <option>Doctor Referral</option>
//                   <option>Online Booking</option>
//                 </select>
//               </div>

//               <div className="flex flex-col col-span-2">
//                 <label className="font-medium">Remarks</label>
//                 <input type="text" name="remarks" className="border p-2 rounded" placeholder="Enter Remarks" onChange={handleChange} />
//               </div>
//             </div>

//             <div className="flex justify-end mt-4">
//               <button type="submit" className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PatientForm;






// import React, { useState, useEffect } from "react";
// import Sidebar from '../components/Sidebar';
// import {createPatient} from '../services/patientService'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PatientForm = () => {

//   const [formData, setFormData] = useState({
//     title: "",
//     firstName: "",
//     middleName: "",
//     surname: "",
//     gender: "",
//     dob: { day: "", month: "", year: "" },
//     age: { years: "", months: "", days: "" },
//     bloodGroup: "",
//     contactNumber: "",
//     email: "",
//     alternateNumber: "",
//     patientType: "OP",
//     guardianDetails: "",
//     village: "",
//     mandal: "",
//     district: "",
//     state: "TELANGANA",
//     nationality: "Indian",
//     pinCode: "",
//     idProof: "",
//     idProofNo: "",
//     paymentType: "",
//     regAmount: "0",
//     discount: "0",
//     totalAmount: "0",
//     referralCategory: "Walkin",
//     remarks: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Handling nested dob and age
//     if (name.startsWith("dob.")) {
//       const dobField = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         dob: {
//           ...prev.dob,
//           [dobField]: value,
//         },
//       }));
//     } else if (name.startsWith("age.")) {
//       const ageField = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         age: {
//           ...prev.age,
//           [ageField]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const calculateAgeFromDOB = (day, month, year) => {
//     if (!day || !month || !year) return;
//     const birthDate = new Date(`${year}-${month}-${day}`);
//     if (isNaN(birthDate)) return;

//     const today = new Date();
//     let ageYears = today.getFullYear() - birthDate.getFullYear();
//     let ageMonths = today.getMonth() - birthDate.getMonth();
//     let ageDays = today.getDate() - birthDate.getDate();

//     if (ageDays < 0) {
//       ageMonths--;
//       ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
//     }
//     if (ageMonths < 0) {
//       ageYears--;
//       ageMonths += 12;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       age: {
//         years: ageYears.toString(),
//         months: ageMonths.toString(),
//         days: ageDays.toString(),
//       },
//     }));
//   };

//   useEffect(() => {
//     const { day, month, year } = formData.dob;
//     if (day && month && year) {
//       calculateAgeFromDOB(day, month, year);
//     }
//   }, [formData.dob]);


  

//   const handleSubmit = async(event) => {
//     event.preventDefault();
  
//     try {
//       const today = new Date();
//       const fullName = `${formData.title} ${formData.firstName} ${formData.middleName} ${formData.surname}`.trim();
//       const fullAge = `${formData.age.years} Years - ${formData.age.months} Months - ${formData.age.days} Days`;
//       const address = `${formData.village}, ${formData.mandal}, ${formData.district}, ${formData.state}, ${formData.nationality}`;
//       const dob = formData.dob.year && formData.dob.month && formData.dob.day
//         ? new Date(`${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`)
//         : null;
  
//       const patientData = {
//         PatientID: `PAT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
//         Name: fullName,
//         Age: fullAge,
//         Gender: formData.gender,
//         ContactNumber: formData.contactNumber || null,
//         Address: address || null,
//         DepartmentName: formData.departmentName || "General Medicine",
//         PatientRegistrationDate: today,
//         Ptype: formData.patientType || "OP",
//         DOB: dob,
//         BloodGroup: formData.bloodGroup || null,
//         Status: "True"
//       };
  
//       const result = await createPatient(patientData);
//       toast.success("Patient successfully registered!");
  
//       // Reset form to initial state
//       setFormData({
//         title: "",
//         firstName: "",
//         middleName: "",
//         surname: "",
//         gender: "",
//         dob: { day: "", month: "", year: "" },
//         age: { years: "", months: "", days: "" },
//         bloodGroup: "",
//         contactNumber: "",
//         email: "",
//         alternateNumber: "",
//         patientType: "OP",
//         guardianDetails: "",
//         village: "",
//         mandal: "",
//         district: "",
//         state: "TELANGANA",
//         nationality: "Indian",
//         pinCode: "",
//         idProof: "",
//         idProofNo: "",
//         paymentType: "",
//         regAmount: "0",
//         discount: "0",
//         totalAmount: "0",
//         referralCategory: "Walkin",
//         remarks: "",
//       });
  
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("Failed to register patient");
//     }
//   };
  

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar/>

//       <div className="flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg">
//         <form onSubmit={handleSubmit}>
//           <div className="p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-lg font-semibold text-center mb-4 text-teal-700">Patient Details</h2>
//             <div className="grid grid-cols-4 gap-4">
//               {/* Title */}
//               <div className="flex flex-col">
//                 <label className="font-medium">Title*</label>
//                 <select name="title" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Select Title</option>
//                   <option>Mr.</option>
//                   <option>Mrs.</option>
//                   <option>Ms.</option>
//                   <option>Dr.</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">First Name*</label>
//                 <input type="text" name="firstName" className="border p-2 rounded" placeholder="Enter First Name" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Middle Name</label>
//                 <input type="text" name="middleName" className="border p-2 rounded" placeholder="Enter Middle Name" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Surname</label>
//                 <input type="text" name="surname" className="border p-2 rounded" placeholder="Enter Surname" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Gender*</label>
//                 <select name="gender" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div className="flex flex-col col-span-2">
//                 <label className="font-medium">Date of Birth (DD-MM-YYYY)</label>
//                 <div className="flex gap-2">
//                   <input type="text" name="dob.day" className="border p-2 w-1/3 rounded" placeholder="DD" onChange={handleChange} />
//                   <input type="text" name="dob.month" className="border p-2 w-1/3 rounded" placeholder="MM" onChange={handleChange} />
//                   <input type="text" name="dob.year" className="border p-2 w-1/3 rounded" placeholder="YYYY" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="flex flex-col col-span-2">
//                 <label className="font-medium">Age (Years - Months - Days)</label>
//                 <div className="flex gap-2">
//                   <input type="text" name="age.years" className="border p-2 w-1/3 rounded" placeholder="Years" value={formData.age.years} onChange={handleChange} />
//                   <input type="text" name="age.months" className="border p-2 w-1/3 rounded" placeholder="Months" value={formData.age.months} onChange={handleChange} />
//                   <input type="text" name="age.days" className="border p-2 w-1/3 rounded" placeholder="Days" value={formData.age.days} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Blood Group</label>
//                 <select name="bloodGroup" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Select Blood Group</option>
//                   <option>A+</option>
//                   <option>A-</option>
//                   <option>B+</option>
//                   <option>B-</option>
//                   <option>O+</option>
//                   <option>O-</option>
//                   <option>AB+</option>
//                   <option>AB-</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Contact Number*</label>
//                 <input type="text" name="contactNumber" className="border p-2 rounded" placeholder="Enter Mobile Number" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Email</label>
//                 <input type="email" name="email" className="border p-2 rounded" placeholder="Enter Email ID" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Alternate Number</label>
//                 <input type="text" name="alternateNumber" className="border p-2 rounded" placeholder="Enter Mobile Number" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">IP/OP</label>
//                 <input
//                   type="text"
//                   name="emergencyNumber"
//                   value={formData.patientType}
//                   readOnly
//                   className="border p-2 rounded bg-gray-200 text-blue-700 font-semibold cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             <h2 className="text-lg font-semibold text-center mt-6 mb-4 text-teal-700">Address Details</h2>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="flex flex-col">
//                 <label className="font-medium">Village*</label>
//                 <input type="text" name="village" className="border p-2 rounded" placeholder="Enter Village" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Mandal*</label>
//                 <input type="text" name="mandal" className="border p-2 rounded" placeholder="Enter Mandal" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">District*</label>
//                 <input type="text" name="district" className="border p-2 rounded" placeholder="Enter District" onChange={handleChange} />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">State</label>
//                 <input type="text" name="state" value={formData.state} className="border p-2 rounded" onChange={handleChange} />
//               </div>
//             </div>

//             <h2 className="text-lg font-semibold text-center mt-6 mb-4 text-teal-700">Other Details</h2>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="flex flex-col">
//                 <label className="font-medium">Payment Type*</label>
//                 <select name="paymentType" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Select Payment Mode</option>
//                   <option>Cash</option>
//                   <option>Card</option>
//                   <option>UPI</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Reg. Amount</label>
//                 <input type="text" name="regAmount" className="border p-2 rounded bg-gray-200" value={formData.regAmount} readOnly />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Discount (%)</label>
//                 <input type="text" name="discount" className="border p-2 rounded bg-gray-200" value={formData.discount} readOnly />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Total Amount</label>
//                 <input type="text" name="totalAmount" className="border p-2 rounded bg-gray-200" value={formData.totalAmount} readOnly />
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium">Referral Category*</label>
//                 <select name="referralCategory" className="border p-2 rounded" onChange={handleChange}>
//                   <option>Walkin</option>
//                   <option>Doctor Referral</option>
//                   <option>Online Booking</option>
//                 </select>
//               </div>

//               <div className="flex flex-col col-span-2">
//                 <label className="font-medium">Remarks</label>
//                 <input type="text" name="remarks" className="border p-2 rounded" placeholder="Enter Remarks" onChange={handleChange} />
//               </div>
//             </div>

//             <div className="flex justify-end mt-4">
//               <button type="submit" className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PatientForm;


import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import { createPatient } from '../services/patientService';
import { ToastContainer, toast } from 'react-toastify';
import { getDepartments } from "../services/departmentService";
import 'react-toastify/dist/ReactToastify.css';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    surname: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    age: { years: "", months: "", days: "" },
    bloodGroup: "",
    contactNumber: "",
    email: "",
    alternateNumber: "",
    departmentId: "",
    patientType: "OP",
    guardianDetails: "",
    village: "",
    mandal: "",
    district: "",
    state: "TELANGANA",
    nationality: "Indian",
    pinCode: "",
    idProof: "",
    idProofNo: "",
    paymentType: "",
    regAmount: "0",
    discount: "0",
    totalAmount: "0",
    referralCategory: "Walkin",
    remarks: "",
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const depts = await getDepartments(); // make sure this returns array of { DepartmentID, DepartmentName }
        setDepartments(depts);
      } catch (error) {
        console.error("Error fetching departments:", error);
              toast.error("Failed to fetch departments");
      }
     
    };
  
    fetchDepartments();
  }, []);
  

  // Mandatory fields configuration
  const mandatoryFields = [
    'title', 'firstName', 'gender', 
    'contactNumber', 'village', 'mandal', 
    'district', 'paymentType', 'departmentId'
  ];

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  
    // Immediate validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    
    if (mandatoryFields.includes(name) && !value) {
      error = "This field is required";
    } else if (name === "contactNumber" && !/^\d{10}$/.test(value)) {
      error = "Invalid phone number (10 digits required)";
    } else if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email format";
    } else if (name === "alternateNumber" && value && !/^\d{10}$/.test(value)) {
      error = "Invalid phone number (10 digits required)";
    } else if (name === "firstName" && value && !/^[a-zA-Z ]+$/.test(value)) {
      error = "Only letters and spaces allowed";
    } else if (name === "pinCode" && value && !/^\d{6}$/.test(value)) {
      error = "Invalid PIN code (6 digits required)";
    }

    return error;
  };

  const validateDobField = (field, value) => {
    const numValue = parseInt(value);
    let error = "";

    if (!value) return "";

    if (field === "day" && (numValue < 1 || numValue > 31)) {
      error = "Invalid day (1-31)";
    } else if (field === "month" && (numValue < 1 || numValue > 12)) {
      error = "Invalid month (1-12)";
    } else if (field === "year") {
      const currentYear = new Date().getFullYear();
      if (numValue < 1900 || numValue > currentYear) {
        error = `Year must be between 1900 and ${currentYear}`;
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all mandatory fields
    mandatoryFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validate nested dob fields
    Object.keys(formData.dob).forEach(field => {
      const fullFieldName = `dob.${field}`;
      const error = validateDobField(field, formData.dob[field]);
      if (error) {
        newErrors[fullFieldName] = error;
        isValid = false;
      }
    });

    // Validate complete date
    if (formData.dob.day && formData.dob.month && formData.dob.year) {
      const dob = new Date(`${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`);
      if (isNaN(dob.getTime())) {
        newErrors.dob = "Invalid date";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handling nested dob and age
    if (name.startsWith("dob.")) {
      const dobField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        dob: {
          ...prev.dob,
          [dobField]: value,
        },
      }));

      // Validate immediately
      const error = validateDobField(dobField, value);
      setErrors(prev => ({
        ...prev,
        [`dob.${dobField}`]: error
      }));
    } else if (name.startsWith("age.")) {
      const ageField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        age: {
          ...prev.age,
          [ageField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      // Validate immediately
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const calculateAgeFromDOB = (day, month, year) => {
    if (!day || !month || !year) return;
    const birthDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(birthDate.getTime())) return;

    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setFormData(prev => ({
      ...prev,
      age: {
        years: ageYears.toString(),
        months: ageMonths.toString(),
        days: ageDays.toString(),
      },
    }));
  };

  useEffect(() => {
    const { day, month, year } = formData.dob;
    if (day && month && year) {
      calculateAgeFromDOB(day, month, year);
    }
  }, [formData.dob]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    
    // Mark all mandatory fields as touched
    const newTouched = { ...touched };
    mandatoryFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const today = new Date();
      const fullName = `${formData.title} ${formData.firstName} ${formData.middleName} ${formData.surname}`.trim();
      const fullAge = `${formData.age.years} Years - ${formData.age.months} Months - ${formData.age.days} Days`;
      const address = `${formData.village}, ${formData.mandal}, ${formData.district}, ${formData.state}, ${formData.nationality}`;
      const dob = formData.dob.year && formData.dob.month && formData.dob.day
        ? new Date(`${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`)
        : null;

      const patientData = {
        PatientID: `PAT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
        Name: fullName,
        Age: fullAge,
        Gender: formData.gender,
        ContactNumber: formData.contactNumber,
        Address: address,
        DepartmentID: formData.departmentId ? Number(formData.departmentId) : null,
        PatientRegistrationDate: today,
        Ptype: formData.patientType,
        DOB: dob,
        BloodGroup: formData.bloodGroup || null,
        Status: "True"
      };

      await createPatient(patientData);
      toast.success("Patient successfully registered!");

      // Reset form
      setFormData({
        title: "",
        firstName: "",
        middleName: "",
        surname: "",
        gender: "",
        dob: { day: "", month: "", year: "" },
        age: { years: "", months: "", days: "" },
        bloodGroup: "",
        departmentId: "",
        contactNumber: "",
        email: "",
        alternateNumber: "",
        patientType: "OP",
        guardianDetails: "",
        village: "",
        mandal: "",
        district: "",
        state: "TELANGANA",
        nationality: "Indian",
        pinCode: "",
        idProof: "",
        idProofNo: "",
        paymentType: "",
        regAmount: "0",
        discount: "0",
        totalAmount: "0",
        referralCategory: "Walkin",
        remarks: "",
      });
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to register patient");
    }
  };

  const shouldShowError = (name) => {
    return (submitAttempted || touched[name]) && errors[name];
  };

  const shouldShowDobError = (field) => {
    const fullName = `dob.${field}`;
    return (submitAttempted || touched[fullName]) && errors[fullName];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ToastContainer />

      <div className="flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} noValidate>
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold text-center mb-4 text-teal-700">Patient Details</h2>
            <div className="grid grid-cols-4 gap-4">
              {/* Title */}
              <div className="flex flex-col">
                <label className="font-medium">Title*</label>
                <select
                  name="title"
                  className={`border p-2 rounded ${shouldShowError('title') ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.title}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                {shouldShowError('title') && <span className="text-red-500 text-sm">{errors.title}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  className={`border p-2 rounded ${shouldShowError('firstName') ? 'border-red-500' : ''}`}
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.firstName}
                  required
                />
                {shouldShowError('firstName') && <span className="text-red-500 text-sm">{errors.firstName}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  className="border p-2 rounded"
                  placeholder="Enter Middle Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.middleName}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Surname</label>
                <input
                  type="text"
                  name="surname"
                  className="border p-2 rounded"
                  placeholder="Enter Surname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.surname}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Gender*</label>
                <select
                  name="gender"
                  className={`border p-2 rounded ${shouldShowError('gender') ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.gender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {shouldShowError('gender') && <span className="text-red-500 text-sm">{errors.gender}</span>}
              </div>

              <div className="flex flex-col col-span-2">
                <label className="font-medium">Date of Birth (DD-MM-YYYY)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="dob.day"
                    className={`border p-2 w-1/3 rounded ${shouldShowDobError('day') ? 'border-red-500' : ''}`}
                    placeholder="DD"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.dob.day}
                    maxLength={2}
                  />
                  <input
                    type="text"
                    name="dob.month"
                    className={`border p-2 w-1/3 rounded ${shouldShowDobError('month') ? 'border-red-500' : ''}`}
                    placeholder="MM"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.dob.month}
                    maxLength={2}
                  />
                  <input
                    type="text"
                    name="dob.year"
                    className={`border p-2 w-1/3 rounded ${shouldShowDobError('year') ? 'border-red-500' : ''}`}
                    placeholder="YYYY"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.dob.year}
                    maxLength={4}
                  />
                </div>
                {(shouldShowDobError('day') || shouldShowDobError('month') || shouldShowDobError('year')) && (
                  <span className="text-red-500 text-sm">
                    {errors['dob.day'] || errors['dob.month'] || errors['dob.year']}
                  </span>
                )}
                {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
              </div>

              <div className="flex flex-col col-span-2">
                <label className="font-medium">Age (Years - Months - Days)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="age.years"
                    className="border p-2 w-1/3 rounded bg-gray-100"
                    placeholder="Years"
                    value={formData.age.years}
                    readOnly
                  />
                  <input
                    type="text"
                    name="age.months"
                    className="border p-2 w-1/3 rounded bg-gray-100"
                    placeholder="Months"
                    value={formData.age.months}
                    readOnly
                  />
                  <input
                    type="text"
                    name="age.days"
                    className="border p-2 w-1/3 rounded bg-gray-100"
                    placeholder="Days"
                    value={formData.age.days}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Blood Group</label>
                <select
                  name="bloodGroup"
                  className="border p-2 rounded"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.bloodGroup}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Contact Number*</label>
                <input
                  type="text"
                  name="contactNumber"
                  className={`border p-2 rounded ${shouldShowError('contactNumber') ? 'border-red-500' : ''}`}
                  placeholder="Enter Mobile Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.contactNumber}
                  maxLength={10}
                  required
                />
                {shouldShowError('contactNumber') && <span className="text-red-500 text-sm">{errors.contactNumber}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`border p-2 rounded ${shouldShowError('email') ? 'border-red-500' : ''}`}
                  placeholder="Enter Email ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.email}
                />
                {shouldShowError('email') && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Alternate Number</label>
                <input
                  type="text"
                  name="alternateNumber"
                  className={`border p-2 rounded ${shouldShowError('alternateNumber') ? 'border-red-500' : ''}`}
                  placeholder="Enter Mobile Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.alternateNumber}
                  maxLength={10}
                />
                {shouldShowError('alternateNumber') && <span className="text-red-500 text-sm">{errors.alternateNumber}</span>}
              </div>

              <div className="flex flex-col">
  <label className="font-medium mb-2">Department*</label>
  <select
    name="departmentId"
    value={formData.departmentId}
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
  {shouldShowError("departmentId") && (
    <span className="text-red-500 text-sm mt-1">{errors.departmentId}</span>
  )}
</div>


              <div className="flex flex-col">
                <label className="font-medium">IP/OP</label>
                <input
                  type="text"
                  name="patientType"
                  value={formData.patientType}
                  readOnly
                  className="border p-2 rounded bg-gray-200 text-blue-700 font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-center mt-6 mb-4 text-teal-700">Address Details</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Village*</label>
                <input
                  type="text"
                  name="village"
                  className={`border p-2 rounded ${shouldShowError('village') ? 'border-red-500' : ''}`}
                  placeholder="Enter Village"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.village}
                  required
                />
                {shouldShowError('village') && <span className="text-red-500 text-sm">{errors.village}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Mandal*</label>
                <input
                  type="text"
                  name="mandal"
                  className={`border p-2 rounded ${shouldShowError('mandal') ? 'border-red-500' : ''}`}
                  placeholder="Enter Mandal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.mandal}
                  required
                />
                {shouldShowError('mandal') && <span className="text-red-500 text-sm">{errors.mandal}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">District*</label>
                <input
                  type="text"
                  name="district"
                  className={`border p-2 rounded ${shouldShowError('district') ? 'border-red-500' : ''}`}
                  placeholder="Enter District"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.district}
                  required
                />
                {shouldShowError('district') && <span className="text-red-500 text-sm">{errors.district}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  className="border p-2 rounded"
                  readOnly
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-center mt-6 mb-4 text-teal-700">Other Details</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Payment Type*</label>
                <select
                  name="paymentType"
                  className={`border p-2 rounded ${shouldShowError('paymentType') ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.paymentType}
                  required
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
                {shouldShowError('paymentType') && <span className="text-red-500 text-sm">{errors.paymentType}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Reg. Amount</label>
                <input
                  type="text"
                  name="regAmount"
                  className="border p-2 rounded bg-gray-200"
                  value={formData.regAmount}
                  readOnly
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Discount (%)</label>
                <input
                  type="text"
                  name="discount"
                  className="border p-2 rounded bg-gray-200"
                  value={formData.discount}
                  readOnly
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Total Amount</label>
                <input
                  type="text"
                  name="totalAmount"
                  className="border p-2 rounded bg-gray-200"
                  value={formData.totalAmount}
                  readOnly
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Referral Category</label>
                <select
                  name="referralCategory"
                  className="border p-2 rounded"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.referralCategory}
                >
                  <option value="Walkin">Walkin</option>
                  <option value="Doctor Referral">Doctor Referral</option>
                  <option value="Online Booking">Online Booking</option>
                </select>
              </div>

              <div className="flex flex-col col-span-2">
                <label className="font-medium">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  className="border p-2 rounded"
                  placeholder="Enter Remarks"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.remarks}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;





