import api from "../utils/api"; // Common API instance

// Fetch all discharge reasons
export const getDischargeReasons = async () => {
  try {
    const response = await api.get("/discharge/getlist");
    return response.data || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching discharge reasons:", error);
    throw new Error("Error fetching discharge reasons");
  }
};
