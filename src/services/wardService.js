import api from "../utils/api"; // Common API instance

// 1. Get all wards
export const getAllWards = async () => {
  try {
    const response = await api.get("/accomdation/wards");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw new Error("Error fetching wards");
  }
};

// 2. Get all rooms
export const getAllRooms = async () => {
  try {
    const response = await api.get("/accomdation/rooms");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Error fetching rooms");
  }
};

// 3. Get all beds
export const getAllBeds = async () => {
  try {
    const response = await api.get("/accomdation/beds");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching beds:", error);
    throw new Error("Error fetching beds");
  }
};

// 4. Get rooms by ward ID
export const getRoomsByWard = async (wardId) => {
  try {
    const response = await api.get(`/accomdation/rooms-by-ward/${wardId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching rooms by ward:", error);
    throw new Error("Error fetching rooms by ward");
  }
};

// 5. Get beds by room ID
export const getBedsByRoom = async (roomId) => {
  try {
    const response = await api.get(`/accomdation/beds-by-room/${roomId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching beds by room:", error);
    throw new Error("Error fetching beds by room");
  }
};



export const getBedById = async (bedId) => {
    try {
      const response = await api.get(`/accomdation/beds/${bedId}`);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching bed:", error);
      throw new Error(error.response?.data?.message || "Error fetching bed details");
    }
  };
  
  // Bed Status Management
  export const occupyBed = async (bedId) => {
    try {
      const response = await api.patch(`/accomdation/occupy/${bedId}`);
      return response.data;
    } catch (error) {
      console.error("Error occupying bed:", error);
      throw new Error(error.response?.data?.message || "Failed to occupy bed");
    }
  };
  
  export const vacateBed = async (bedId) => {
    try {
      const response = await api.patch(`/accomdation/vacate/${bedId}`);
      return response.data;
    } catch (error) {
      console.error("Error vacating bed:", error);
      throw new Error(error.response?.data?.message || "Failed to vacate bed");
    }
  };
  
