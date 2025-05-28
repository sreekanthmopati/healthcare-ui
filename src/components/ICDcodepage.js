import React, { useState} from "react";
import Sidebar from "./Sidebar";
import ICDCodeManager from "./ICDCodeManager";


const ICDcodepage = () => {
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
      <ICDCodeManager/>
      </div>
    </div>
  );
};

export default ICDcodepage;