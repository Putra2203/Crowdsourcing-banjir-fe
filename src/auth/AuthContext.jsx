import React, { createContext, useContext, useState, useEffect } from "react";

// Buat AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = (token, id, username) => {
    setToken(token);
    setUserId(id);
    setUserName(username);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    const savedUserName = localStorage.getItem("username");

    if (savedToken && savedUserId && savedUserName) {
      setToken(savedToken);
      setUserId(savedUserId);
      setUserName(savedUserName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
