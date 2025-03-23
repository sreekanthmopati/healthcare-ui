import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import IPAdmissions from "./components/IPAdmissions";
import PatientDetails from "./components/PatientDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={1000} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ip-admissions" element={<IPAdmissions />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;