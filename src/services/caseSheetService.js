import api from "../utils/api"; // Import the common API instance

// Fetch Case Sheet by Patient ID
export const getCaseSheet = async (patientId) => {
  const response = await api.get(`/casesheets/${patientId}`);
  return response.data;
};

// Create a new Case Sheet entry
export const createCaseSheet = async (patientId, caseSheetData) => {
  const response = await api.post(`/casesheets/${patientId}`, caseSheetData);
  return response.data;
};

// Update an existing Case Sheet
export const updateCaseSheet = async (patientId, caseSheetData) => {
  const response = await api.put(`/casesheets/${patientId}`, caseSheetData);
  return response.data;
};

// Delete a Case Sheet
export const deleteCaseSheet = async (patientId) => {
  const response = await api.delete(`/casesheets/${patientId}`);
  return response.data;
};


export const getAllCaseSheetsWithDetails = async () => {
  try {
    const response = await api.get("/casesheets/fetchallcasesheetsinfo");
    return response.data || [];
  } catch (error) {
    console.error("Frontend Error (case sheets):", error.response?.data || error.message);
    throw new Error("Failed to fetch case sheets with details");
  }
};
