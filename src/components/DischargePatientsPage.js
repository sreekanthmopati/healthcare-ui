import React from "react";
import Sidebar from "./Sidebar";
import DischargePatients from "./DischargePatients";


const DischargePatientsPage = () => {
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
      <DischargePatients/>
      </div>
    </div>
  );
};

export default DischargePatientsPage;