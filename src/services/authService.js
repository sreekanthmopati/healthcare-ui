import api from "../utils/api"; // Import the common API instance

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const verifySession = async () => {
  try {
    const response = await api.get("/auth/verify");
    return response.data;
  } catch (error) {
    throw new Error("Session not valid");
  }
};