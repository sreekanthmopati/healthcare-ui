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

// export const fetchDepartmentCounts = async () => {
//   try {
//     const response = await api.get("/dashboard/departments/counts"); // API call to get department counts
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching department counts:", error);
//     return { dental: 0, ent: 0, cardio: 0, derma: 0, neuro: 0, pulma: 0, 
//       gyna: 0, generalmed: 0, ortho: 0, dvl: 0, optha: 0
//      }; // Return default values in case of error
//   }
// };




export const fetchDepartmentCounts = async () => {
  try {
    const response = await api.get("/dashboard/departments/counts"); // API call to get department counts
    return response.data;
  } catch (error) {
    console.error("Failed to load admissions count by department", error);
    throw new Error("Failed to load admissions count by department");
  }
};