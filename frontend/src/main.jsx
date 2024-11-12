import { createRoot } from "react-dom/client";
import "./index.css";
import NotFound from "./Pages/NotFound.jsx";
import Layout from "./Layout.jsx";
import Landing from "./Pages/Landing.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import { PrivateRoute } from "./Utils/PrivateRoute.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="login/" element={<Login />} />
      <Route path="dashboard/" element={<PrivateRoute />}>
        <Route index element={<Dashboard />}></Route>
      </Route>
      <Route path="admin-dashboard/" element={<PrivateRoute />}>
        <Route index element={<AdminDashboard />}></Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
