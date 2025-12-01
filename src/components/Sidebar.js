

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// // ICONS
// import {
//   FaTachometerAlt,       // Dashboard
//   FaUserPlus,            // Registration
//   FaNotesMedical,        // Patient Casesheet
//   FaHospitalUser,        // Admissions
//   FaProcedures,          // Inpatients
//   FaUserInjured,         // Outpatients
//   FaFileInvoiceDollar,   // Billing Reports
//   FaChartBar,            // Revenue Summary
//   FaFileMedical,         // Report Snapshot
//   FaTools,               // Service Master
//   FaIdCard,              // Inpatient Conversion
//   FaSignOutAlt,  
//   FaChevronDown, FaChevronUp, FaTimes
// } from "react-icons/fa";
// import { BsFillPeopleFill } from "react-icons/bs";

// const menuConfig = [
//   {
//     name: "Dashboard",
//     icon: <FaTachometerAlt />,
//     path: "/dashboard",
//   },
//   {
//     name: "Registration",
//     icon: <FaUserPlus />,
//     children: [
//       { name: "Outpatient Registration", icon: <FaUserPlus />, path: "/PatientForm" },
//       { name: "Patients", icon: <BsFillPeopleFill />, path: "/inpatient-option2" },
//       { name: "Patient Casesheet", icon: <FaNotesMedical />, path: "/CaseSheetListPage" }
//     ]
//   },
//   {
//     name: "Admissions",
//     icon: <FaHospitalUser />,
//     path: "/ip-admissions",
//   },
//   {
//     name: "In-Patients",
//     icon: <FaProcedures />,
//     children: [
//       { name: "Inpatient Conversion", icon: <FaIdCard />, path: "/Inpatientconversion" },
//       { name: "Convert to IP's", icon: <FaNotesMedical />, path: "/BulkAdmissions" }
//     ]
//   },
//   {
//     name: "Out-Patients",
//     icon: <FaUserInjured />,
//     children: [
//       { name: "Outpatient Registration", icon: <FaUserPlus />, path: "/PatientForm" },
//       { name: "Out-Patient Option 2", icon: <FaNotesMedical />, path: "/outpatient-option2" }
//     ]
//   },
//   {
//     name: "Reports",
//     icon: <FaFileInvoiceDollar />,
//     children: [
//       { name: "IP Bill Report - Date", icon: <FaFileInvoiceDollar />, path: "/ip-bill-report-date" },
//       { name: "IP Bill Report - Department", icon: <FaFileInvoiceDollar />, path: "/ip-bill-report-department" },
//       { name: "OP Bill Report - Date", icon: <FaFileInvoiceDollar />, path: "/op-bill-report-date" },
//       { name: "Summary of Revenue", icon: <FaChartBar />, path: "/revenue-summary" },
//       { name: "Report Snapshot", icon: <FaFileMedical />, path: "/Adminreportpage" }
//     ]
//   },
//   {
//     name: "Records",
//     icon: <FaFileInvoiceDollar />,
//     children: [
//       { name: "ICD CODES", icon: <FaFileInvoiceDollar />, path: "/ICD" },
      
//     ]
//   },
//   {
//     name: "Service Master",
//     icon: <FaTools />,
//     path: "",
//   },
//   {
//     name: "discharge patients",
//     icon: <FaIdCard />,
//     path: "/DischargePatientsPage",
//   }
// ];



// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [active, setActive] = useState(location.pathname);
//   const [openMenus, setOpenMenus] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // Debounce search input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(searchQuery);
//     }, 400);

//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Set active state and open menus
//   useEffect(() => {
//     setActive(location.pathname);

//     const newOpenMenus = {};
//     menuConfig.forEach(item => {
//       if (item.children) {
//         newOpenMenus[item.name] = item.children.some(child => 
//           child.path === location.pathname
//         );
//       }
//     });
//     setOpenMenus(newOpenMenus);
//   }, [location.pathname]);

//   const toggleMenu = (menuName) => {
//     setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
//   };

//   const handleNavigate = (path) => {
//     setActive(path);
//     navigate(path);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const highlightMatch = (text) => {
//     if (!debouncedQuery) return text;
//     const regex = new RegExp(`(${debouncedQuery})`, "gi");
//     return text.split(regex).map((part, i) =>
//       regex.test(part) ? (
//         <span key={i} className="bg-yellow-300 text-black rounded px-1">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   const filteredMenuItems = useMemo(() => {
//     if (!debouncedQuery.trim()) return menuConfig;

//     return menuConfig
//       .map(item => {
//         if (!item.children) {
//           return item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) 
//             ? item 
//             : null;
//         }

//         const filteredChildren = item.children.filter(child =>
//           child.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//         );

//         if (filteredChildren.length > 0 || 
//             item.name.toLowerCase().includes(debouncedQuery.toLowerCase())) {
//           return { ...item, children: filteredChildren };
//         }
//         return null;
//       })
//       .filter(Boolean);
//   }, [debouncedQuery]);

//   const clearSearch = () => setSearchQuery("");

//   return (
//     <div className="w-64 bg-blue-900 text-white p-5 flex flex-col h-screen">
//       {/* Logo */}
//       <div className="flex justify-center mb-4">
//         <img 
//           src="/logo.jpg" 
//           alt="MedIntel Pro Logo" 
//           className="w-60 h-auto object-contain" 
//         />
//       </div>

//       {/* Search Bar */}
//       <div className="relative mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="w-full p-2 pl-4 pr-10 rounded bg-blue-800 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         {searchQuery && (
//           <button
//             onClick={clearSearch}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
//           >
//             <FaTimes />
//           </button>
//         )}
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
//         {filteredMenuItems.map((item) => {
//           const Icon = item.icon;
//           const isParentActive = item.children?.some(child => child.path === active);
//           const isOpen = openMenus[item.name] || debouncedQuery.length > 0;

//           return (
//             <div key={item.name}>
//               {item.children ? (
//                 <>
//                   <div
//                     className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
//                       isParentActive ? "bg-blue-700" : "hover:bg-blue-700"
//                     }`}
//                     onClick={() => toggleMenu(item.name)}
//                   >
//                     <div className="flex items-center gap-3">
//                       {Icon}
//                       <span>{highlightMatch(item.name)}</span>
//                     </div>
//                     {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//                   </div>

//                   {isOpen && (
//                     <div className="ml-6 mt-2 space-y-1">
//                       {item.children.map((child) => (
//                         <div
//                           key={child.name}
//                           className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
//                             active === child.path 
//                               ? "bg-blue-700 font-semibold" 
//                               : "hover:bg-blue-700"
//                           }`}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleNavigate(child.path);
//                           }}
//                         >
//                           {child.icon}
//                           <span>{highlightMatch(child.name)}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div
//                   className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
//                     active === item.path 
//                       ? "bg-blue-700 font-semibold" 
//                       : "hover:bg-blue-700"
//                   }`}
//                   onClick={() => handleNavigate(item.path)}
//                 >
//                   {Icon}
//                   <span>{highlightMatch(item.name)}</span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div
//         className="flex items-center gap-3 p-3 mt-auto rounded-lg cursor-pointer hover:bg-red-500"
//         onClick={() => {
//           localStorage.removeItem("token");
//           toast.success("Logged out");
//           navigate("/login");
//         }}
//       >
//         <FaSignOutAlt />
//         <span>Logout</span>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;






import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// ICONS
import {
  FaTachometerAlt,
  FaUserPlus,
  FaNotesMedical,
  FaHospitalUser,
  FaProcedures,
  FaUserInjured,
  FaFileInvoiceDollar,
  FaChartBar,
  FaFileMedical,
  FaTools,
  FaIdCard,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaSearch,
  FaStethoscope,
  FaHeartbeat
} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

const menuConfig = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
  },
  {
    name: "Registration",
    icon: <FaUserPlus />,
    children: [
      { name: "Outpatient Registration", icon: <FaUserPlus />, path: "/PatientForm" },
      { name: "Patients", icon: <BsFillPeopleFill />, path: "/inpatient-option2" },
      { name: "Patient Casesheet", icon: <FaNotesMedical />, path: "/CaseSheetListPage" }
    ]
  },
  {
    name: "Admissions",
    icon: <FaHospitalUser />,
    path: "/ip-admissions",
  },
  {
    name: "In-Patients",
    icon: <FaProcedures />,
    children: [
      { name: "Inpatient Conversion", icon: <FaIdCard />, path: "/Inpatientconversion" },
      { name: "Convert to IP's", icon: <FaNotesMedical />, path: "/BulkAdmissions" }
    ]
  },
  {
    name: "Out-Patients",
    icon: <FaUserInjured />,
    children: [
      { name: "Outpatient Registration", icon: <FaUserPlus />, path: "/PatientForm" },
      { name: "Out-Patient Option 2", icon: <FaNotesMedical />, path: "/outpatient-option2" }
    ]
  },
  {
    name: "Reports",
    icon: <FaFileInvoiceDollar />,
    children: [
      { name: "IP Bill Report - Date", icon: <FaFileInvoiceDollar />, path: "/ip-bill-report-date" },
      { name: "IP Bill Report - Department", icon: <FaFileInvoiceDollar />, path: "/ip-bill-report-department" },
      { name: "OP Bill Report - Date", icon: <FaFileInvoiceDollar />, path: "/op-bill-report-date" },
      { name: "Summary of Revenue", icon: <FaChartBar />, path: "/revenue-summary" },
      { name: "Report Snapshot", icon: <FaFileMedical />, path: "/Adminreportpage" }
    ]
  },
  {
    name: "Records",
    icon: <FaFileInvoiceDollar />,
    children: [
      { name: "ICD CODES", icon: <FaFileInvoiceDollar />, path: "/ICD" },
    ]
  },
  {
    name: "Service Master",
    icon: <FaTools />,
    path: "",
  },
  {
    name: "Discharge Patients",
    icon: <FaIdCard />,
    path: "/DischargePatientsPage",
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [openMenus, setOpenMenus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Set active state and open menus
  useEffect(() => {
    setActive(location.pathname);

    const newOpenMenus = {};
    menuConfig.forEach(item => {
      if (item.children) {
        newOpenMenus[item.name] = item.children.some(child => 
          child.path === location.pathname
        );
      }
    });
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const handleNavigate = (path) => {
    setActive(path);
    navigate(path);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const highlightMatch = (text) => {
    if (!debouncedQuery) return text;
    const regex = new RegExp(`(${debouncedQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 font-bold rounded px-1 py-0.5 shadow-sm text-xs">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredMenuItems = useMemo(() => {
    if (!debouncedQuery.trim()) return menuConfig;

    return menuConfig
      .map(item => {
        if (!item.children) {
          return item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) 
            ? item 
            : null;
        }

        const filteredChildren = item.children.filter(child =>
          child.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

        if (filteredChildren.length > 0 || 
            item.name.toLowerCase().includes(debouncedQuery.toLowerCase())) {
          return { ...item, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean);
  }, [debouncedQuery]);

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="w-64 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 flex flex-col h-screen shadow-xl border-r border-blue-800/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-3 group">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Logo container */}
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-teal-50 rounded-lg p-2 shadow-lg">
              <img 
                src="/logo.jpg" 
                alt="MedIntel Pro Logo" 
                className="w-28 h-auto object-contain" 
              />
            </div>
          </div>
          
          {/* Medical Icon Header */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-900/40 to-teal-900/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-400/20 shadow">
            <FaHeartbeat className="text-emerald-400 text-sm" />
            <span className="text-xs font-semibold tracking-wide text-blue-100">Healthcare System</span>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative mb-4 group">
          <div className="relative">
            {/* Search icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <FaSearch className="text-teal-300 text-sm" />
            </div>
            
            {/* Input field */}
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 pl-9 pr-8 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 placeholder-slate-400 text-white focus:outline-none focus:ring-1 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-200 shadow-inner text-sm"
            />
            
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white rounded p-1 transition-all duration-200"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isParentActive = item.children?.some(child => child.path === active);
            const isOpen = openMenus[item.name] || debouncedQuery.length > 0;

            return (
              <div key={item.name} className="group/item">
                {item.children ? (
                  <>
                    <div
                      className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                        isParentActive 
                          ? "bg-gradient-to-r from-teal-600 to-emerald-600 shadow-md shadow-teal-500/20 border border-teal-400/20" 
                          : "bg-slate-800/30 hover:bg-slate-700/40 border border-transparent hover:border-slate-600/30"
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-base transition-colors duration-200 ${
                          isParentActive 
                            ? "text-white" 
                            : "text-teal-300 group-hover/item:text-emerald-300"
                        }`}>
                          {Icon}
                        </div>
                        <span className={`font-medium text-sm ${
                          isParentActive ? "text-white" : "text-slate-200 group-hover/item:text-white"
                        }`}>
                          {highlightMatch(item.name)}
                        </span>
                      </div>
                      <div className={`transition-transform duration-200 text-xs ${
                        isOpen 
                          ? "rotate-180 text-emerald-300" 
                          : "text-slate-400 group-hover/item:text-teal-300"
                      }`}>
                        <FaChevronUp />
                      </div>
                    </div>

                    {isOpen && (
                      <div className="ml-3 mt-1 space-y-0.5 border-l border-teal-500/20 pl-2 py-1">
                        {item.children.map((child) => (
                          <div
                            key={child.name}
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all duration-150 ${
                              active === child.path 
                                ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-emerald-100 font-medium border-l border-emerald-400" 
                                : "hover:bg-slate-700/30 text-slate-300 hover:text-white border-l border-transparent"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigate(child.path);
                            }}
                          >
                            <div className={`text-xs ${
                              active === child.path 
                                ? "text-emerald-400" 
                                : "text-teal-400"
                            }`}>
                              {child.icon}
                            </div>
                            <span className="text-xs font-medium">
                              {highlightMatch(child.name)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                      active === item.path 
                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 shadow-md shadow-teal-500/20 border border-teal-400/20" 
                        : "bg-slate-800/30 hover:bg-slate-700/40 border border-transparent hover:border-slate-600/30"
                    }`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <div className={`text-base transition-colors duration-200 ${
                      active === item.path 
                        ? "text-white" 
                        : "text-teal-300 group-hover/item:text-emerald-300"
                    }`}>
                      {Icon}
                    </div>
                    <span className={`font-medium text-sm ${
                      active === item.path ? "text-white" : "text-slate-200 group-hover/item:text-white"
                    }`}>
                      {highlightMatch(item.name)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-4 pt-3 border-t border-slate-700/30">
          <div
            className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 bg-red-900/20 hover:bg-red-600 border border-red-700/30 hover:border-red-500/40 group/logout"
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logged out successfully");
              navigate("/login");
            }}
          >
            <FaSignOutAlt className="text-red-300 group-hover/logout:text-white transition-colors duration-200 text-sm" />
            <span className="font-medium text-sm text-red-100 group-hover/logout:text-white">
              Logout
            </span>
          </div>
        </div>

        {/* Version Info */}
        {/* <div className="mt-3 text-center py-1.5 bg-slate-800/20 rounded-md backdrop-blur-sm border border-slate-700/20">
          <span className="text-xs text-slate-400">
            v2.1.0
          </span>
        </div> */}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;


