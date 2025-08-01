import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Signing/Login";
import Signup from "./pages/Signing/Signup";
import Upgrade from "./pages/Upgrade/Upgrade";
import NewPost from "./pages/NewPost/NewPost";
import PublicRoute from "./utils/PublicRoute";
import ProtectedRoute from "./utils/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute requiredRole="Author">
            <Homepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "sign-up",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "upgrade",
        element: <Upgrade />,
      },
      {
        path: "new-post",
        element: (
          <ProtectedRoute requiredRole="AUTHOR">
            <NewPost />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
