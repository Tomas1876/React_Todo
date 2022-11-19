import { createBrowserRouter } from "react-router-dom";
import Todo from "../components/todo/Todo";
import { ROUTES } from "../constants/global";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import MainPage from "../pages/MainPage";
import TodosPage from "../pages/todo/TodosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: ROUTES.signUp.url,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.login.url,
    element: <LoginPage />,
  },
  {
    path: ROUTES.todos.url,
    element: <TodosPage />,
    children: [
      {
        path: `${ROUTES.todos.url}/:todoId`,
        element: <Todo />,
      },
    ]
  }
]);

export default router;
