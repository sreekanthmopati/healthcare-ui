// src/services/DepartmentsService.js
import api from "../utils/api"; // Common API instance

export const getDepartments = async () => {
  try {
    const response = await api.get("/depts/departments"); // Fetch all departments
    return response.data || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error("Error fetching departments");
  }
};

export const getDiagnosesForDepartment = async (departmentId) => {
  try {
    const response = await api.get(`/depts/diagnoses/${departmentId}`); // Fetch diagnoses for a specific department
    return response.data || [];
  } catch (error) {
    console.error("Error fetching diagnoses for department:", error);
    throw new Error("Error fetching diagnoses");
  }
};

export const getAllDiagnoses = async () => {
  try {
    const response = await api.get("/depts/diagnoses"); // Fetch all diagnoses
    return response.data || [];
  } catch (error) {
    console.error("Error fetching all diagnoses:", error);
    throw new Error("Error fetching diagnoses");
  }
};
