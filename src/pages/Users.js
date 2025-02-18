import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await UserService.list();
      setUsers(users);
      console.log(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await UserService.delete(email);
      fetchUsers();
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      console.log("Sesión cerrada");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <button onClick={() => navigate("/users/new")}>Agregar Usuario</button>
      <button onClick={handleLogout} style={{ float: "right" }}>
        <b> Cerrar Sesion</b>
      </button>
      <ul
        style={{ listStyle: "none", padding: 0, border: "1px solid #919191" }}
      >
        {users.map((user, index) => (
          <li
            key={user.email}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px",
              background: index % 2 === 0 ? "#ebebeb" : "#ffffff", // Alterna colores
            }}
          >
            <div>
              {user.name} ({user.email}) - {user.type}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => navigate(`/users/edit/${user.email}`)}
                disabled={user.email === "admin@spsgroup.com.br"}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(user.email)}
                disabled={user.email === "admin@spsgroup.com.br"}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
