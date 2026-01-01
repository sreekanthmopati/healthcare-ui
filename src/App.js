// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Adminreportpage from "./components/Adminreportpage";
// import PatientDetails from "./components/PatientDetails";
// import { ToastContainer } from "react-toastify";
// import CaseSheetPopup from "./components/CaseSheetPopup";
// import PatientForm from "./components/PatientForm";
// import AdmissionsPage from "./components/AdmissionsPage";
// import Inpatientconversion from "./components/Inpatientconversion";
// import CaseSheetListPage from "./components/CaseSheetListPage";
// import DischargePatientsPage from "./components/DischargePatientsPage";
// import BulkAdmissionPage from "./components/BulkAdmissionPage";
// import ICDcodepage from "./components/ICDcodepage";

// function App() {
//   return (
//     <div className="bg-white">
//     <ToastContainer position="top-right" autoClose={1000} />
//       <Router>
//         <Routes>
          // <Route path="/" element={<Navigate to="/login" />} />
          // <Route path="/login" element={<Login />} />
          // <Route path="/dashboard" element={<Dashboard />} />
          // <Route path="/ip-admissions" element={<AdmissionsPage />} />
          // <Route path="/patient/:id" element={<PatientDetails />} />
          // <Route path="/patient/:patientId" element={<CaseSheetPopup />} />
          // <Route path="/PatientForm" element={<PatientForm />} />
          // <Route path="/Adminreportpage" element={<Adminreportpage />} />
          // <Route path="/Inpatientconversion" element={<Inpatientconversion />} />
          // <Route path="/CaseSheetListPage" element={<CaseSheetListPage />} />
          // <Route path="/DischargePatientsPage" element={<DischargePatientsPage />} />
          // <Route path="/BulkAdmissions" element={<BulkAdmissionPage />} />
          // <Route path="/ICD" element={<ICDcodepage />} />


//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;























import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import PatientDetails from "./components/PatientDetails";
import { ToastContainer } from "react-toastify";
import CaseSheetPopup from "./components/CaseSheetPopup";
import PatientForm from "./components/PatientForm";
import Inpatientconversion from "./components/Inpatientconversion";
import CaseSheetList from "./components/CaseSheetList";
import DischargePatients from "./components/DischargePatients";
import BulkAdmissions from "./components/BulkAdmissions";
import ICDCodeManager from "./components/ICDCodeManager";

import DashboardLayout from "./components/DashboardLayout";
import IPAdmissions from "./components/IPAdmissions";

function App() {
  return (
    <div className="bg-white">
      <ToastContainer position="top-right" autoClose={1000} />

      <Router>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard / Protected */}
          <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ip-admissions" element={<IPAdmissions />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/patient/:patientId" element={<CaseSheetPopup />} />
          <Route path="/PatientForm" element={<PatientForm />} />
          <Route path="/Adminreportpage" element={<Report />} />
          <Route path="/Inpatientconversion" element={<Inpatientconversion />} />
          <Route path="/CaseSheetListPage" element={<CaseSheetList />} />
          <Route path="/DischargePatientsPage" element={<DischargePatients />} />
          <Route path="/BulkAdmissions" element={<BulkAdmissions/>} />
          <Route path="/ICD" element={<ICDCodeManager />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
