import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";
const HomePage = lazy(() => import("@pages/HomePage"));
import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import ProtectedLayout from "@pages/ProtectedLayout";

import { PersistGate } from "redux-persist/integration/react";
import About from "@pages/about/About";
import Account from "@pages/account/Account";
import Courses from "@pages/courses/Courses";
import CourseDescription from "@pages/coursedescription/CourseDescription";
import Payment from "@components/Payment";
import Success from "@components/Success";
import Cancel from "@components/Cancel";
import Dashbord from "@pages/dashbord/Dashbord";
import CourseStudy from "@pages/coursestudy/CourseStudy";
import Lecture from "@pages/lecture/Lecture";
import Loading from "@components/Loading";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";

export const server = `${import.meta.env.VITE_BASE_URLL}`;

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "/courses",
            element: <Courses />,
          },
          {
            path: "/course/:id",
            element: <CourseDescription />,
          },
          {
            path: "/api/create-payment-link",
            element: <Payment />,
          },
          {
            path: "/success",
            element: <Success />,
          },
          {
            path: "/cancel",
            element: <Cancel />,
          },
          {
            path: "/:id/dashboard",
            element: <Dashbord />,
          },
          {
            path: "/course/study/:id",
            element: <CourseStudy />,
          },
          {
            path: "/lectures/:id",
            element: <Lecture />,
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashbord />,
          },
          {
            path: "/admin/course",
            element: <AdminCourses />,
          },
          {
            path: "/admin/users",
            element: <AdminUsers />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/verify-otp",
            element: <OTPVerifyPage />,
          },
          {
            path: "/forgot",
            element: <ForgotPassword />,
          },
          {
            path: "/reset-password/:token",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
