import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import { Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/new",
    element: (
      <PrivateRoute>
        <UserEdit />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/edit/:email",
    element: (
      <PrivateRoute>
        <UserEdit />
      </PrivateRoute>
    ),
  },
]);

export default router;
