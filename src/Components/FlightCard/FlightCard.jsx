import React from "react";

// Lock icon SVG
const LockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="#1685d6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm9 5v7H6v-7h12z" />
  </svg>
);

const FlightCard = ({
  airline,
  flightNumber,
  departureTime,
  departureCity,
  duration,
  stops,
  arrivalTime,
  arrivalCity,
  price,
  discount,
  imageUrl,
  lockPrice,
  onClick
}) => {
  const discountedPrice = discount ? price - discount : price;

  return (
    <div
      className="card mb-3"
      style={{
        borderRadius: "12px",
        boxShadow: "0 0 8px rgba(0,0,0,0.08)",
        overflow: "hidden",
        fontFamily: "'Roboto', sans-serif"
      }}
    >
      <div>
        <div className="px-3 row align-items-center text-center text-md-start py-3">
          {/* Airline Info */}
          <div className="col-md-2 d-flex align-items-center justify-content-center justify-content-md-start">
            <img
              src={imageUrl}
              alt={airline}
              className="img-fluid me-2"
              style={{ width: 40, height: 40, objectFit: "contain" }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{airline}</div>
              <div style={{ fontSize: 12, color: "#555" }}>{flightNumber}</div>
            </div>
          </div>

          {/* Departure */}
          <div className="col-md-2">
            <div style={{ fontWeight: 700, fontSize: 20 }}>{departureTime}</div>
            <div style={{ fontSize: 12, color: "#565656" }}>{departureCity}</div>
          </div>

          {/* Duration */}
          <div className="col-md-2" style={{ color: "#565656", fontSize: 12 }}>
            <div>{duration}</div>
            <div>{stops} stop{stops !== 1 ? "s" : ""}</div>
          </div>

          {/* Arrival */}
          <div className="col-md-2">
            <div style={{ fontWeight: 700, fontSize: 20 }}>{arrivalTime}</div>
            <div style={{ fontSize: 12, color: "#565656" }}>{arrivalCity}</div>
          </div>

          {/* Price + Buttons */}
          <div className="col-md-4 text-end">
            <div
              style={{
                color: "#d84c00",
                fontWeight: 700,
                fontSize: 22,
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              ₹ {discountedPrice.toLocaleString()}
              {lockPrice && (
                <span
                  title={`Lock Price: ₹${lockPrice}`}
                  style={{ marginLeft: 6, verticalAlign: "middle" }}
                >
                  <LockIcon />
                </span>
              )}
            </div>

            {discount && (
              <div
                style={{
                  textDecoration: "line-through",
                  fontSize: 12,
                  color: "#999"
                }}
              >
                ₹ {price.toLocaleString()}
              </div>
            )}

            <div className="d-flex justify-content-end align-items-center mt-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="btn"
                style={{
                  backgroundColor: "#f60",
                  color: "#fff",
                  borderRadius: "24px",
                  fontWeight: "bold",
                  padding: "6px 20px"
                }}
              >
                BOOK NOW
              </button>

              <button
                className="btn btn-outline-primary btn-sm"
                style={{ borderRadius: "20px", fontSize: "14px" }}
              >
                + More Fare
              </button>
            </div>
          </div>
        </div>

        {/* Discount Notice */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: "#fff7e6",
            borderLeft: "4px solid #fcb900",
            fontSize: "14px",
            color: "#555"
          }}
        >
          BOOKNOW: Get extra Rs.{discount || 175} instant discount on this flight
        </div>

        {/* Flight Detail Link */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: "#f2f5f7",
            fontSize: "14px"
          }}
        >
          <a
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            style={{ color: "#1685d6", textDecoration: "none" }}
          >
            Flight Detail
          </a>

          <div className="collapse mt-2" id="collapseExample">
            <div className="card card-body">
              {/* Example Detail Content */}
              <p><strong>Baggage:</strong> 15kg Check-in, 7kg Cabin</p>
              <p><strong>Refund:</strong> Partially Refundable</p>
              <p><strong>Aircraft:</strong> Airbus A320</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
