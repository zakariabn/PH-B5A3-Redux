import App from "@/App";
import AccountPage from "@/pages/account/AccountPage";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import BookPage from "@/pages/book/BookPage";
import CreateBook from "@/pages/book/create-book/CreateBook";
import UpdateBook from "@/pages/book/update-book/UpdateBook";
import BorrowBookPage from "@/pages/borrow/borrow-book/BorrowBookPage";
import BorrowSummaryPage from "@/pages/borrow/summary/BorrowSummaryPage";
import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: NotFoundPage,
    children: [
      { index: true, Component: HomePage },
      { path: "/", Component: HomePage },
      { path: "home", Component: HomePage },
      { path: "all-book", Component: BookPage },
      { path: "book/create", Component: CreateBook },
      { path: "book/update/:bookId", Component: UpdateBook },
      { path: "borrow-summary", Component: BorrowSummaryPage },
      { path: "borrow/:bookId", Component: BorrowBookPage },
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
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default router;
