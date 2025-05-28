import React, { useState} from "react";
import Sidebar from "./Sidebar";
import BulkAdmission from "./BulkAdmissions";


const BulkAdmissionPage = () => {
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
      <BulkAdmission/>
      </div>
    </div>
  );
};

export default BulkAdmissionPage;