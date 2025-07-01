import App from "@/App";
import AccountPage from "@/pages/account/AccountPage";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import BookPage from "@/pages/book/BookPage";
import BorrowPage from "@/pages/borrow/BorrowPage";
import HomePage from "@/pages/Home/HomePage";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "/", Component: HomePage },
      { path: "books", Component: BookPage },
      { path: "borrow", Component: BorrowPage },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { index: true, Component: LoginPage },
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
      { path: "account", Component: AccountPage },
    ],
  },
]);

export default router;
