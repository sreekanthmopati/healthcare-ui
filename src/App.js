import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Adminreportpage from "./components/Adminreportpage";
import PatientDetails from "./components/PatientDetails";
import { ToastContainer } from "react-toastify";
import CaseSheetPopup from "./components/CaseSheetPopup";
import PatientForm from "./components/PatientForm";
import AdmissionsPage from "./components/AdmissionsPage";
import Inpatientconversion from "./components/Inpatientconversion";
import CaseSheetListPage from "./components/CaseSheetListPage";
import DischargePatientsPage from "./components/DischargePatientsPage";
import BulkAdmissionPage from "./components/BulkAdmissionPage";
import ICDcodepage from "./components/ICDcodepage";

function App() {
  return (
    <div className="bg-white">
    <ToastContainer position="top-right" autoClose={1000} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ip-admissions" element={<AdmissionsPage />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/patient/:patientId" element={<CaseSheetPopup />} />
          <Route path="/PatientForm" element={<PatientForm />} />
          <Route path="/Adminreportpage" element={<Adminreportpage />} />
          <Route path="/Inpatientconversion" element={<Inpatientconversion />} />
          <Route path="/CaseSheetListPage" element={<CaseSheetListPage />} />
          <Route path="/DischargePatientsPage" element={<DischargePatientsPage />} />
          <Route path="/BulkAdmissions" element={<BulkAdmissionPage />} />
          <Route path="/ICD" element={<ICDcodepage />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;