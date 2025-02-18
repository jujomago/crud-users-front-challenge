import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class UserService {
  async login(email, password) {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }
  async logout() {
    localStorage.removeItem("token");
  }

  async list() {
    try {
      const { data } = await api.get("/users");
      return data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  async create(user) {
    try {
      const { data } = await api.post("/users", user);
      return data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  async delete(email) {
    try {
      await api.delete(`/users/${email}`);
    } catch (error) {
      console.error(`Error al eliminar usuario con email ${email}:`, error);
      throw error;
    }
  }

  async update(email, user) {
    try {
      const { data } = await api.put(`/users/${email}`, user);
      return data;
    } catch (error) {
      console.error(`Error al actualizar usuario con email ${email}:`, error);
      throw error;
    }
  }
}

export default new UserService();
