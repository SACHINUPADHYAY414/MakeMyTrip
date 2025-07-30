import React from "react";
import { NavLink } from "react-router-dom";

const footerData = {
  verticalMenu: [
    { name: "OUR OFFERINGS", path: "/our-offerings" },
    { name: "QUICK LINKS", path: "/quick-links" },
    { name: "POPULAR DESTINATION", path: "/popular-destination" },
    { name: "INTERNATIONAL DESTINATION", path: "/international-destination" },
    { name: "POPULAR AIRLINE", path: "/popular-airline" },
    { name: "CONNECT WITH US", path: "/connect-with-us" },
    { name: "CURRENT OPENINGS", path: "/current-openings" }
  ],
  columns: [
    {
      title: "Quick solutions for all your travel needs.",
      groups: [
        [
          { name: "Flight by City", path: "/flight-by-city" },
          { name: "Train Routes", path: "/train-routes" },
          {
            name: "New Delhi to Bengaluru Flights",
            path: "/flights/new-delhi-bengaluru"
          },
          {
            name: "Mumbai to Bengaluru Flights",
            path: "/flights/mumbai-bengaluru"
          },
          { name: "Dubai to Mumbai Flights", path: "/flights/dubai-mumbai" },
          {
            name: "Secunderabad to Vijayawada Trains",
            path: "/trains/secunderabad-vijayawada"
          },
          {
            name: "Howrah To Durgapur Trains",
            path: "/trains/howrah-durgapur"
          },
          {
            name: "Guwahati to New Jalpaiguri Trains",
            path: "/trains/guwahati-new-jalpaiguri"
          }
        ],
        [
          { name: "Lowest Airfare Calendar", path: "/lowest-airfare-calendar" },
          { name: "Holiday Packages", path: "/holiday-packages" },
          {
            name: "New Delhi to Mumbai Flights",
            path: "/flights/new-delhi-mumbai"
          },
          {
            name: "New Delhi to Bangkok Flights",
            path: "/flights/new-delhi-bangkok"
          },
          {
            name: "Kolkata to Bangkok Flights",
            path: "/flights/kolkata-bangkok"
          },
          { name: "Borivali to Surat Trains", path: "/trains/borivali-surat" },
          {
            name: "Kanpur to Mangalore Trains",
            path: "/trains/kanpur-mangalore"
          },
          { name: "Japan Tourism", path: "/tourism/japan" }
        ],
        [
          { name: "Domestic Flights", path: "/domestic-flights" },
          { name: "Hotel Directory", path: "/hotel-directory" },
          {
            name: "Mumbai to New Delhi Flights",
            path: "/flights/mumbai-new-delhi"
          },
          { name: "Mumbai to Dubai Flights", path: "/flights/mumbai-dubai" },
          {
            name: "London to New Delhi Flights",
            path: "/flights/london-new-delhi"
          },
          {
            name: "Mumbai CST to Pune Trains",
            path: "/trains/mumbai-cst-pune"
          },
          { name: "Pune to Thane Trains", path: "/trains/pune-thane" },
          { name: "Dubai Tourism", path: "/tourism/dubai" }
        ],
        [
          { name: "International Flights", path: "/international-flights" },
          {
            name: "Bengaluru to New Delhi Flights",
            path: "/flights/bengaluru-new-delhi"
          },
          { name: "New Delhi to Goa Flights", path: "/flights/new-delhi-goa" },
          {
            name: "New Delhi to Dubai Flights",
            path: "/flights/new-delhi-dubai"
          },
          { name: "Howrah to Puri Trains", path: "/trains/howrah-puri" },
          { name: "Howrah to Asansol Trains", path: "/trains/howrah-asansol" },
          { name: "Jaipur to Ajmer Trains", path: "/trains/jaipur-ajmer" }
        ]
      ]
    }
  ],
  logo: "/images/makemytrip-logo.png",
  description:
    "MakeMyTrip offers 'End to End' travel solutions including air tickets for more than 400 international and domestic airlines, hotel bookings for nearly 1 million hotels in India and abroad, cab booking with 4000+ cab operators, bus tickets with 2000+ bus operators, and railway tickets in India for all major cities.",
  appBadges: [
    { href: "#", imgSrc: "/assets/PlayStore.png", alt: "Google Play" },
    { href: "#", imgSrc: "/assets/AppStore.png", alt: "App Store" }
  ],
  qrCode: "/assets/Qr.png",
  copyright: "© 2025 MakeMyTrip. All rights reserved."
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div style={{ backgroundColor: "#468BE8", padding: "0.2rem" }}></div>
      <div className="container">
        <div className="d-none d-md-block">
          <div className="row py-3">
            <div className="col-md-2 border-end">
              <ul className="nav flex-column justify-content-center">
                {footerData.verticalMenu.map(({ name, path }, index) => (
                  <React.Fragment key={name}>
                    <li className="nav-item">
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          "nav-link d-flex align-items-center small-text" +
                          (isActive
                            ? "active text-primary small-text"
                            : " text-white-50")
                        }
                        tabIndex={0}
                      >
                        {name}
                        {name === "CURRENT OPENINGS" && (
                          <span className="badge bg-danger ms-2">NEW</span>
                        )}
                      </NavLink>
                    </li>
                    {index !== footerData.verticalMenu.length - 1 && (
                      <hr className="my-1 text-white-50" />
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            <div className="col-md-10">
              <h5 className="fw-semibold mb-2">
                {footerData.columns[0].title}
              </h5>
              <div className="row mx-1">
                {footerData.columns[0].groups.map((group, groupIdx) => (
                  <div key={groupIdx} className="col-6 col-md-3 mb-1">
                    <ul className="list-unstyled fs-6 text-white-50">
                      {group.map(({ name, path }, linkIdx) => (
                        <li key={linkIdx} className="mb-1">
                          <NavLink
                            to={path}
                            className={({ isActive }) =>
                              "nav-link d-flex align-items-center" +
                              (isActive
                                ? " active text-primary"
                                : " text-white-50")
                            }
                            tabIndex={0}
                          >
                            {name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-secondary" />

          {/* Bottom Row */}
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex flex-column align-items-start">
                <span className="fw-bold h5">MakeMyTrip</span>
                <p className="small text-white-50 mb-0">
                  {footerData.description}
                </p>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-md-end gap-4 mt-3 mt-md-0">
              <div>
                <p className="small fw-semibold mb-1">
                  Download MakeMyTrip App
                </p>
                <div className="d-flex gap-2">
                  {footerData.appBadges.map((badge, idx) => (
                    <a key={idx} href={badge.href}>
                      <img
                        src={badge.imgSrc}
                        alt={badge.alt}
                        style={{ height: "36px" }}
                        className="img-fluid"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="small fw-semibold mb-1">SCAN QR CODE</p>
                <img
                  src={footerData.qrCode}
                  alt="QR"
                  className="img-fluid"
                  style={{ height: "80px" }}
                />
              </div>
            </div>
          </div>

          <hr className="border-secondary my-1" />
        </div>

        <div className="text-center text-white d-block d-md-none py-2">
          {footerData.copyright}
        </div>
        <div className="text-center text-white d-none d-md-block py-2 pt-0">
          {footerData.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
