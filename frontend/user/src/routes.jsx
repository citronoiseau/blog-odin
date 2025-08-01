import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Signing/Login";
import Signup from "./pages/Signing/Signup";
import PostDetails from "./pages/PostDetails/PostDetails";
import PublicRoute from "./utils/PublicRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> }, // default Homepage
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
      { path: "posts/:postId", element: <PostDetails /> },
    ],
  },
];

export default routes;
