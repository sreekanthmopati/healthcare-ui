// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { getDashboardData, fetchDepartmentCounts } from "../services/dashboardService";
// import PatientForm from "../components/PatientForm"; // Import the PatientForm component
// import Sidebar from '../components/Sidebar';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [active, setActive] = useState("Dashboard");
//   const [data, setData] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });
//   const [counts, setCounts] = useState({ dental: 0, ent: 0, cardio: 0, derma: 0, neuro: 0, optha: 0, pulma: 0, gynac: 0, generalmed: 0, ortho: 0, dvl: 0 });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const result = await getDashboardData();
//         setData(result);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   useEffect(() => {
//     const getCounts = async () => {
//       try {
//         const data = await fetchDepartmentCounts(); // Fetch department counts
//         setCounts(data); // Update state
//       } catch (error) {
//         console.error("Error fetching department counts:", error);
//       }
//     };

//     getCounts();
//   }, []);

  

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar active={active} setActive={setActive} />


//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">{active}</h2>
//           <div className="flex items-center gap-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FaUser className="text-2xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Show PatientForm when 'New Patient Registration' is selected */}
//         {active === "New Patient Registration" ? (
//           <PatientForm />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Dashboard Cards */}
//             {[
//               { title: "UMR", value: data.totalDoctors, icon: <FaUser className="text-blue-500" />, onClick: () => alert("Coming soon!") },
//               { title: "OP Bills", value: 1441, icon: <FaClipboardList className="text-red-500" />, onClick: () => alert("Coming soon!")  },
//               {
//                 title: "IP Admissions",
//                 value: (
//                   <>
//                     {data.totalPatients}
//                     <br />
//                     <div className="max-h-20 overflow-y-auto custom-scrollbar">
//                       <span className="text-green-500 text-base underline cursor-pointer" onClick={() => navigate("/ip-admissions?departmentName=Dental")}>Dental: {counts.dental}</span>
//                       <br />
//                       <span className="text-green-500 text-base underline cursor-pointer" onClick={() => navigate("/ip-admissions?departmentName=DVL")}>DVL: {counts.dvl}</span>
//                       <br />
//                       <span className="text-green-500 text-base underline cursor-pointer" onClick={() => navigate("/ip-admissions?departmentName=Gynacology")}>Gynacology: {counts.gynac}</span>
//                       <br />
//                       <span className="text-green-500 text-base underline cursor-pointer" onClick={() => navigate("/ip-admissions?departmentName=ENT")}>ENT: {counts.ent}</span>
//                       <br />
//                       <span className="text-green-500 text-base underline cursor-pointer" onClick={() => navigate("/ip-admissions?departmentName=General Medicine")}>General Medicine: {counts.generalmed}</span>
//                       <br />
//                       <span className="text-green-500 text-base underline cursor-pointer" onClick={() => navigate("/ip-admissions?departmentName=Ortho")}>Ortho: {counts.ortho}</span>
//                     </div>
//                   </>
//                 ),
//                 icon: <FaCalendarCheck className="text-green-500" />,
//                 onClick: () => navigate("/ip-admissions"),
//               },
//               { title: "Discharges", value: 31, icon: <FaBed className="text-orange-500" />, onClick: () => alert("Coming soon!")  },
//               { title: "On Bed Count", value: data.totalAppointments, icon: <FaMoneyBill className="text-purple-500" />, onClick: () => alert("Coming soon!")  },
//             ].map((card, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-xl transition"
//                 onClick={card.onClick}
//               >
//                 <div className="text-4xl">{card.icon}</div>
//                 <div>
//                   <p className="text-gray-600">{card.title}</p>
//                   <h3 className="text-2xl font-bold">{card.value}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { getDashboardData, fetchDepartmentCounts } from "../services/dashboardService";
// import PatientForm from "../components/PatientForm";
// import Sidebar from '../components/Sidebar';
// import '../index.css'; // Ensure custom-scrollbar styles are imported

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [active, setActive] = useState("Dashboard");
//   const [data, setData] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });
//   const [counts, setCounts] = useState({ dental: 0, ent: 0, cardio: 0, derma: 0, neuro: 0, optha: 0, pulma: 0, gynac: 0, generalmed: 0, ortho: 0, dvl: 0 });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const result = await getDashboardData();
//         setData(result);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   useEffect(() => {
//     const getCounts = async () => {
//       try {
//         const data = await fetchDepartmentCounts();
//         setCounts(data);
//       } catch (error) {
//         console.error("Error fetching department counts:", error);
//       }
//     };
//     getCounts();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar active={active} setActive={setActive} />

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">{active}</h2>
//           <div className="flex items-center gap-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FaUser className="text-2xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Show PatientForm when 'New Patient Registration' is selected */}
//         {active === "New Patient Registration" ? (
//           <PatientForm />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-3">
//             {[ 
//               {
//                 title: "UMR",
//                 value: data.totalDoctors,
//                 icon: <FaUser className="text-blue-500" />,
//                 onClick: () => alert("Coming soon!"),
//               },
//               {
//                 title: "OP Bills",
//                 value: 1441,
//                 icon: <FaClipboardList className="text-red-500" />,
//                 onClick: () => alert("Coming soon!"),
//               },
//               {
//                 title: "IP Admissions",
//                 value: (
//                   <>
//                     {data.totalPatients}
//                     <br />
//                     <div className="max-h-40 overflow-y-auto custom-scrollbar mt-2 space-y-1"> {/* Increased max-height */}
//                       {[ 
//                         { name: "Dental", count: counts.dental },
//                         { name: "DVL", count: counts.dvl },
//                         { name: "Gynacology", count: counts.gynac },
//                         { name: "ENT", count: counts.ent },
//                         { name: "General Medicine", count: counts.generalmed },
//                         { name: "Ortho", count: counts.ortho },
//                         // Add more departments if needed
//                       ].map(({ name, count }) => (
//                         <div
//                           key={name}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate(`/ip-admissions?departmentName=${encodeURIComponent(name)}`);
//                           }}
//                           className="text-sm text-blue-700 bg-blue-50 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100 transition"
//                         >
//                           {name}: {count}
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ),
//                 icon: <FaCalendarCheck className="text-white" />,
//                 onClick: () => navigate("/ip-admissions"),
//                 customClass: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:shadow-2xl border border-blue-200 row-span-2",
//               }
//               ,
//               {
//                 title: "Discharges",
//                 value: 31,
//                 icon: <FaBed className="text-orange-500" />,
//                 onClick: () => alert("Coming soon!"),
//               },
//               {
//                 title: "On Bed Count",
//                 value: data.totalAppointments,
//                 icon: <FaMoneyBill className="text-purple-500" />,
//                 onClick: () => alert("Coming soon!"),
//               },
//             ].map((card, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-2xl transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer ${
//                   card.customClass
//                     ? card.customClass
//                     : "bg-white shadow-md border border-gray-200 hover:shadow-xl"
//                 }`}
//                 onClick={card.onClick}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="bg-white/20 p-4 rounded-full text-3xl">
//                     {card.icon}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm uppercase font-semibold tracking-wide">{card.title}</p>
//                     <div className="text-lg font-bold mt-1">{card.value}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

 
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaUser } from "react-icons/fa";
import { getDashboardData, fetchDepartmentCounts } from "../services/dashboardService";
import { getAllBeds } from "../services/wardService";
import PatientForm from "../components/PatientForm";
import Sidebar from '../components/Sidebar';
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Track the current path
  const [data, setData] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const [onBedCount, setOnBedCount] = useState(0);


  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchBedData = async () => {
      try {
        const beds = await getAllBeds();
        const occupiedBeds = beds.filter(bed => bed.occupied_status.toLowerCase() !== "vacant");
        setOnBedCount(occupiedBeds.length);
      } catch (error) {
        console.error("Error fetching bed data:", error);
      }
    };
  
    fetchBedData();
  }, []);
  

  // Fetch department counts
  // useEffect(() => {
  //   const getCounts = async () => {
  //     try {
  //       const counts = await fetchDepartmentCounts();

  //       const countsToDisplay = [
  //         { name: "General Medicine", count: counts.generalmed },
  //         { name: "Dental", count: counts.dental },
  //         { name: "ent", count: counts.ent },
  //         { name: "Gynecology", count: counts.gynac },
  //         { name: "Pulmonology", count: counts.pulma },
  //         { name: "Pediatrics", count: counts.pediatrics },
  //         { name: "Obstetrics", count: counts.obstetrics },
  //         { name: "Ortho", count: counts.ortho }
  //       ].filter(dept => dept.count > 0);

  //       setDepartmentCounts(countsToDisplay);
  //     } catch (error) {
  //       console.error("Error fetching department counts:", error);
  //     }
  //   };
  //   getCounts();
  // }, []);
  useEffect(() => {
    const getCounts = async () => {
      try {
        const counts = await fetchDepartmentCounts();
  
        const countsToDisplay = counts.map(dept => ({
          name: dept.departmentName,
          count: dept.admissionCount,
        }));
       
  
        setDepartmentCounts(countsToDisplay);
      } catch (error) {
        console.error("Error fetching department counts:", error);
      }
    };
    getCounts();
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaUser className="text-2xl cursor-pointer" />
          </div>
        </div>

        {location.pathname === "/PatientForm" ? (
          <PatientForm />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-3">
            {[ 
              {
                title: "UMR",
                value: data.totalDoctors,
                icon: <FaUser className="text-blue-800" />,
                onClick: () => alert("Coming soon!"),
                customClass: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-xl border border-blue-200",
              },
              {
                title: "OP Bills",
                value: 1441,
                icon: <FaClipboardList className="text-red-800" />,
                onClick: () => alert("Coming soon!"),
                customClass: "bg-gradient-to-r from-red-100 via-red-200 to-red-300 shadow-md hover:shadow-xl border border-red-200",
              },
              {
                title: "IP Admissions",
                value: (
                  <>
                    {/* {data.totalPatients} */}
                    {departmentCounts.reduce((sum, dept) => sum + dept.count, 0)}
                    <br />
                    <div className="max-h-40 overflow-y-auto custom-scrollbar mt-2 space-y-1">
                      {departmentCounts.map(({ name, count }) => (
                        <div
                          key={name}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/ip-admissions?departmentName=${encodeURIComponent(name)}`);
                          }}
                          className="text-sm text-blue-700 bg-blue-50 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100 transition"
                        >
                          {name}: {count}
                        </div>
                      ))}
                    </div>
                  </>
                ),
                icon: <FaCalendarCheck className="text-white" />,
                onClick: () => navigate("/ip-admissions"),
                customClass: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:shadow-2xl border border-blue-200 row-span-2",
              },
              {
                title: "Discharges",
                value: 31,
                icon: <FaBed className="text-orange-800" />,
                onClick: () => alert("Coming soon!"),
                customClass: "bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 shadow-md hover:shadow-xl border border-orange-200",
              },
              {
                title: "On Bed Count",
                value: onBedCount,
                icon: <FaMoneyBill className="text-purple-800" />,
                onClick: () => alert("Coming soon!"),
                customClass: "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 shadow-md hover:shadow-xl border border-purple-200",
              }
            ].map((card, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer ${card.customClass}`}
                onClick={card.onClick}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-4 rounded-full text-3xl">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase font-semibold tracking-wide">{card.title}</p>
                    <div className="text-lg font-bold mt-1">{card.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


















