import axios from "axios";
import { toast } from "react-toastify";


const api = axios.create({
  // baseURL: "http://localhost:5000", // Your backend API base URL
  baseURL: "https://zoey-backend-api-arbkbrgqeghga8c5.canadacentral-01.azurewebsites.net/",
});

// Add an interceptor for handling errors globally
api.interceptors.response.use(
    (response) => response, // Return the response if successful
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const message =
          status === 401 || status === 403
            ? "Session expired. Please log in again."
            : error.response?.data?.message || "Something went wrong";
        
        if(status !== 411)
            toast.error(message);

        if(status === 401 || status === 403){
            setTimeout(() => {
                toast.dismiss();
                localStorage.removeItem("token"); // Clear token
                window.location.href = "/"; // Redirect to login
              }, 1000);
        }
  
        return Promise.reject(error); // Reject the error so calling code can handle it
      }
    }
  );  

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;