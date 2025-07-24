import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "posts", element: <PostsPage /> },
      { path: "posts/:postId", element: <PostDetails /> },
    ],
  },
]);

export default routes;
