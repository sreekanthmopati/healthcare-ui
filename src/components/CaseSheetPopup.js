import React from "react";

const CaseSheetPopup = ({ caseSheet, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-2xl w-[75%] max-w-[900px] h-[60vh] overflow-y-auto border border-gray-300">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Patient Case Sheet</h2>

        {/* Case Sheet Content */}
        <div className="text-gray-700 bg-white p-4 rounded-lg shadow-md overflow-auto h-[70%]">
          {caseSheet ? (
            <p className="whitespace-pre-wrap">{caseSheet}</p>
          ) : (
            <p className="text-gray-500 italic">No Case Sheet Available</p>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseSheetPopup;
