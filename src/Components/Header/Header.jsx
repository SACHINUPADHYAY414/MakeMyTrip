import { useEffect, useState } from "react";
import {
  FaPlane,
  FaHotel,
  FaBus,
  FaTrain,
  FaTaxi,
  FaUserFriends,
  FaGlobe,
  FaTags,
  FaSignOutAlt
} from "react-icons/fa";
import { GiAirBalloon } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../Redux/store";
import { CLEAR_LOGIN_DATA } from "../../Redux/authSlice";
import { IoMdLogOut } from "react-icons/io";
import { useToastr } from "../Toastr/ToastrProvider";
import { SUCCESS_MSG } from "../../Utils/strings";
import { RiAccountCircleLine } from "react-icons/ri";
import * as bootstrap from "bootstrap";

const NavbarEMT = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const dispatch = useDispatch();
  const { customToast } = useToastr();
  const user = useSelector((state) => state.login?.login_data?.user);

  const loginData = useSelector((state) => state.login?.login_data);
  const isLoggedIn = !!loginData?.token;

  const navigate = useNavigate();
  const handleLoginClick = () => {
    closeOffcanvas();
    navigate("/login");
  };

  const handleRegisterClick = () => {
    closeOffcanvas();
    navigate("/register");
  };

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    bsOffcanvas?.hide();
  };

  const handleProfileSetting = () => {
    navigate("/profile-setting");
  };
  const handleLogout = () => {
    dispatch({ type: CLEAR_LOGIN_DATA });
    persistor.purge();
    closeOffcanvas();
    customToast({
      severity: "success",
      summary: SUCCESS_MSG,
      detail: "Logout successful.",
      life: 3000,
      sticky: false,
      closable: true
    });
    navigate("/");
  };

  useEffect(() => {
    const offcanvas = document.getElementById("offcanvasNavbar");

    if (offcanvas) {
      offcanvas.addEventListener("show.bs.offcanvas", () =>
        setIsOffcanvasOpen(true)
      );
      offcanvas.addEventListener("hidden.bs.offcanvas", () =>
        setIsOffcanvasOpen(false)
      );
    }

    return () => {
      if (offcanvas) {
        offcanvas.removeEventListener("show.bs.offcanvas", () =>
          setIsOffcanvasOpen(true)
        );
        offcanvas.removeEventListener("hidden.bs.offcanvas", () =>
          setIsOffcanvasOpen(false)
        );
      }
    };
  }, []);

  return (
    <>
      <div
        className={`emt-navbar sticky-top bg-white py-2 pb-0 ${
          isOffcanvasOpen ? "z-lower" : "z-top"
        }`}
      >
        <div className="container">
          {/* Top Bar */}
          <div className="top-bar d-flex justify-content-between align-items-center py-1">
            <div className="d-flex align-items-center">
              <NavLink to="/" className="text-decoration-none">
                <h5 className="mb-0 me-2">
                  <span style={{ color: "#007bff", fontWeight: "bold" }}>
                    MakeMyTrip
                  </span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                    .com
                  </span>
                </h5>
              </NavLink>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-primary d-md-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                ☰
              </button>

              <div className="top-NavLinks d-none d-md-flex gap-3 align-items-center ms-3">
                <span>👤 EMTMate</span>
                <span>💼 EMTDesk</span>
                <span>💎 EMTRoyale</span>
                <span>✈️ Explore Bharat</span>
                <span
                  className="fw-bold mb-1"
                  style={{
                    marginRight: "-0.8rem",
                    fontSize: "1.1rem"
                  }}
                >
                  {user?.first_name} {user?.last_name}
                </span>
                {isLoggedIn ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link p-0"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <RiAccountCircleLine size={34} className="text-primary" />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center fw-bold gap-2"
                          onClick={handleProfileSetting}
                        >
                          Profile Setting
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center fw-bold gap-2"
                          onClick={handleLogout}
                        >
                          <IoMdLogOut /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Menu */}
        <div
          className="bottom-menu d-none d-lg-flex justify-content-center gap-4"
          style={{
            backgroundColor: "#F0F0FD",
            height: "2.7rem",
            alignItems: "center"
          }}
        >
          <NavLink
            to="/bus"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-bus-front"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Bus
            </span>
          </NavLink>

          <NavLink
            to="/flights"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>✈️ Flights</span>
          </NavLink>

          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-house-door"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Hotels
            </span>
          </NavLink>

          <NavLink
            to="/flight-hotel"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-tags"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Flight + Hotel
            </span>
          </NavLink>

          <NavLink
            to="/trains"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-train-front"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Trains
            </span>
          </NavLink>

          <NavLink
            to="/holidays"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-people"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Holidays
            </span>
          </NavLink>

          <NavLink
            to="/cabs"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-taxi-front"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Cabs
            </span>
          </NavLink>

          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-balloon"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Activities
            </span>
          </NavLink>

          <NavLink
            to="/visa"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>
              <i
                className="bi bi-globe"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              ></i>{" "}
              Visa
            </span>
          </NavLink>
        </div>
      </div>

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-start d-block d-md-none"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            <span style={{ color: "#007bff", fontWeight: "bold" }}>
              {user?.first_name || user?.last_name
                ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
                : "Home"}
            </span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body position-relative">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            {user ? (
              <li className="nav-item">
                <NavLink
                  to="/profile-setting"
                  onClick={closeOffcanvas}
                  className={({ isActive }) =>
                    `nav-NavLink ${
                      isActive ? "text-primary fw-semibold" : "text-secondary"
                    }`
                  }
                >
                  <img
                    src="/profilesetting.png"
                    alt="Profile settings icon"
                    className="nav-icon"
                  />
                  Profile Settings
                </NavLink>
              </li>
            ) : null}
            <li className="nav-item">
              <NavLink
                to="/flights"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaPlane /> Flights
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/hotels"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaHotel /> Hotels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/bus"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaBus /> Bus
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/trains"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaTrain /> Trains
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cabs"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaTaxi /> Cabs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/activities"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <GiAirBalloon /> Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/holidays"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaUserFriends /> Holidays
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/offers"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaTags /> Offers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/more"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaGlobe /> More
              </NavLink>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="position-absolute bottom-0 end-0 p-3">
            <FaSignOutAlt
              className="text-danger fs-4 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <div className="position-absolute bottom-0 w-100 p-3">
            <button
              className="btn btn-primary w-100"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarEMT;
