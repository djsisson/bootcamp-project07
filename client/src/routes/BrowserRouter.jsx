import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Components/Error/Error";
import Posts from "../Components/Posts/Posts";
import Login from "../Components/Login/Login";
import UserProfile from "../Components/UserProfile/UserProfile";
import * as routes from "./routes.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: routes.getUserByName,
    children: [
      {
        path: "Posts",

        children: [
          {
            path: "tag/:tag",
            loader: routes.getPostsByTag,
            element: <Posts tags={true}/>,
          },
          { path: "user/:user", element: <Posts />, loader: routes.getPosts },
          {
            index: true,
            element: <Posts />,
            loader: routes.getPosts,
          },
        ],
      },
      {
        path: "Login",
        element: <Login />,
        children: [
          {
            path: ":invalid",
            element: <Login />,
          },
        ],
      },
      {
        index: true,
        element: <Posts />,
        loader: routes.getPosts,
      },
      {
        path: "User",
        children: [
          {
            path: "new/:a",
            loader: routes.getRandomUser,
            action: routes.newUser,
            element: <UserProfile newUser={true} />,
          },
          {
            path: ":username",
            loader: routes.getUserByName,
            action: routes.editUser,
            element: <UserProfile />,
          },
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      {
        path: "Tags?",
        loader: routes.getTags,
        children: [
          {
            path: "Tags/:tag",
            loader: routes.getTags,
          },
        ],
      },
    ],
  },
]);

export default router;
