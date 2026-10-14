import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Components/About";
import NotFound from "./Components/NotFound";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Policy from "./Pages/Policy";
import Contact from "./Pages/Contact";
import AuthContextProvider, { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedRouteAuth from "./Components/ProtectedRouteAuth";
import Notifications from "./Components/Notifications/Notifications";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import PostDetails from "./Components/Posts/PostDetails";
import ThemeContextProvider from "./Context/ThemeContext";
import { useNetworkState } from "react-use";
import Offline from "./Components/Offline/Offline";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: "home",
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: "contact",
        element: <ProtectedRoute><Contact /></ProtectedRoute>,
      },
      {
        path: "policy",
        element: <ProtectedRoute><Policy /></ProtectedRoute>,
      },
      {
        path: "about",
        element: <ProtectedRoute><About /></ProtectedRoute>,
      },
      {
        path: "login",
        element: <ProtectedRouteAuth><Login /></ProtectedRouteAuth>,
      },
      {
        path: "register",
        element: <ProtectedRouteAuth><Register /></ProtectedRouteAuth>,
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "*",
        element: <ProtectedRoute><NotFound /></ProtectedRoute>,
      },
    {
      path: "notifications",
     
     element: <ProtectedRoute><Notifications /></ProtectedRoute>, 
    },
    {
      path: "post/:id",
      element: <ProtectedRoute><PostDetails/></ProtectedRoute>,
    },
    {
      path: "PostDetails/:id",
      element: <ProtectedRoute><PostDetails/></ProtectedRoute>,
    }
    ],
  },
]);

export default function App() {
  const {online}   = useNetworkState();
  return (
    <>
   
   {!online&&<Offline/>}
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <AuthContextProvider>
            <RouterProvider router={Routers}></RouterProvider>
          </AuthContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
    </>
  );
}
