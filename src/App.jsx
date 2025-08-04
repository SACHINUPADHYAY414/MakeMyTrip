import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home.jsx/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import BusSearch from "./Components/BusSearch/BusSearch";
import BusSeatSelect from "./Pages/BusSeatSelect/BusSeatSelect";
import BusReviewPayment from "./Pages/BusReviewPayment/BusReviewPayment";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./Action/Api";
import ProtectedRoute from "./ProtectRoute.jsx/ProtectRoute";
import { CLEAR_LOGIN_DATA } from "./Redux/authSlice";
import { persistor } from "./Redux/store";
import { useToastr } from "./Components/Toastr/ToastrProvider";
import { OPPS_MSG, SESSION_EXPIRE } from "./Utils/strings";
import ProfileSettings from "./Pages/ProfileSetting/ProfileSeting";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

const App = () => {
  const { customToast } = useToastr();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [config] = useState(null);
  const token = useSelector((state) => state.login?.login_data?.token || "");

  // Scroll to top on route change
  useEffect(() => {
    window.loadingStart?.();
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.loadingEnd?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Set token in API headers
  useEffect(() => {
    setToken(token);
  }, [token]);

  useEffect(() => {
    if (token) {
      const logoutTimer = setTimeout(async () => {
        dispatch({ type: CLEAR_LOGIN_DATA });
        await persistor.purge();
        setToken("");
        customToast({
          severity: "error",
          summary: OPPS_MSG,
          detail: SESSION_EXPIRE,
          life: 3000,
          sticky: false,
          closable: true
        });
        navigate("/login");
      }, 15 * 60 * 1000);

      return () => {
        clearTimeout(logoutTimer);
      };
    }
  }, [token, dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout config={config} />}>
        {/* Public routes */}
        <Route index element={<Home config={config} />} />
        <Route path="buses" element={ <BusSeatSelect />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="search" element={<BusSearch />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
        {/* Protected routes */}
        <Route
          path="payment"
          element={
            <ProtectedRoute>
              <BusReviewPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="seat-booking"
          element={
            <ProtectedRoute>
              <BusSeatSelect />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile-setting"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
