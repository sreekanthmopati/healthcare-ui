import api from "../utils/api"; // Import the common API instance

export const getDashboardData = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Failed to load dashboard data", error);
    throw new Error("Failed to load dashboard data");
  }
};



export const fetchDepartmentCounts = async () => {
  try {
    const response = await api.get("/dashboard/departments/counts"); // API call to get department counts
    return response.data;
  } catch (error) {
    console.error("Failed to load admissions count by department", error);
    throw new Error("Failed to load admissions count by department");
  }
};




export const getDashboardSummary = async () => {
  try {
    const response = await api.get("/dashboard/summary");
    return response.data;
  } catch (error) {
    console.error("Failed to load dashboard summary", error);
    throw new Error("Failed to load dashboard summary");
  }
};