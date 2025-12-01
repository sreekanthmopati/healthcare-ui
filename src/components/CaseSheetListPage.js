import React from "react";
import Sidebar from "./Sidebar";
import CaseSheetList from "./CaseSheetList";


const CaseSheetListPage = () => {
 

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      <CaseSheetList/>
      </div>
    </div>
  );
};

export default CaseSheetListPage;