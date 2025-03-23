import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientById } from "../services/patientService";

const PatientDetails = () => {
    const { id } = useParams(); // Get patient ID from URL
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPatient = async () => {
        try {
          const data = await getPatientById(id);
          setPatient(data);
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPatient();
    }, [id]);
  
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (!patient) return <p className="text-center text-red-500">Patient not found.</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Patient Info Header */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <p className="text-gray-600">
              {patient.gender} | {patient.age} Years
            </p>
            <p className="text-gray-600">IP: {patient.ip} | UMR: {patient.umr}</p>
            <p className="text-gray-600">Category: {patient.category}</p>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <p>Admission Date: {patient.admissionDate}</p>
          <p>Doctor: {patient.doctor}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2 flex-wrap">
        <button className="bg-gray-200 px-4 py-2 rounded-md">Anaesthesia Record</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">PACS</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">Drug Advice</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">Reports</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">Track</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">Initiate Discharge</button>
      </div>

      {/* Sections */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-green-500 text-white p-2 rounded-t-md">Doctor Progress Notes</div>
        <div className="bg-red-500 text-white p-2 rounded-t-md">Medications</div>
        <div className="border p-4 col-span-1">{patient.doctorNotes || "No Records"}</div>
        <div className="border p-4 col-span-1">{patient.treatmentPlan || "No Records"}</div>
        <div className="bg-orange-500 text-white p-2 rounded-t-md">Investigations</div>
        <div className="bg-teal-500 text-white p-2 rounded-t-md">Vital Signs</div>
        <div className="border p-4 col-span-1">{patient.diagnosisDetails || "No Records"}</div>
        <div className="border p-4 col-span-1">{patient.vitalSigns || "No Records"}</div>
      </div>
    </div>
  );
};

export default PatientDetails;