import React from "react";
import Sidebar from "./Sidebar";
import IPAdmissions from "./IPAdmissions";


const AdmissionsPage = () => {
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      <IPAdmissions/>
      </div>
    </div>
  );
};

export default AdmissionsPage;