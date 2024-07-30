import axios from "axios"
/*
import { ACCESS_TOKEN } from "./constants"
import authDataManager from "./authManager"
*/
const api = axios.create({
    baseURL: "/api",
    withCredentials: true
})

api.login = async ({username, password}) => {
  try {
      const response = await api.post("/user/login/", 
        {username, password}, 
        {withCredentials: true}
      );
  
      if (response.status === 200) {
          console.log('Login successful');
        // Perform any additional login actions, such as redirecting the user
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
};

api.register = async({username, password}) => {
  try {
    await api.post("/user/register/", 
      {username, password}, 
      {withCredentials: true});
    if (response.status === 201) {
      console.log('Registration successful');
    } else {
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error during register:', error);
  }
};

api.verify = async () => {
  let result = false;
  try {
      const response = await api.post('/user/verify/',{}, 
        {withCredentials: true});
  
      if (response.status === 200) {
        console.log('Token is valid:', response.data.valid);
        result = response.data.valid;
        if (response.data.valid) {
          console.log('User ID:', response.data.user_id);
        } else {
          console.log('Token validation error:', response.data.error);
        }
      } else {
        console.error('Token validation failed');
      }
  } catch (error) {
      console.error('Error during token validation:', error);
  }
  return result;
}

api.logout = async () => {  
  try {
      const response = await api.post('/user/logout/', {}, 
        {withCredentials: true});

      if (response.status === 200) {
          console.log('Logout successful');
      } else {
          console.error('Logout failed');
      }
  } catch (error) {
      console.error('Error during logout:', error);
  }
};

api.refresh = async () => {
    try {
        const response = await api.post('/user/refresh/',{},
          {withCredentials:true});
    
        if (response.status === 200) {
          console.log('Token refreshed successfully');
          // Perform any additional actions, such as updating the UI or state
        } else {
          console.error('Token refresh failed');
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refresh(); // Make sure this function is available
          return api(originalRequest);
        } catch (err) {
          console.error('Token refresh failed');
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api