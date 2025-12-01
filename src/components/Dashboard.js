
 
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaUser } from "react-icons/fa";
// import { getDashboardData, fetchDepartmentCounts } from "../services/dashboardService";
// import { getAllBeds } from "../services/wardService";
// import { getAllAdmissions } from "../services/admissionService";
// import { getPatients } from "../services/patientService";
// import PatientForm from "../components/PatientForm";
// import Sidebar from '../components/Sidebar';
// import '../index.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [data, setData] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });
//   const [departmentCounts, setDepartmentCounts] = useState([]);
//   const [onBedCount, setOnBedCount] = useState(0);
//   const [dischargesCount, setDischargesCount] = useState(0);
//   const [umrCount, setUmrCount] = useState(0);
//   const [opCount, setOpCount] = useState(0);
//   const [ipCount, setIpCount] = useState(0);

//   // Fetch dashboard data
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
//     const fetchBedData = async () => {
//       try {
//         const beds = await getAllBeds();
//         const occupiedBeds = beds.filter(bed => bed.occupied_status.toLowerCase() !== "vacant");
//         setOnBedCount(occupiedBeds.length);
//       } catch (error) {
//         console.error("Error fetching bed data:", error);
//       }
//     };
//     fetchBedData();
//   }, []);

//   useEffect(() => {
//     const fetchDischargeCount = async () => {
//       try {
//         const admissions = await getAllAdmissions();
//         const discharged = admissions.filter(
//           admission =>
//             admission.is_discharged === true &&
//             admission.discharge_date !== null &&
//             admission.dischargeReasonId !== null
//         );
//         setDischargesCount(discharged.length);
//       } catch (error) {
//         console.error("Error fetching admission data:", error);
//       }
//     };
//     fetchDischargeCount();
//   }, []);

//   useEffect(() => {
//     const getCounts = async () => {
//       try {
//         const counts = await fetchDepartmentCounts();
//         const countsToDisplay = counts.map(dept => ({
//           name: dept.departmentName,
//           count: dept.admissionCount,
//         }));
//         setDepartmentCounts(countsToDisplay);
        
//         // Calculate total IP count (sum of all department admissions)
//         const totalIpCount = countsToDisplay.reduce((sum, dept) => sum + dept.count, 0);
//         setIpCount(totalIpCount);
//       } catch (error) {
//         console.error("Error fetching department counts:", error);
//       }
//     };
//     getCounts();
//   }, []);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const patients = await getPatients();
//         // setUmrCount(patients.length);
        
//         // Calculate OP count (patients with Ptype === 'OP')
//         const opPatients = patients.filter(patient => patient.Ptype === 'OP');
//         setOpCount(opPatients.length);
//         setUmrCount(ipCount + opCount);
//       } catch (error) {
//         console.error("Error fetching patients:", error);
//       }
//     };
//     fetchPatients();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1 p-8 overflow-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">
//             {location.pathname.split('/').pop() || 'Dashboard'}
//           </h2>
//           <div className="flex items-center gap-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FaUser className="text-2xl cursor-pointer" />
//           </div>
//         </div>

//         {location.pathname === "/PatientForm" ? (
//           <PatientForm />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-3">
//             {[ 
//               {
//                 title: "UMR",
//                 value: umrCount,
//                 icon: <FaUser className="text-blue-800" />,
//                 onClick: () => {},
//                 customClass: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-xl border border-blue-200",
//                 description: (
//                   <div className="text-sm mt-3">
//   <div className="flex justify-between items-center text-gray-700 font-medium">
//     <div className="flex items-center gap-1">
//       <span className="text-blue-700 font-semibold">IP:</span>
//       <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
//         {ipCount}
//       </span>
//     </div>
//     <div className="flex items-center gap-1">
//       <span className="text-green-700 font-semibold">OP:</span>
//       <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
//         {opCount}
//       </span>
//     </div>
//   </div>
// </div>

//                 )
//               },
//               {
//                 title: "OP Bills",
//                 value: opCount, // Changed to show OP count
//                 icon: <FaClipboardList className="text-red-800" />,
//                 onClick: () => {},
//                 customClass: "bg-gradient-to-r from-red-100 via-red-200 to-red-300 shadow-md hover:shadow-xl border border-red-200",
//               },
//               {
//                 title: "IP Admissions",
//                 value: (
//                   <>
//                     {ipCount}
//                     <br />
//                     <div className="max-h-40 overflow-y-auto custom-scrollbar mt-2 space-y-1">
//                       {departmentCounts.map(({ name, count }) => (
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
//               },
//               {
//                 title: "Discharges",
//                 value: dischargesCount,
//                 icon: <FaBed className="text-orange-800" />,
//                 onClick: () => {},
//                 customClass: "bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 shadow-md hover:shadow-xl border border-orange-200",
//               },
//               {
//                 title: "On Bed Count",
//                 value: onBedCount,
//                 icon: <FaMoneyBill className="text-purple-800" />,
//                 onClick: () => {},
//                 customClass: "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 shadow-md hover:shadow-xl border border-purple-200",
//               }
//             ].map((card, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-2xl transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer ${card.customClass}`}
//                 onClick={card.onClick}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="bg-white/20 p-4 rounded-full text-3xl">
//                     {card.icon}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm uppercase font-semibold tracking-wide">{card.title}</p>
//                     <div className="text-lg font-bold mt-1">{card.value}</div>
//                     {card.description && card.description}
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
import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaUser, FaSearch } from "react-icons/fa";
import { getDashboardData, fetchDepartmentCounts } from "../services/dashboardService";
import { getAllBeds } from "../services/wardService";
import { getAllAdmissions } from "../services/admissionService";
import { getPatients } from "../services/patientService";
import PatientForm from "../components/PatientForm";
import Sidebar from '../components/Sidebar';
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const [onBedCount, setOnBedCount] = useState(0);
  const [dischargesCount, setDischargesCount] = useState(0);
  const [umrCount, setUmrCount] = useState(0);
  const [opCount, setOpCount] = useState(0);
  const [ipCount, setIpCount] = useState(0);

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

  useEffect(() => {
    const fetchDischargeCount = async () => {
      try {
        const admissions = await getAllAdmissions();
        const discharged = admissions.filter(
          admission =>
            admission.is_discharged === true &&
            admission.discharge_date !== null &&
            admission.dischargeReasonId !== null
        );
        setDischargesCount(discharged.length);
      } catch (error) {
        console.error("Error fetching admission data:", error);
      }
    };
    fetchDischargeCount();
  }, []);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const counts = await fetchDepartmentCounts();
        const countsToDisplay = counts.map(dept => ({
          name: dept.departmentName,
          count: dept.admissionCount,
        }));
        setDepartmentCounts(countsToDisplay);
        
        const totalIpCount = countsToDisplay.reduce((sum, dept) => sum + dept.count, 0);
        setIpCount(totalIpCount);
      } catch (error) {
        console.error("Error fetching department counts:", error);
      }
    };
    getCounts();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patients = await getPatients();
        const opPatients = patients.filter(patient => patient.Ptype === 'OP');
        setOpCount(opPatients.length);
        setUmrCount(ipCount + opCount);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [ipCount, opCount]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Sidebar />

      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 font-medium">Hospital Management Overview</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48 md:w-56 lg:w-64 group">
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs sm:text-sm group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
            <div className="bg-white border border-slate-200 p-2 sm:p-2.5 rounded-xl cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group flex-shrink-0">
              <FaUser className="text-slate-600 text-base sm:text-lg group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>

        {location.pathname === "/PatientForm" ? (
          <PatientForm />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-fr">
            {[ 
              {
                title: "UMR",
                value: umrCount,
                icon: <FaUser className="text-blue-600" />,
                onClick: () => {},
                customClass: "bg-gradient-to-br from-white via-blue-50/50 to-blue-100/80 border-2 border-blue-200/50 shadow-lg hover:shadow-xl backdrop-blur-sm",
                description: (
                  <div className="text-xs md:text-sm mt-3 pt-3 border-t border-blue-200/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 group/ip">
                        <span className="text-slate-600 font-semibold group-hover/ip:text-blue-700 transition-colors">IP:</span>
                        <span className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                          {ipCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 group/op">
                        <span className="text-slate-600 font-semibold group-hover/op:text-green-700 transition-colors">OP:</span>
                        <span className="bg-gradient-to-br from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                          {opCount}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                title: "OP Bills",
                value: opCount,
                
                icon: <FaMoneyBill className="text-purple-600" />,
                onClick: () => {},
                customClass: "bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/80 border-2 border-emerald-200/50 shadow-lg hover:shadow-xl backdrop-blur-sm",
              },
              {
                title: "IP Admissions",
                value: (
                  <div className="w-full">
                    <span className="block mb-1.5">{ipCount}</span>
                    <div className="max-h-52 sm:max-h-56 md:max-h-60 lg:max-h-64 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-1.5 pr-1">
                      {departmentCounts.map(({ name, count }) => (
                        <div
                          key={name}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/ip-admissions?departmentName=${encodeURIComponent(name)}`);
                          }}
                          className="text-xs md:text-sm text-white bg-white/20 backdrop-blur-md px-2 py-1.5 rounded-lg cursor-pointer hover:bg-white/30 transition-all duration-200 border border-white/20 hover:border-white/40 group/dept hover:scale-[1.01] active:scale-[0.99] w-full"
                        >
                          <div className="flex justify-between items-center gap-1.5 w-full min-w-0">
                            <span className="font-semibold truncate group-hover/dept:translate-x-0.5 transition-transform flex-1 min-w-0">{name}</span>
                            <span className="bg-white/25 text-white font-bold px-1.5 py-0.5 rounded-full text-xs min-w-5 text-center shadow-sm group-hover/dept:bg-white/35 transition-all flex-shrink-0">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
                icon: <FaCalendarCheck className="text-white" />,
                onClick: () => navigate("/ip-admissions"),
                customClass: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl border-2 border-blue-500/50 row-span-2 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/0 before:via-white/5 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
              },
              {
                title: "Discharges",
                value: dischargesCount,
                icon: <FaClipboardList className="text-emerald-600" />,
                onClick: () => {},
                customClass: "bg-gradient-to-br from-white via-amber-50/50 to-amber-100/80 border-2 border-amber-200/50 shadow-lg hover:shadow-xl backdrop-blur-sm",
              },
              {
                title: "On Bed Count",
                value: onBedCount,
                
                icon: <FaBed className="text-amber-600" />,
                onClick: () => {},
                customClass: "bg-gradient-to-br from-white via-purple-50/50 to-purple-100/80 border-2 border-purple-200/50 shadow-lg hover:shadow-xl backdrop-blur-sm",
              }
            ].map((card, index) => (
              <div
                key={index}
                className={`p-4 sm:p-5 md:p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${card.customClass} relative overflow-hidden group/card ${
                  card.title === "IP Admissions" ? "sm:row-span-2" : ""
                }`}
                onClick={card.onClick}
              >
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="flex items-start gap-3 md:gap-4 relative z-10 h-full">
                  <div className={`p-2.5 md:p-3 lg:p-3.5 rounded-xl transition-all duration-300 flex-shrink-0 ${
                    card.customClass.includes('blue-600') 
                      ? 'bg-white/25 backdrop-blur-sm shadow-lg group-hover/card:bg-white/30 group-hover/card:scale-110' 
                      : 'bg-white shadow-md group-hover/card:shadow-xl group-hover/card:scale-110'
                  }`}>
                    <div className="text-lg md:text-xl lg:text-2xl">
                      {card.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                    <p className={`text-xs md:text-sm uppercase font-bold tracking-wider ${
                      card.customClass.includes('blue-600') ? 'text-blue-100' : 'text-slate-500'
                    } mb-1 flex-shrink-0`}>
                      {card.title}
                    </p>
                    <div className={`text-xl sm:text-2xl md:text-3xl font-extrabold ${
                      card.customClass.includes('blue-600') ? 'text-white' : 'text-slate-800'
                    } tracking-tight ${card.title === "IP Admissions" ? "flex-1 flex flex-col min-h-0" : "mt-1"}`}>
                      {card.value}
                    </div>
                    {card.description && card.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          transition: background 0.2s;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;















