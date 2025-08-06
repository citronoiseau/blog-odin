import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Signing/Login";
import Signup from "./pages/Signing/Signup";
import Upgrade from "./pages/Signing/Upgrade";
import PostForm from "./pages/PostForm/PostForm";
import PublicRoute from "./utils/PublicRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import PostDetails from "./pages/PostDetails/PostDetails";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute requiredRole="AUTHOR">
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
            <PostForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:postId",
        element: (
          <ProtectedRoute requiredRole="AUTHOR">
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:postId/edit",
        element: (
          <ProtectedRoute requiredRole="AUTHOR">
            <PostForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
