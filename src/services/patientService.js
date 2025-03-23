import api from "../utils/api"; // Import the common API instance

export const getPatients = async () => {
  try {
    const response = await api.get("/patients");
    return response.data || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching admissions:", error);
    throw new Error("Error fetching admissions");
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch patient details:", error);
    throw new Error("Failed to fetch patient details");
  }
};