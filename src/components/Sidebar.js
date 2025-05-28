// components/Sidebar.js
// import React from "react";
// import { FaClipboardList, FaCalendarCheck, FaMoneyBill, FaBed, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { TbReportSearch } from "react-icons/tb";
// import { BsFillPersonLinesFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Sidebar = ({ active, setActive }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "Dashboard", icon: <FaClipboardList /> },
//     { name: "Reports", icon: <TbReportSearch /> },
//     { name: "Admissions", icon: <FaBed /> },
//     { name: "Outpatient Registration", icon: <FaUser /> },
//     { name: "Inpatient Conversion", icon: <BsFillPersonLinesFill /> }
//   ];

//   return (
//     <div className="w-64 bg-blue-900 text-white p-5 flex flex-col h-full" style={{height : "100vh"}}>
//       <div className="flex justify-center">
//         <img src="/logo.jpg" alt="MedIntel Pro Logo" className="w-60 h-100 mb-4" />
//       </div>

//       <nav>
//         {menuItems.map((item) => (
//           <div
//             key={item.name}
//             className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 hover:bg-blue-700 transition ${
//               active === item.name ? "bg-blue-700" : ""
//             }`}
//             onClick={() => {
//               setActive(item.name);
//               if (item.name === "Dashboard") navigate("/dashboard");
//               if (item.name === "Outpatient Registration") navigate("/PatientForm");
//               if (item.name === "Admissions") navigate("/ip-admissions");
//               if (item.name === "Reports") navigate("/Adminreportpage"); 
//               if (item.name === "Inpatient Conversion") navigate("/Inpatientconversion");
//             }}
//           >
//             {item.icon}
//             <span>{item.name}</span>
//           </div>
//         ))}
//       </nav>

//       <div
//         className="mt-auto flex items-center gap-3 p-3 cursor-pointer hover:bg-red-500 transition rounded-lg"
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










// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { 
//   FaClipboardList, FaBed, FaSignOutAlt, FaUser, 
//   FaChevronDown, FaChevronUp, FaTimes 
// } from "react-icons/fa";
// import { TbReportSearch } from "react-icons/tb";
// import { BsFillPersonLinesFill } from "react-icons/bs";

// // MENU CONFIG
// const menuConfig = [
//   { name: "Dashboard", icon: <FaClipboardList />, path: "/dashboard" },
//   { name: "Registration", icon: <FaClipboardList />, children: [
//     { name: "Outpatient Registration", icon: <FaUser />, path: "/PatientForm" },
//     { name: "Patients", path: "/inpatient-option2" },
//     { name: "Patient Casesheet", path: "/inpatient-option2" }
//   ] },
  
//   { name: "Admissions", icon: <FaBed />, path: "/ip-admissions" },
//   { 
//     name: "In-Patients", icon: <FaBed />, children: [
//       { name: "Inpatient Conversion", icon: <BsFillPersonLinesFill />, path: "/Inpatientconversion" },
//       { name: "In-Patient Option 2", path: "/inpatient-option2" }
//     ]
//   },
//   { 
//     name: "Out-Patients", icon: <FaUser />, children: [
//       { name: "Outpatient Registration", icon: <FaUser />, path: "/PatientForm" },
//       { name: "Out-Patient Option 2", path: "/outpatient-option2" }
//     ]
//   },

//   {
//     name: "Reports", icon: <TbReportSearch />, children: [
//       { name: "IP Bill Report - Date", path: "/ip-bill-report-date" },
//       { name: "IP Bill Report - Department", path: "/ip-bill-report-department" },
//       { name: "OP Bill Report - Date", path: "/op-bill-report-date" },
//       { name: "Summary of Revenue", path: "/revenue-summary" },
//       { name: "Report Snapshot", icon: <TbReportSearch />, path: "/Adminreportpage" }
//     ]
//   },
//   { name: "Service Master", icon: <FaBed />, path: "" },

// ];


import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// ICONS
import {
  FaTachometerAlt,       // Dashboard
  FaUserPlus,            // Registration
  FaNotesMedical,        // Patient Casesheet
  FaHospitalUser,        // Admissions
  FaProcedures,          // Inpatients
  FaUserInjured,         // Outpatients
  FaFileInvoiceDollar,   // Billing Reports
  FaChartBar,            // Revenue Summary
  FaFileMedical,         // Report Snapshot
  FaTools,               // Service Master
  FaIdCard,              // Inpatient Conversion
  FaSignOutAlt,  
  FaChevronDown, FaChevronUp, FaTimes
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
    name: "discharge patients",
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
        <span key={i} className="bg-yellow-300 text-black rounded px-1">
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
    <div className="w-64 bg-blue-900 text-white p-5 flex flex-col h-screen">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img 
          src="/logo.jpg" 
          alt="MedIntel Pro Logo" 
          className="w-60 h-auto object-contain" 
        />
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 pl-4 pr-10 rounded bg-blue-800 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isParentActive = item.children?.some(child => child.path === active);
          const isOpen = openMenus[item.name] || debouncedQuery.length > 0;

          return (
            <div key={item.name}>
              {item.children ? (
                <>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                      isParentActive ? "bg-blue-700" : "hover:bg-blue-700"
                    }`}
                    onClick={() => toggleMenu(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      {Icon}
                      <span>{highlightMatch(item.name)}</span>
                    </div>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {isOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <div
                          key={child.name}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                            active === child.path 
                              ? "bg-blue-700 font-semibold" 
                              : "hover:bg-blue-700"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate(child.path);
                          }}
                        >
                          {child.icon}
                          <span>{highlightMatch(child.name)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    active === item.path 
                      ? "bg-blue-700 font-semibold" 
                      : "hover:bg-blue-700"
                  }`}
                  onClick={() => handleNavigate(item.path)}
                >
                  {Icon}
                  <span>{highlightMatch(item.name)}</span>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        className="flex items-center gap-3 p-3 mt-auto rounded-lg cursor-pointer hover:bg-red-500"
        onClick={() => {
          localStorage.removeItem("token");
          toast.success("Logged out");
          navigate("/login");
        }}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;





