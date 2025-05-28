// components/Sidebar.js
import React, { useState} from "react";
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';


const Report = () => {
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedYear, setSelectedYear] = useState('2025');
  
    // Sample data - in a real app, this would come from an API
    const reportData = {
      'Jan-25': {
        'TOTAL OUT PATIENTS': 14138,
        'DAILY AVG OUT PATIENTS (WORKING DAYS ONLY)': 456.0645161,
        'TOTAL ADMISSIONS': 938,
        'DAILY AVG ADMISSIONS': 30.25806452,
        'TOTAL DISCHARGES': 912,
        'DAILY AVG DISCHARGES': 29.41935484,
        'AVERAGE LENGTH OF STAY(TO)': 2.004264392,
        'TOTAL DEATHS': 5,
        'IP DEATHS': 1,
        'OP DEATHS': 0,
        'BROUGHT DEATHS': 4,
        '<48 HOURS': 4,
        '>48 HOURS': 1,
        'MLC (IP&OP)': 'IP-24 &OP-45',
        'BIRTHS': 63,
        'LSCS': 27,
        'NORMALVAGINAL DELIVERIES': 36,
        'ER LAMA': 21,
        'TOTAL IN PATIENT DAYS': 2083,
        'BED TURN OVER RATE(TOT NO)': 1.275524476,
        'BED OCCUPANCY RATE': 8.4818,
        'GROSS DEATH RATE': 0.109649123,
        'MORTALITY RATE': 0.106609808,
      },
      'Feb-25': {
        'TOTAL OUT PATIENTS': 13854,
        'DAILY AVG OUT PATIENTS (WORKING DAYS ONLY)': 494.7857143,
        'TOTAL ADMISSIONS': 767,
        'DAILY AVG ADMISSIONS': 27.39285714,
        'TOTAL DISCHARGES': 724,
        'DAILY AVG DISCHARGES': 25.85714286,
        'AVERAGE LENGTH OF STAY(TO)': 2.661016949,
        'TOTAL DEATHS': 4,
        'IP DEATHS': 1,
        'OP DEATHS': 0,
        'BROUGHT DEATHS': 3,
        '<48 HOURS': 3,
        '>48 HOURS': 1,
        'MLC (IP&OP)': 'IP-20 &OP-50',
        'BIRTHS': 62,
        'LSCS': 33,
        'NORMALVAGINAL DELIVERIES': 29,
        'ER LAMA': 19,
        'TOTAL IN PATIENT DAYS': null, // Missing in original data
        'BED TURN OVER RATE(TOT NO)': 1.012587413,
        'BED OCCUPANCY RATE': 10.194,
        'GROSS DEATH RATE': 0.138121547,
        'MORTALITY RATE': 0.130378096,
      }
    };
  
    // Get all metrics/descriptions
    const descriptions = Object.keys(reportData['Jan-25']);
  
    // Filter data based on selections
    const filteredData = selectedMonth === 'all' 
      ? reportData 
      : { [selectedMonth]: reportData[selectedMonth] };
  
    // Prepare data for export
    const prepareExportData = () => {
      const headers = ['Description', ...Object.keys(filteredData)];
      const data = descriptions.map(desc => {
        const row = { Description: desc };
        Object.keys(filteredData).forEach(month => {
          row[month] = filteredData[month][desc];
        });
        return row;
      });
      return { headers, data };
    };
  
    // Handle Excel export
    const exportToExcel = () => {
      const { headers, data } = prepareExportData();
      
      const ws = XLSX.utils.json_to_sheet([headers, ...data.map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[header] || '';
        });
        return obj;
      })], { skipHeader: true });
      
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Medical Report');
      XLSX.writeFile(wb, 'medical_report.xlsx');
    };
  
    // Handle CSV export
    const { headers, data } = prepareExportData();
    const csvData = [
      headers,
      ...data.map(row => headers.map(header => row[header] || ''))
    ];

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          COMPARATIVE REPORT OF PROFESSIONAL
        </h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <select
              id="month"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              <option value="Jan-25">January 2025</option>
              <option value="Feb-25">February 2025</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          
          <div className="flex items-end gap-2">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Export Excel
            </button>
            
            <CSVLink 
              data={csvData} 
              filename="medical_report.csv"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DESCRIPTION
                </th>
                {Object.keys(filteredData).map(month => (
                  <th key={month} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {descriptions.map((desc, idx) => (
                <tr key={desc} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {desc}
                  </td>
                  {Object.keys(filteredData).map(month => (
                    <td key={`${month}-${desc}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {filteredData[month][desc] !== null && filteredData[month][desc] !== undefined 
                        ? (typeof filteredData[month][desc] === 'number' 
                            ? filteredData[month][desc].toLocaleString() 
                            : filteredData[month][desc])
                        : 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
