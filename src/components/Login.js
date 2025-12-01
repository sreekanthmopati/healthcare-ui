// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { loginUser, verifySession } from "../services/authService"; // Ensure verifySession is imported
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [checkingSession, setCheckingSession] = useState(true);
//   const navigate = useNavigate();

//   // ✅ Check session on component mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         await verifySession(); // Call API to verify session
//         navigate("/dashboard"); // Redirect to dashboard if session exists
//       } catch {
//         setCheckingSession(false); // If no session, show login form
//       }
//     };

//     checkSession();
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = await loginUser(username, password);
//       localStorage.setItem("token", data.token.token);
//       toast.success("Login successful!");
//       setTimeout(() => navigate("/dashboard"), 1000);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <ToastContainer position="top-right" autoClose={2000} />
//       {checkingSession ? (
//         <p className="text-gray-700">Checking session...</p>
//       ) : (
//         <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//           <h2 className="text-2xl font-semibold text-center text-blue-700">
//             MedIntel Pro Login
//           </h2>
//           <form onSubmit={handleLogin} className="mt-4">
//             <div>
//               <label className="block text-gray-700">Username</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mt-3">
//               <label className="block text-gray-700">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 pr-10"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-3 flex items-center top-1/2 transform -translate-y-1/2 text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeSlashIcon className="w-5 h-5" />
//                   ) : (
//                     <EyeIcon className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;






// import React, { useState, useEffect } from "react"; 
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import { useNavigate } from "react-router-dom"; 
// import { loginUser, verifySession } from "../services/authService";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; 
// import { FaStethoscope, FaUserShield, FaHospital } from "react-icons/fa";

// const Login = () => { 
//   const [username, setUsername] = useState(""); 
//   const [password, setPassword] = useState(""); 
//   const [showPassword, setShowPassword] = useState(false); 
//   const [loading, setLoading] = useState(false); 
//   const [checkingSession, setCheckingSession] = useState(true); 
//   const navigate = useNavigate(); 

//   useEffect(() => { 
//     const checkSession = async () => { 
//       try { 
//         await verifySession();
//         navigate("/dashboard");
//       } catch { 
//         setCheckingSession(false);
//       } 
//     }; 

//     checkSession(); 
//   }, [navigate]); 

//   const handleLogin = async (e) => { 
//     e.preventDefault(); 
//     setLoading(true); 
//     try { 
//       const data = await loginUser(username, password); 
//       localStorage.setItem("token", data.token.token); 
//       toast.success("Login successful!"); 
//       setTimeout(() => navigate("/dashboard"), 1000); 
//     } catch (error) {
//       toast.error("Invalid credentials. Please try again.");
//     } finally { 
//       setLoading(false); 
//     } 
//   }; 

//   return ( 
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-3 sm:p-4">
//       <ToastContainer 
//         position="top-center"
//         autoClose={2000}
//         className="text-sm"
//         toastClassName="text-sm"
//       /> 
      
//       {checkingSession ? ( 
//         <div className="bg-white rounded-lg p-4 sm:p-5 shadow-md border w-full max-w-xs">
//           <div className="flex flex-col items-center space-y-2">
//             <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-600 text-xs sm:text-sm">Checking session...</p>
//           </div>
//         </div>
//       ) : ( 
//         <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border w-full max-w-xs sm:max-w-sm mx-auto">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 sm:px-5 py-4 text-center">
//             <div className="flex justify-center items-center space-x-2 mb-1">
//               <FaHospital className="text-white text-lg sm:text-xl" />
//               <FaStethoscope className="text-white text-base sm:text-lg" />
//             </div>
//             <h2 className="text-lg sm:text-xl font-bold text-white">MedIntel Pro</h2>
//             <p className="text-blue-100 text-xs mt-0.5">Hospital Management System</p>
//           </div>

//           {/* Login Form */}
//           <div className="p-4 sm:p-5">
//             <div className="flex items-center justify-center mb-3 sm:mb-4">
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <FaUserShield className="text-blue-600 text-base sm:text-lg" />
//               </div>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                   Username
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <span className="text-gray-400 text-xs">👤</span>
//                   </div>
//                   <input 
//                     type="text" 
//                     className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                     placeholder="Enter username" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                     required 
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <span className="text-gray-400 text-xs">🔒</span>
//                   </div>
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     className="w-full pl-8 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                     placeholder="Enter password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                   />
//                   <button 
//                     type="button" 
//                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                     onClick={() => setShowPassword(!showPassword)} 
//                   >
//                     {showPassword ? ( 
//                       <EyeSlashIcon className="w-4 h-4" /> 
//                     ) : ( 
//                       <EyeIcon className="w-4 h-4" /> 
//                     )} 
//                   </button> 
//                 </div>
//               </div>

//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Signing in...</span>
//                   </span>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* Security Notice */}
//             <div className="mt-4 p-2 bg-blue-50 rounded border border-blue-200">
//               <p className="text-xs text-blue-700 text-center">
//                 Secure hospital system access
//               </p>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-gray-50 px-4 sm:px-5 py-2.5 border-t border-gray-200 rounded-b-xl sm:rounded-b-2xl">
//             <p className="text-xs text-gray-500 text-center">
//               Authorized personnel only
//             </p>
//           </div>
//         </div>
//       )} 
//     </div>
//   ); 
// }; 

// export default Login;









// import React, { useState, useEffect } from "react"; 
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import { useNavigate } from "react-router-dom"; 
// import { loginUser, verifySession } from "../services/authService";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; 
// import { FaStethoscope, FaHospital } from "react-icons/fa";

// const Login = () => { 
//   const [username, setUsername] = useState(""); 
//   const [password, setPassword] = useState(""); 
//   const [showPassword, setShowPassword] = useState(false); 
//   const [loading, setLoading] = useState(false); 
//   const [checkingSession, setCheckingSession] = useState(true); 
//   const navigate = useNavigate(); 

//   useEffect(() => { 
//     const checkSession = async () => { 
//       try { 
//         await verifySession();
//         navigate("/dashboard");
//       } catch { 
//         setCheckingSession(false);
//       } 
//     }; 

//     checkSession(); 
//   }, [navigate]); 

//   const handleLogin = async (e) => { 
//     e.preventDefault(); 
//     setLoading(true); 
//     try { 
//       const data = await loginUser(username, password); 
//       localStorage.setItem("token", data.token.token); 
//       toast.success("Login successful!"); 
//       setTimeout(() => navigate("/dashboard"), 1000); 
//     } catch (error) {
//       toast.error("Invalid credentials. Please try again.");
//     } finally { 
//       setLoading(false); 
//     } 
//   }; 

//   return ( 
//     <div className="font-sans">
//       <ToastContainer 
//         position="top-center"
//         autoClose={2000}
//         className="text-sm"
//       /> 
      
//       {checkingSession ? ( 
//         <div className="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
//           <div className="bg-white rounded-xl p-6 shadow-lg border w-full max-w-xs">
//             <div className="flex flex-col items-center space-y-3">
//               <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               <p className="text-gray-600 text-sm">Checking session security...</p>
//             </div>
//           </div>
//         </div>
//       ) : ( 
//         <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 p-4">
//           <div className="relative w-full max-w-xs sm:max-w-sm">
//             {/* Background Cards - EXACT TILTED DESIGN */}
//             <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
//             <div className="card bg-cyan-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
            
//             {/* Main Login Card */}
//             <div className="relative w-full rounded-3xl px-5 py-6 bg-white shadow-md">
//               {/* Header */}
//               <div className="flex justify-center items-center mb-2">
//                 <div className="flex items-center space-x-2">
//                   <FaHospital className="text-blue-600 text-xl" />
//                   <FaStethoscope className="text-cyan-600 text-lg" />
//                 </div>
//               </div>
//               <label className="block text-lg text-gray-700 text-center font-bold">
//                 MedIntel Pro
//               </label>
//               <p className="text-xs text-gray-500 text-center mt-1">Hospital Management System</p>

//               <form onSubmit={handleLogin} className="mt-6">
//                 {/* Username Field */}
//                 <div>
//                   <input 
//                     type="text" 
//                     placeholder="Username" 
//                     className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 pl-4 text-sm"
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                     required 
//                   />
//                 </div>

//                 {/* Password Field */}
//                 <div className="mt-4">
//                   <div className="relative">
//                     <input 
//                       type={showPassword ? "text" : "password"} 
//                       placeholder="Password" 
//                       className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 pl-4 pr-12 text-sm"
//                       value={password} 
//                       onChange={(e) => setPassword(e.target.value)} 
//                       required 
//                     />
//                     <button 
//                       type="button" 
//                       className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
//                       onClick={() => setShowPassword(!showPassword)} 
//                     >
//                       {showPassword ? ( 
//                         <EyeSlashIcon className="w-5 h-5" /> 
//                       ) : ( 
//                         <EyeIcon className="w-5 h-5" /> 
//                       )} 
//                     </button> 
//                   </div>
//                 </div>

//                 {/* Login Button */}
//                 <div className="mt-6">
//                   <button 
//                     type="submit" 
//                     disabled={loading}
//                     className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center space-x-2">
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         <span>Signing in...</span>
//                       </span>
//                     ) : (
//                       "Login"
//                     )}
//                   </button>
//                 </div>

//                 {/* Security Notice */}
//                 <div className="mt-4 p-2 bg-blue-50 rounded border border-blue-200">
//                   <p className="text-xs text-blue-700 text-center">
//                     Secure hospital system access
//                   </p>
//                 </div>
//               </form>

//               {/* Footer */}
//               <div className="mt-4 bg-gray-50 px-4 py-2.5 border-t border-gray-200 rounded-b-3xl -mx-5 -mb-6">
//                 <p className="text-xs text-gray-500 text-center">
//                   Authorized personnel only
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )} 
//     </div>
//   ); 
// }; 

// export default Login;













import React, { useState, useEffect } from "react"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom"; 
import { loginUser, verifySession } from "../services/authService";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; 
import { FaStethoscope, FaHospital, FaShieldAlt } from "react-icons/fa";

const Login = () => { 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [checkingSession, setCheckingSession] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => { 
    const checkSession = async () => { 
      try { 
        await verifySession();
        navigate("/dashboard");
      } catch { 
        setCheckingSession(false);
      } 
    }; 

    checkSession(); 
  }, [navigate]); 

  const handleLogin = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    try { 
      const data = await loginUser(username, password); 
      localStorage.setItem("token", data.token.token); 
      toast.success("Login successful!"); 
      setTimeout(() => navigate("/dashboard"), 1000); 
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally { 
      setLoading(false); 
    } 
  }; 

  return ( 
    <div className="font-sans">
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        className="text-sm"
      /> 
      
      {checkingSession ? ( 
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="bg-white rounded-xl p-6 shadow-lg border w-full max-w-xs mx-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 text-sm">Checking session...</p>
            </div>
          </div>
        </div>
      ) : ( 
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 overflow-hidden">
          <div className="relative w-full max-w-sm">
            {/* Background Tilted Cards */}
            <div className="card bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6 transition-transform hover:rotate-0 duration-500"></div>
            <div className="card bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6 transition-transform hover:rotate-0 duration-500"></div>
            
            {/* Main Login Card */}
            <div className="relative w-full rounded-3xl px-6 py-6 bg-white shadow-2xl">
              {/* Header */}
              <div className="flex justify-center items-center mb-2">
                <div className="flex items-center space-x-2">
                  <FaHospital className="text-blue-600 text-2xl" />
                  <FaStethoscope className="text-cyan-600 text-xl" />
                </div>
              </div>
              <h1 className="text-xl text-gray-800 text-center font-bold">
                MedIntel Pro
              </h1>
              <p className="text-xs text-gray-500 text-center mt-1 mb-5">Hospital Management System</p>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Field */}
                <div>
                  <input 
                    type="text" 
                    placeholder="Username" 
                    className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-sm hover:bg-blue-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 text-sm transition-all"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-sm hover:bg-blue-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none pl-4 pr-12 text-sm transition-all"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)} 
                  >
                    {showPassword ? ( 
                      <EyeSlashIcon className="w-5 h-5" /> 
                    ) : ( 
                      <EyeIcon className="w-5 h-5" /> 
                    )} 
                  </button> 
                </div>

                {/* Login Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 w-full py-3 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center space-x-2 pt-2 pb-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg py-2">
                  <FaShieldAlt className="text-blue-600 text-sm" />
                  <p className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Secure hospital system access</p>
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-xs font-bold text-red-500">Authorized Personnel Only</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Version Info */}
                <div className="text-center pt-1">
                  <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">MedIntel Pro v1.0</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} 
    </div>
  ); 
}; 

export default Login;