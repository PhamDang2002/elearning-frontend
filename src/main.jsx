import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";
const HomePage = lazy(() => import("@pages/HomePage"));
const About = lazy(() => import("@pages/about/About"));
const Account = lazy(() => import("@pages/account/Account"));
const Courses = lazy(() => import("@pages/courses/Courses"));
const CourseDescription = lazy(
  () => import("@pages/coursedescription/CourseDescription"),
);
const Payment = lazy(() => import("@components/Payment"));
const Success = lazy(() => import("@components/Success"));
const Cancel = lazy(() => import("@components/Cancel"));
const Dashbord = lazy(() => import("@pages/dashbord/Dashbord"));
const CourseStudy = lazy(() => import("@pages/coursestudy/CourseStudy"));
const Lecture = lazy(() => import("@pages/lecture/Lecture"));
const AdminDashbord = lazy(() => import("./admin/Dashboard/AdminDashbord"));
const AdminCourses = lazy(() => import("./admin/Courses/AdminCourses"));
const AdminUsers = lazy(() => import("./admin/Users/AdminUsers"));
import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import ProtectedLayout from "@pages/ProtectedLayout";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@components/Loading";

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
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          />
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
