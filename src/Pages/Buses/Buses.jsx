import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDateMain } from '../../Utils/timeFormater';

const days = Array.from({ length: 14 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    label: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
  };
});

const promoData = [
  {
    title: "Top Rated Buses",
    description: "Explore our highest rated buses on this route",
    buttonText: "See Buses →",
    icon: "⭐",
    bgClass: "green-card",
  },
  {
    title: "MyDeals",
    description: "Upto ₹100 OFF on select buses",
    buttonText: "See Buses →",
    icon: "💸",
    bgClass: "blue-card",
  },
  {
    title: "Last Minute Offers",
    description: "Grab deals on last-minute bookings",
    buttonText: "Grab Now →",
    icon: "⚡",
    bgClass: "blue-card",
  },
];

const Buses = () => {
  const buses = useSelector((state) => state.search?.results || []);
  const firstBus = buses.length > 0 ? buses[0] : null;
  const [selectedSeat, setSelectedSeat] = useState(null);

  function formatTimeToAMPM(time24) {
    const cleanTime = time24.replace(/\s?(AM|PM)$/i, '');
    const [hourStr, minute] = cleanTime.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
  }

  const scrollRef = useRef();
  const [isAtStart, setIsAtStart] = useState(true);

  const scroll = (direction) => {
    const scrollAmount = 120;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    setIsAtStart(scrollRef.current.scrollLeft === 0);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);
  const [expandedBusId, setExpandedBusId] = useState(null);

  const handleSelectSeats = (busId) => {
    setExpandedBusId(prevId => (prevId === busId ? null : busId));
  };

  const handleSeatSelect = (seatId) => {
    setSelectedSeat((prev) => (prev === seatId ? null : seatId));
  };


  const busDetails = {
    lowerBerths: Array.from({ length: 10 }, (_, i) => ({
      type: 'HORIZONTAL_SLEEPER',
      price: 2800,
      id: `L${i + 1}`
    })),
    upperBerths: Array.from({ length: 15 }, (_, i) => ({
      type: 'HORIZONTAL_SLEEPER',
      price: 2800,
      id: `U${i + 1}`
    })),
    pickupPoints: [
      {
        time: "19:30, 31 Jul",
        location: "Morigate",
        description: "54, Gokhle Market, Behind Tees Hazari Court, Delhi 9424388888,011-40114221"
      }
    ],
    dropPoints: [
      {
        time: "05:50, 02 Aug",
        location: "Thane",
        description: "Bus will change at Indore with 10 hour layover"
      },
      {
        time: "06:00, 02 Aug",
        location: "Vikhroli",
        description: "Vikroli (bus will change at Indore with 10 hour layover)"
      },
      {
        time: "06:05, 02 Aug",
        location: "Chembur",
        description: "Chembur (bus will change at Indore with 10 hour layover)"
      },
      {
        time: "07:35, 02 Aug",
        location: "Borivali East",
        description: "National park (bus will change at Indore with 10 hour layover)"
      }
    ]
  };


  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-3">
          <h5>{buses.length} Buses Found</h5>
          <div className="card shadow-lg">
            <div className="card-body">

            </div>
          </div>
        </div>

        <div className="col-12 col-md-9">
          {firstBus ? (
            <h5>{firstBus.from_city} → {firstBus.to_city} | {formatDateMain(firstBus.journey_date)}</h5>
          ) : (
            <h5>{null}</h5>
          )}
          <div className="date-slider-container d-flex align-items-center my-3">
            {!isAtStart && (
              <button className="nav-btn btn btn-light me-2" onClick={() => scroll('left')}>
                &lt;
              </button>
            )}
            <div
              className="date-scroll-wrapper flex-grow-1 overflow-auto d-flex"
              ref={scrollRef}
              style={{ scrollbarWidth: 'none' }}
            >
              {days.map((day, index) => (
                <div className="date-card text-center flex-shrink-0 px-3" key={index} style={{ minWidth: '100px' }}>
                  <div className="date fw-semibold">{day.label}</div>
                  <div className="weekday text-muted" style={{ fontSize: '0.85rem' }}>{day.weekday}</div>
                </div>
              ))}
            </div>
            <button className="nav-btn btn btn-light ms-2" onClick={() => scroll('right')}>
              &gt;
            </button>
          </div>

          {/* Promo Cards */}
          <div className="promo-cards-container d-flex flex-nowrap overflow-auto gap-3 mt-4">
            {promoData.map((promo, index) => (
              <div className={`promo-card ${promo.bgClass} p-3 rounded shadow-sm`} key={index} style={{ minWidth: '200px' }}>
                <div>
                  <h6 className="fw-semibold text-secondary">{promo.title}</h6>
                  <p className="mb-2">{promo.description}</p>
                  <button className="btn btn-sm btn-primary">{promo.buttonText}</button>
                </div>
                <div className="promo-icon fs-2">{promo.icon}</div>
              </div>
            ))}
          </div>

          {/* Table Header */}
          <div className="card shadow-sm mt-3">
            <div className="card-body">
              <div className="row text-center">

                <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
                  <h6 className="fw-semibold text-secondary mb-0">Departure</h6>
                </div>

                <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
                  <h6 className="fw-semibold text-secondary mb-0">Duration</h6>
                </div>

                <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
                  <h6 className="fw-semibold text-secondary mb-0">Arrival</h6>
                </div>

                <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
                  <h6 className="fw-semibold text-secondary mb-0">Bus Operator</h6>
                </div>

                <div className="col-12 col-md-4 d-flex align-items-center justify-content-md-end justify-content-center text-end">
                  <h6 className="fw-semibold text-secondary mb-0">Price</h6>
                </div>

              </div>
            </div>
          </div>

          {/* Bus Rows */}
          {buses.map((bus) => {
            const isExpanded = expandedBusId === bus.id;
            return (
              <div className="card shadow-sm mt-3 mb-3" key={bus.id}>
                <div className="card-body">
                  <div className="row text-center align-items-center">

                    {/* Departure */}
                    <div className="col-6 col-md-2 d-flex flex-column">
                      <h5 className="mb-0 fw-bold">{formatTimeToAMPM(bus.departure_time)}</h5>
                      <small className="text-muted">{bus.from_city}</small>
                    </div>

                    {/* Duration */}
                    <div className="col-6 col-md-2 d-flex flex-column justify-content-center">
                      <small>-</small>
                    </div>

                    {/* Arrival */}
                    <div className="col-6 col-md-2 d-flex flex-column align-items-center">
                      <h5 className="mb-0 fw-bold">{formatTimeToAMPM(bus.arrival_time)}</h5>
                      <small className="text-muted">{bus.to_city}</small>
                    </div>

                    {/* Bus Operator */}
                    <div className="col-6 col-md-2 d-flex flex-column align-items-center">
                      <h6 className="mb-0 fw-bold">{bus.bus_name}</h6>
                    </div>

                    {/* Price & Button */}
                    <div className="col-12 col-md-4 d-flex flex-column align-items-end text-end">
                      <small className="d-block mb-2">Starting From</small>
                      <h4 className="text-danger fw-bold mb-3">₹{parseFloat(bus.price).toFixed(0)}</h4>
                      <button
                        className="btn btn-warning rounded-pill px-4"
                        onClick={() => handleSelectSeats(bus.id)}
                      >
                        {isExpanded ? "Hide Seats" : "Select Seats"}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Footer */}
                <div className="card-footer d-flex justify-content-center justify-content-md-start gap-4 pt-3 border-0">
                  <small><span className="text-primary">●</span> Boarding & Dropping Point</small>
                  <small><span className="text-primary">●</span> Cancellation Policy</small>
                </div>
                {isExpanded && (
                  <div className="card-body border-top pt-3">
                    <div className="row">
                      {/* Left – Seats */}
                      <div className="col-md-6 mb-3">
                        <div className="berth-title">Lower Berth</div>
                        <div className="seat-grid mb-3">
                          {busDetails.lowerBerths.map((seat, idx) => (
                            <div
                              key={idx}
                              className={`seat-slot ${selectedSeat === seat.id ? 'selected' : ''}`}
                              onClick={() => handleSeatSelect(seat.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              {seat.id}
                            </div>

                          ))}
                        </div>

                        <div className="berth-title">Upper Berth</div>
                        <div className="seat-grid">
                          {busDetails.upperBerths.map((seat, idx) => (
                            <div
                              key={idx}
                              className={`seat-slot ${selectedSeat === seat.id ? 'selected' : ''}`}
                              onClick={() => handleSeatSelect(seat.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              {seat.id}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right – Boarding / Dropping */}
                      <div className="col-md-6">
                        <div className="berth-title">Boarding Points</div>
                        <ul className="list-unstyled mb-3">
                          {busDetails.pickupPoints.map((point, idx) => (
                            <li key={idx}>
                              <strong>{point.time}</strong> - {point.location}
                              <br />
                              <small>{point.description}</small>
                            </li>
                          ))}
                        </ul>

                        <div className="berth-title">Drop Points</div>
                        <ul className="list-unstyled">
                          {busDetails.dropPoints.map((point, idx) => (
                            <li key={idx}>
                              <strong>{point.time}</strong> - {point.location}
                              <br />
                              <small>{point.description}</small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}


        </div>
      </div>
    </div>
  );
};

export default Buses;
