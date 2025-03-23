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