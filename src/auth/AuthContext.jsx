import React, { createContext, useContext, useState, useEffect } from "react";

// Buat AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, id) => {
    setToken(token);
    setUserId(id);

    // Simpan ke localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);

    console.log("Login berhasil: Token dan userId disimpan di localStorage");
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    // Hapus dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    console.log("Logout berhasil: Token dan userId dihapus dari localStorage");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);

      console.log("Data dari localStorage dimuat: ", {
        savedToken,
        savedUserId,
      });
    } else {
      console.log("Tidak ada data di localStorage");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
