import React from "react";
import Sidebar from "./Sidebar";
import CaseSheetList from "./CaseSheetList";


const CaseSheetListPage = () => {
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8">
      <CaseSheetList/>
      </div>
    </div>
  );
};

export default CaseSheetListPage;