import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const UserEdit = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    type: "",
    password: "",
    email: "",
  });

  const isEditing = Boolean(email);

  useEffect(() => {
    if (isEditing) fetchUser();
  }, [isEditing]);

  const fetchUser = async () => {
    const users = await UserService.list();
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) setUser(foundUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await UserService.update(email, user);
    else await UserService.create(user);
    navigate("/users");
  };

  return (
    <div>
      <h2>{isEditing ? "Editar" : "Crear"} Usuario</h2>
      <form onSubmit={handleSubmit}>
        {!isEditing && (
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        )}
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="type">Tipo:</label>
          <input
            id="type"
            type="text"
            placeholder="Tipo"
            value={user.type}
            onChange={(e) => setUser({ ...user, type: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña (opcional):</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default UserEdit;
