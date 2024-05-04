import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Components/Error/Error";
import Posts from "../Components/Posts/Posts";
import Login from "../Components/Login/Login";
import UserProfile from "../Components/UserProfile/UserProfile";
import { getRandomUser, getUserByName } from "./user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Posts",
        element: <Posts />,
      },
      {
        path: "Login",
        element: <Login/>,
        children: [
          {
            path: ":invalid",
            element: <Login/>,
          }
        ]
      },
      {
        path: "User",
        children: [
          {
            path: "new",
            loader: getRandomUser,
            element: <UserProfile />,
          },
          {
            path: ":username",
            loader: getUserByName,
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
