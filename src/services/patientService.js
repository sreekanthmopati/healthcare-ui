import api from "../utils/api"; // Import the common API instance

export const getPatients = async (departmentName) => {
  try {
    const response = await api.get("/patients", {
      params: departmentName ? { departmentName } : {}, // Pass query parameters
    });
    return response.data || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw new Error("Error fetching patients");
  }
};

export const getPatientWithRecords = async (id) => {
  try {
    const response = await api.get(`/patients/${id}`);
    console.log("Fetching Medical Records - Query Condition:", response);
    return response.data||[];
  } catch (error) {
    console.error("Failed to fetch patient details:", error);
    throw new Error("Failed to fetch patient details");
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await api.post("/patients/create", patientData); // Send the POST request to the server
    return response.data; // Return the response data (newly created patient)
  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error("Error creating patient");
  }
};





export const getTodaysPatientsByDepartment = async () => {
  try {
    const response = await api.get("/patients/todays-patient-counts");
    return response.data || {};
  } catch (error) {
    console.error("Error fetching today's patients:", error);
    throw error;
  }
};

