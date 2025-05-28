import api from "../utils/api"; // Axios instance with base URL

// 1. Create a new admission
export const createAdmission = async (admissionData) => {
  try {
    const response = await api.post("/adms", admissionData);
    return response.data;
  } catch (error) {
    console.error("Error creating admission:", error);
    throw new Error("Failed to create admission");
  }
};

// 2. Get all admissions
export const getAllAdmissions = async () => {
  try {
    const response = await api.get("/adms");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching admissions:", error);
    throw new Error("Failed to fetch admissions");
  }
};

// 3. Get admission by ID
export const getAdmissionById = async (id) => {
  try {
    const response = await api.get(`/adms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admission:", error);
    throw new Error("Failed to fetch admission by ID");
  }
};

// 4. Update an admission
export const updateAdmission = async (id, updatedData) => {
  try {
    const response = await api.put(`/adms/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating admission:", error);
    throw new Error("Failed to update admission");
  }
};

// 5. Delete an admission
export const deleteAdmission = async (id) => {
  try {
    const response = await api.delete(`/adms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting admission:", error);
    throw new Error("Failed to delete admission");
  }
};





export const getAllAdmissionsWithDetails = async () => {
    try {
      const response = await api.get("/adms/fetchalladminfo");
      return response.data || [];
    } catch (error) {
      console.error("Frontend Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch admission");
    }
  };


// 7. Bulk admission
export const createBulkAdmissions = async (bulkData) => {
    try {
      const response = await api.post("/adms/bulk", bulkData);
      return response.data;
    } catch (error) {
      console.error("Error creating bulk admissions:", error);
      throw error;
    }
  };
  

  // 8. Get available beds count by ward
export const getAvailableBedsCount = async (wardId) => {
    try {
      const response = await api.get(`/accomdation/${wardId}/available-beds`);
      return response.data?.availableBeds || 0;  
    } catch (error) {
      console.error("Error fetching available beds count:", error);
      throw error;
    }
  };




 
  











 