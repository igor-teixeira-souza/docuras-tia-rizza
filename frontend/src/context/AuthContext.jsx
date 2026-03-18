import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/api";
import { toast } from "react-hot-toast";
import LoadingScreen from "../components/ui/LoadingScreen";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      const MIN_LOADING_TIME = 1500; // 1.5 segundos (ajuste conforme desejar)
      const startTime = Date.now();

      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Tenta carregar o perfil
          const response = await authAPI.getProfile();
          setUser(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        localStorage.removeItem("token");
      } finally {
        // Calcula quanto tempo já passou
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;
        if (remaining > 0) {
          // Se ainda não atingiu o tempo mínimo, espera o restante
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
        setLoading(false);
      }
    };

    loadApp();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Login realizado com sucesso!");
      return user;
    } catch (error) {
      console.log("ERRO COMPLETO:", error.response?.data);
      toast.error(error.response?.data?.error || "Erro no login");
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      toast.success("Conta criada com sucesso! Faça o login.");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro no registro");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logout realizado");
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      setUser(response.data);
      toast.success("Perfil atualizado!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao atualizar perfil");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  if (loading) {
    return <LoadingScreen message="Preparando doceria..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
