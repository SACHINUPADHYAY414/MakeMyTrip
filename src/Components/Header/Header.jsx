import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../Redux/store";
import { CLEAR_LOGIN_DATA } from "../../Redux/authSlice";
import { IoMdLogOut } from "react-icons/io";
import { useToastr } from "../Toastr/ToastrProvider";
import { SUCCESS_MSG } from "../../utils/Strings";

const navItems = [
  { label: "Buses", path: "/buses", icon: "bi-bus-front" },
  { label: "Cabs", path: "/cabs", icon: "bi-car-front" },
  { label: "Hotels", path: "/hotels", icon: "bi-building" },
  { label: "Flights", path: "/flights", icon: "bi-airplane" },
  { label: "Trains", path: "/trains", icon: "bi-train-front" },
];

const Header = () => {
  const dispatch = useDispatch();
  const { customToast } = useToastr();
  const user = useSelector((state) => state.login?.login_data?.user);
  console.log("user", user)
  const loginData = useSelector((state) => state.login?.login_data);
  const isLoggedIn = !!loginData?.token;
  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("offcanvasMenu");
    if (offcanvasEl) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    dispatch({ type: CLEAR_LOGIN_DATA });
    persistor.purge();
    customToast({
      severity: "success",
      summary: SUCCESS_MSG,
      detail: "Logout successful.",
      life: 3000,
      sticky: false,
      closable: true,
    });
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <span className="navbar-brand fw-bold h4">
          <NavLink to="/" className="text-decoration-none text-dark">
            MakeMyTrip
          </NavLink>
        </span>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasMenu"
          aria-controls="offcanvasMenu"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-start d-lg-none"
          tabIndex="-1"
          id="offcanvasMenu"
          aria-labelledby="offcanvasMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasMenuLabel">
              {user?.first_name} {user?.last_name}
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {navItems.map(({ label, path, icon }) => (
                <li key={path} className="nav-item mb-2">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      "nav-link d-flex align-items-center" +
                      (isActive ? " active text-primary" : "")
                    }
                    onClick={closeOffcanvas}
                  >
                    <i className={`bi ${icon} me-2 fs-5`}></i>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {isLoggedIn ? (
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                cursor: 'pointer',
                zIndex: 1000,
              }}
              onClick={handleLogout}
            >
              <IoMdLogOut size={28} color="#0d6efd" />
            </div>
          ) : (
            <button className="btn btn-outline-primary" onClick={handleLoginClick}>
              Login
            </button>
          )}
        </div>


        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end align-items-center">
          <ul className="navbar-nav me-3">
            {navItems.map(({ label, path, icon }) => (
              <li key={path} className="nav-item">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    "nav-link px-3 d-flex align-items-center" +
                    (isActive ? " active text-primary" : "")
                  }
                >
                  <i className={`bi ${icon} me-2 fs-5`}></i>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                type="button"
                id="userMenuButtonDesktop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="me-2" />
                {user?.first_name} {user?.last_name}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userMenuButtonDesktop"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button className="btn btn-outline-primary" onClick={handleLoginClick}>
              Login
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Header;
