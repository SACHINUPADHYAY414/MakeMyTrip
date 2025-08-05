import React from "react";
import {
  FaPlane,
  FaHotel,
  FaTrain,
  FaBus,
  FaTaxi,
  FaUmbrellaBeach,
  FaGift,
  FaGlobe
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const dashboardItems = [
  { label: "Flights", icon: <FaPlane /> },
  { label: "Hotels", icon: <FaHotel /> },
  { label: "Trains", icon: <FaTrain /> },
  { label: "Holiday", icon: <FaUmbrellaBeach /> },
  { label: "Bus", icon: <FaBus /> },
  { label: "Cabs", icon: <FaTaxi /> },
  { label: "Offers", icon: <FaGift /> },
  { label: "More", icon: <FaGlobe /> }
];

const DesktopDashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search");
  };

  return (
    <div className="container mt-3">
      <div className="row row-cols-4 g-3">
        {dashboardItems.map((item, index) => (
          <div className="col text-center" key={index}>
            <div
              className="border rounded-4 p-4 bg-white shadow-sm h-100 d-flex flex-column align-items-center justify-content-center"
              role="button"
              onClick={() => handleClick(item.label)}
              style={{ cursor: "pointer", minHeight: "150px" }}
            >
              <div className="icon-wrapper text-primary mb-2">{item.icon}</div>
              <div className="fw-semibold fs-6">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopDashboard;
