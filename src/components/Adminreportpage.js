import React, { useState} from "react";
import Sidebar from "./Sidebar";
import Report from "./Report";


const Adminreportpage = () => {
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
      <Report/>
      </div>
    </div>
  );
};

export default Adminreportpage;