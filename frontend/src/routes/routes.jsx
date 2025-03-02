import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import UsersList from "../pages/users/UsersList";
import TicketsList from "../pages/tickets/TicketsList";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DashboardLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ---- PROTECTED ROUTES ---- */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" index element={<TicketsList />} />
        <Route path="/users" index element={<UsersList />} />
      </Route>
    </Route>
  )
);
