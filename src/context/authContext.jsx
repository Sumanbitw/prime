import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );

  if (token) {
    console.log("token set");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(undefined, function (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.data?.message === "authorization failed"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  const login = async (email, password) => {
    try {
      const {
        data: { user, token, success, message },
      } = await axios.post("https://primeapi-backend.herokuapp.com/login", {
        email,
        password,
      });
      if (success) {
        console.log(token);
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage?.setItem("authUser", JSON.stringify(user));
        localStorage?.setItem("authToken", JSON.stringify(token));
      }
      return { user, message, success };
    } catch (error) {
      console.log(error);
      return { message: error.message, success: false };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const {
        data: { user, token, success, message },
      } = await axios.post("https://primeapi-backend.herokuapp.com/signup", {
        name,
        email,
        password,
      });
      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage?.setItem("authUser", JSON.stringify(user));
        localStorage?.setItem("authToken", JSON.stringify(token));
      }
      return { user, message, success };
    } catch (error) {
      console.log(error);
      return { message: error.message, success: false };
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("authUser");
    localStorage?.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
