import React from "react";

const WhyBookWithUs = () => {
  return (
    <div className="container py-3">
      <h2 className="fw-bold text-center mb-5">Why book with us?</h2>

      <div className="row text-center mb-2 position-relative">
        {/* Feature 1 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://images.emtcontent.com/bus-img/new/ticket-charges.svg"
            alt="Lowest Ticket Charges"
            className="mb-3"
          />
          <h5 className="fw-bold">Lowest Ticket Charges</h5>
          <p className="text-muted small fw-semibold">
            Grab huge discounts and cashbacks on your bus booking with
            EaseMyTrip.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://images.emtcontent.com/bus-img/new/operators.svg"
            alt="3999+ Bus Operators"
            className="mb-2"
          />
          <h5 className="fw-bold">3999+ Bus Operators</h5>
          <p className="text-muted small fw-semibold">
            Leverage our partnerships with over 3999 bus operators for a
            hassle-free journey.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://images.emtcontent.com/bus-img/new/Seamless.svg"
            alt="Seamless "
            className="mb-2"
          />
          <h5 className="fw-bold">Seamless Booking</h5>
          <p className="text-muted small fw-semibold">
            Our user-friendly platform makes it easy for customers to book their
            bus tickets.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://images.emtcontent.com/bus-img/new/Users.svg"
            alt="Trusted by 20K+ Users"
            className="mb-2"
          />
          <h5 className="fw-bold">Trusted by 20K+ Users</h5>
          <p className="text-muted small fw-semibold">
            20K+ users have trusted and enjoyed our seamless bus booking
            service.
          </p>
        </div>
      </div>

      {/* Carousel (you can plug in react-slick or just use Bootstrap Carousel if needed) */}
      <div className="row">
        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">
                Verified
              </span>
            </div>
            <h6 className="fw-bold">Need more bank coupon for ...</h6>
            <p className="small text-muted mb-0">
              Need more bank coupon for discount.
            </p>
            <span className="text-muted small fw-semibold">
              customer, 6 hours ago
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">
                Verified
              </span>
            </div>
            <h6 className="fw-bold">Amazing and appreciated❤️...</h6>
            <p className="small text-muted mb-0">Thank you so much</p>
            <span className="text-muted small fw-semibold">
              customer, 7 hours ago
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">
                Verified
              </span>
            </div>
            <h6 className="fw-bold">My case has been resolved p...</h6>
            <p className="small text-muted mb-0">Many thanks</p>
            <span className="text-muted small fw-semibold">
              Ayo Oye, 7 hours ago
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">
                Verified
              </span>
            </div>
            <h6 className="fw-bold">Got the deal at best price</h6>
            <p className="small text-muted mb-0">Got the deal at best price</p>
            <span className="text-muted small fw-semibold">
              Arun, 8 hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBookWithUs;
