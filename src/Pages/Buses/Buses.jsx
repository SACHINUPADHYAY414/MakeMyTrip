import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateMain } from "../../Utils/timeFormater";
import api from "../../Action/Api";
import { useToastr } from "../../Components/Toastr/ToastrProvider";
import { setSearchResults } from "../../Redux/Action/searchReducer";
import DayCard from "../../Components/DateCard/DateCard";

const days = Array.from({ length: 31 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return {
    label: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    weekday: date.toLocaleDateString("en-IN", { weekday: "short" }),
    value: `${yyyy}-${mm}-${dd}`
  };
});

const promoData = [
  {
    title: "Top Rated Buses",
    description: "Explore our highest rated buses on this route",
    buttonText: "See Buses →",
    icon: "⭐",
    bgClass: "green-card"
  },
  {
    title: "MyDeals",
    description: "Upto ₹100 OFF on select buses",
    buttonText: "See Buses →",
    icon: "💸",
    bgClass: "blue-card"
  },
  {
    title: "Last Minute Offers",
    description: "Grab deals on last-minute bookings",
    buttonText: "Grab Now →",
    icon: "⚡",
    bgClass: "blue-card"
  }
];

const Buses = () => {
  const buses = useSelector((state) => state.search?.results || []);
  console.log("buses", buses);
  const { customToast } = useToastr();
  const firstBus = buses.length > 0 ? buses[0] : null;
  const [selectedSeat, setSelectedSeat] = useState(null);

  function formatTimeToAMPM(time24) {
    const cleanTime = time24.replace(/\s?(AM|PM)$/i, "");
    const [hourStr, minute] = cleanTime.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  }

  const scrollRef = useRef();
  const [isAtStart, setIsAtStart] = useState(true);

  const scroll = (direction) => {
    const scrollAmount = 120;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
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
      scrollContainer.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);
  const [expandedBusId, setExpandedBusId] = useState(null);

  const handleSelectSeats = (busId) => {
    setExpandedBusId((prevId) => (prevId === busId ? null : busId));
  };

  const [selectedSeatDetails, setSelectedSeatDetails] = useState(null);

  const handleSeatSelect = (seatId, bus) => {
    setSelectedSeat(seatId);
    setSelectedSeatDetails(bus);
  };

  const busDetails = {
    lowerBerths: Array.from({ length: 10 }, (_, i) => ({
      type: "HORIZONTAL_SLEEPER",
      price: 2800,
      id: `L${i + 1}`
    })),
    upperBerths: Array.from({ length: 15 }, (_, i) => ({
      type: "HORIZONTAL_SLEEPER",
      price: 2800,
      id: `U${i + 1}`
    })),
    pickupPoints: [
      {
        time: "19:30, 31 Jul",
        location: "Morigate",
        description:
          "54, Gokhle Market, Behind Tees Hazari Court, Delhi 9424388888,011-40114221"
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
        description:
          "National park (bus will change at Indore with 10 hour layover)"
      }
    ]
  };

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (buses.length > 0 && !selectedDate) {
      const date = new Date(buses[0].journey_date);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
    }
  }, [buses]);

  const queryData = useSelector((state) => state.search?.query || {});
  const fromCity = useSelector((state) => state.search?.fromCityName);
  const toCity = useSelector((state) => state.search?.toCityName);

  const selectedDateFromQuery = queryData.date;

  useEffect(() => {
    if (!selectedDate && selectedDateFromQuery) {
      setSelectedDate(selectedDateFromQuery);
    }
  }, [selectedDateFromQuery, selectedDate]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBusesForDate = async () => {
      if (!fromCity || !toCity || !selectedDate) return;

      try {
        const query = `from=${encodeURIComponent(
          fromCity
        )}&to=${encodeURIComponent(toCity)}&date=${encodeURIComponent(
          selectedDate
        )}`;
        const response = await api.get(`/buses?${query}`);
        const buses = response.data || [];
        dispatch(setSearchResults(buses, fromCity, toCity));

        if (buses.length === 0) {
          customToast?.({
            severity: "error",
            summary: "Oops!",
            detail: "No buses found for this date.",
            life: 3000
          });
        }
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBusesForDate();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const prices = buses.map((bus) => bus.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [filters, setFilters] = useState({
    ac: false,
    nonAc: false,
    sleeper: false,
    seater: false,
    gps: false,
    departureTime: "",
    boardingPoints: [],
    price: [minPrice, maxPrice],
  });
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (buses.length > 0) {

      setPriceRange([minPrice, maxPrice]);
      setFilters((prev) => ({
        ...prev,
        price: [minPrice, maxPrice],
      }));
    }
  }, [buses]);

  const filteredBuses = buses.filter((bus) => {

    if (filters.ac && filters.nonAc) {
      // Show all buses (no filter needed)
    } else if (filters.ac && !bus.is_ac) {
      return false;
    } else if (filters.nonAc && bus.is_ac) {
      return false;
    }
    if (bus.price < filters.price[0] || bus.price > filters.price[1]) {
      return false;
    }


    if (filters.sleeper && !bus.is_sleeper) return false;
    if (filters.seater && bus.is_sleeper) return false;

    if (filters.departureTime) {
      const [hour] = bus.departure_time.split(":").map(Number);
      if (
        (filters.departureTime === "before6" && hour >= 6) ||
        (filters.departureTime === "6to12" && (hour < 6 || hour >= 12)) ||
        (filters.departureTime === "12to18" && (hour < 12 || hour >= 18)) ||
        (filters.departureTime === "after18" && hour < 18)
      )
        return false;
    }

    if (
      filters.boardingPoints.length > 0 &&
      !bus.boarding_points?.some((bp) =>
        filters.boardingPoints.includes(bp.location)
      )
    )
      return false;

    return true;
  });
  const getFilterErrorMessage = () => {
    if (buses.length === 0) {
      return "No buses available at all for this route.";
    }

    if (filters.ac && !filters.nonAc && buses.every(bus => !bus.is_ac)) {
      return "No AC buses available.";
    }

    if (!filters.ac && filters.nonAc && buses.every(bus => bus.is_ac)) {
      return "No Non-AC buses available.";
    }

    if (filters.seater && buses.every(bus => bus.is_sleeper)) {
      return "No seater buses available.";
    }

    if (filters.sleeper && buses.every(bus => !bus.is_sleeper)) {
      return "No sleeper buses available.";
    }

    if (filters.departureTime && filteredBuses.length === 0) {
      return "No buses available for the selected departure time.";
    }

    if (filters.boardingPoints.length > 0 && filteredBuses.length === 0) {
      return "No buses found with the selected boarding point(s).";
    }

    if (filteredBuses.length === 0) {
      return "No buses match the selected filters.";
    }

    return null;
  };

  const handleBooking = () => {
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-3">
          {firstBus ? (
            <h5 className="fw-bold">{buses.length} Buses Found</h5>
          ) : (
            <h5 className="fw-bold text-danger">No Buses Found</h5>
          )}
          <div className="card shadow-lg rounded-4 mt-3">
            <div className="card-body">
              {/* Filter Header */}
              <div className="d-flex justify-content-between align-items-center mb-">
                <h6 className="fw-bold mb-0">Filter</h6>
                <h6
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters({
                      ac: false,
                      nonAc: false,
                      sleeper: false,
                      seater: false,
                      gps: false,
                      departureTime: "",
                      boardingPoints: [],
                      price: [minPrice, maxPrice],
                    });
                  }}
                >
                  Reset
                </h6>
              </div>

              {/* Filter: Live Tracking */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#liveTracking"
                  aria-expanded="true"
                >
                  Live Tracking
                  <i className="bi bi-chevron-down"></i>
                </div>
                <div className="collapse show" id="liveTracking">
                  <label className="border rounded p-2 d-flex align-items-center gap-2 mt-2" style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      className="form-check-input mb-1"
                      checked={filters.gps}
                      onChange={() =>
                        setFilters((prev) => ({ ...prev, gps: !prev.gps }))
                      }
                    />
                    <span className="form-check-label">GPS Enabled Buses</span>
                    <i className="bi bi-geo-alt-fill ms-auto"></i>
                  </label>
                </div>

              </div>
              {/* PRICE FILTER */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#price"
                  aria-expanded="true"
                  aria-controls="price"
                >
                  Price
                  <i className="bi bi-chevron-down float-end"></i>
                </div>

                <div className="collapse show" id="price">
                  <div className="border rounded p-2 mt-2">
                    <div className="d-flex justify-content-between mt-3">
                      <span>₹ {filters.price[0]}</span>
                      <span>₹ {filters.price[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      value={filters.price[0]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          price: [Number(e.target.value), prev.price[1]],
                        }))
                      }
                      className="form-range mt-2"
                    />
                  </div>
                </div>
              </div>


              {/* Filter: Bus Type */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#busType"
                  aria-expanded="true"
                >
                  Bus Type
                  <i className="bi bi-chevron-down"></i>
                </div>
                <div className="collapse show" id="busType">
                  <div className="d-flex gap-2 mt-2">
                    {/* AC Option */}
                    <label className="border rounded p-2 flex-fill d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        className="form-check-input mb-1"
                        checked={filters.ac}
                        onChange={() =>
                          setFilters((prev) => ({ ...prev, ac: !prev.ac }))
                        }
                      />
                      <span className="form-check-label">AC</span>
                      <i className="bi bi-snow ms-auto"></i>
                    </label>

                    {/* Non AC Option */}
                    <label className="border rounded p-2 flex-fill d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        className="form-check-input mb-1"
                        checked={filters.nonAc}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            nonAc: !prev.nonAc
                          }))
                        }
                      />
                      <span className="form-check-label">Non AC</span>
                      <i className="bi bi-fan ms-auto"></i>
                    </label>

                  </div>
                </div>

              </div>

              {/* Filter: Seat Type */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#seatType"
                  aria-expanded="true"
                >
                  Seat Type
                  <i className="bi bi-chevron-down"></i>
                </div>
                <div className="collapse show" id="seatType">
                  <div className="d-flex gap-2 mt-2">
                    {/* Sleeper */}
                    <label className="border rounded p-2 flex-fill d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        className="form-check-input mb-1"
                        checked={filters.sleeper}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            sleeper: !prev.sleeper
                          }))
                        }
                      />
                      <span className="form-check-label">Sleeper</span>
                      <i className="bi bi-hospital ms-auto"></i>
                    </label>

                    {/* Seater */}
                    <label className="border rounded p-2 flex-fill d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        className="form-check-input mb-1"
                        checked={filters.seater}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            seater: !prev.seater
                          }))
                        }
                      />
                      <span className="form-check-label">Seater</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-auto" viewBox="0 0 24 24">
                        <path d="M7 13h10v2H7v-2zm0-9h10c1.1 0 2 .9 2 2v8H5V6c0-1.1.9-2 2-2zm0 14h10v2H7v-2z" />
                      </svg>
                    </label>
                  </div>
                </div>

              </div>

              {/* Filter: Departure */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#departure"
                  aria-expanded="true"
                >
                  Departure
                  <i className="bi bi-chevron-down"></i>
                </div>
                <div className="collapse show" id="departure">
                  <div className="d-grid gap-2 mt-2">
                    <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                      <span>Before 6 AM</span>
                      <i className="bi bi-brightness-alt-low"></i>
                    </div>
                    <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                      <span>6 AM - 12 PM</span>
                      <i className="bi bi-brightness-high"></i>
                    </div>
                    <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                      <span>12 PM - 6 PM</span>
                      <i className="bi bi-brightness-low"></i>
                    </div>
                    <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                      <span>After 6 PM</span>
                      <i className="bi bi-moon"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* Filter: Boarding Points */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#boardingPoints"
                  aria-expanded="true"
                >
                  Boarding Points
                  <i className="bi bi-chevron-down"></i>
                </div>

                <div className="collapse show mt-2" id="boardingPoints">
                  {/* Search Input */}
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Choose Boarding Point"
                    />
                    <span className="input-group-text bg-white">
                      <i className="bi bi-search"></i>
                    </span>
                  </div>

                  {/* Scrollable Checkbox List */}
                  <div
                    className="border rounded p-2"
                    style={{ maxHeight: "180px", overflowY: "auto" }}
                  >
                    {[
                      "KACHIGUDA",
                      "CBS - Opp Sangita Travels",
                      "Afzalgunj",
                      "Nampally",
                      "LakdikaPool",
                      "Mehdipatnam",
                      "Ameerpet",
                      "Secunderabad",
                      "Gachibowli",
                      "LB Nagar",
                      "Miyapur",
                      "Kukatpally",
                      "Dilsukhnagar",
                      "SR Nagar"
                    ].map((point, index) => (
                      <div key={index} className="form-check mb-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`boarding-${index}`}
                          checked={filters.boardingPoints.includes(point)}
                          onChange={(e) => {
                            setFilters((prev) => ({
                              ...prev,
                              boardingPoints: e.target.checked
                                ? [...prev.boardingPoints, point]
                                : prev.boardingPoints.filter((p) => p !== point)
                            }));
                          }}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={`boarding-${index}`}
                        >
                          {point}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-9">
          {firstBus ? (
            <h5 className="fw-bold">
              {firstBus.bus_name} | {formatDateMain(firstBus.journey_date)}
            </h5>
          ) : (
            <h5 className="fw-bold">{formatDateMain(selectedDate)}</h5>
          )}

          <div className="date-slider-container d-flex align-items-center my-3">
            {!isAtStart && (
              <button
                className="nav-btn btn btn-light me-2"
                onClick={() => scroll("left")}
              >
                &lt;
              </button>
            )}
            <div
              className="date-scroll-wrapper flex-grow-1 overflow-auto d-flex"
              ref={scrollRef}
              style={{ scrollbarWidth: "none" }}
            >
              {days.map((day, index) => (
                <DayCard
                  key={index}
                  day={day.weekday}
                  date={day.label}
                  selected={selectedDate === day.value}
                  onClick={() => handleDateChange(day.value)}
                />
              ))}
            </div>
            <button
              className="nav-btn btn btn-light ms-2"
              onClick={() => scroll("right")}
            >
              &gt;
            </button>
          </div>

          {/* Promo Cards */}
          <div className="promo-cards-container d-flex flex-nowrap overflow-auto gap-3 mt-4">
            {promoData.map((promo, index) => (
              <div
                className={`promo-card ${promo.bgClass} p-3 rounded shadow-sm`}
                key={index}
                style={{ minWidth: "200px" }}
              >
                <div>
                  <h6 className="fw-semibold text-secondary">{promo.title}</h6>
                  <p className="mb-2">{promo.description}</p>
                  <button className="btn btn-sm btn-primary">
                    {promo.buttonText}
                  </button>
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
                  <h6 className="fw-semibold text-secondary mb-0">
                    Bus Operator
                  </h6>
                </div>

                <div className="col-12 col-md-4 d-flex align-items-center justify-content-md-end justify-content-center text-end">
                  <h6 className="fw-semibold text-secondary mb-0">Price</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Rows */}
          {filteredBuses && filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => {
              const isExpanded = expandedBusId === bus.id;
              return (
                <div className="card shadow-sm mt-3 mb-3" key={bus.id}>
                  <div className="card-body">
                    <div className="row text-center align-items-center">
                      {/* Departure */}
                      <div className="col-6 col-md-2 d-flex flex-column">
                        <h5 className="mb-0 fw-bold">
                          {formatTimeToAMPM(bus.departure_time)}
                        </h5>
                        <small className="text-muted">
                          {bus.from_city_name}
                        </small>
                      </div>

                      {/* Duration Placeholder */}
                      <div className="col-6 col-md-2 d-flex flex-column justify-content-center">
                        <small>-</small>
                      </div>

                      {/* Arrival */}
                      <div className="col-6 col-md-2 d-flex flex-column align-items-center">
                        <h5 className="mb-0 fw-bold">
                          {formatTimeToAMPM(bus.arrival_time)}
                        </h5>
                        <small className="text-muted">{bus.to_city_name}</small>
                      </div>

                      {/* Bus Operator */}
                      <div className="col-6 col-md-2 d-flex flex-column align-items-center">
                        <h6 className="mb-0 fw-bold">{bus.bus_name}</h6>
                      </div>

                      {/* Price & Button */}
                      <div className="col-12 col-md-4 d-flex flex-column align-items-end text-end">
                        <small className="d-block mb-2">Starting From</small>
                        <h4 className="text-danger fw-bold mb-3">
                          ₹{parseFloat(bus.price).toFixed(0)}
                        </h4>
                        <button
                          className="btn btn-warning rounded-pill px-4"
                          onClick={() => handleSelectSeats(bus.id)}
                        >
                          {isExpanded ? "Hide Seats" : "Select Seats"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer Options */}
                  <div className="card-footer d-flex justify-content-center justify-content-md-start gap-4 pt-3 border-0">
                    <small>
                      <span className="text-primary">●</span> Boarding &
                      Dropping Point
                    </small>
                    <small>
                      <span className="text-primary">●</span> Cancellation
                      Policy
                    </small>
                  </div>

                  {/* Expanded Seat & Route Info */}
                  {isExpanded && (
                    <div className="card-body border-top pt-3">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="berth-title">Lower Berth</div>
                          <div className="seat-grid mb-3">
                            {(bus.bus_details?.lowerBerths || busDetails.lowerBerths)?.map((seat, idx) => (
                              <div
                                key={idx}
                                className={`seat-slot ${selectedSeat === seat.id ? 'selected' : ''}`}
                                onClick={() => handleSeatSelect(seat.id)}
                                style={{ cursor: "pointer" }}
                              >
                                {seat.id}
                              </div>
                            ))}
                          </div>

                          <div className="berth-title">Upper Berth</div>
                          <div className="seat-grid">
                            {(bus.bus_details?.upperBerths || busDetails.upperBerths)?.map((seat, idx) => (
                              <div
                                key={idx}
                                className={`seat-slot ${selectedSeat === seat.id ? 'selected' : ''}`}
                                onClick={() => handleSeatSelect(seat.id)}
                                style={{ cursor: "pointer" }}
                              >
                                {seat.id}
                              </div>
                            ))}
                          </div>
                          {selectedSeat && (
                            <div className="text-end mt-3">
                              <button className="btn btn-primary" onClick={handleBooking}>
                                Book Now
                              </button>
                            </div>
                          )}

                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-start">
                          {/* Boarding Points */}
                          <div className="berth-title mb-2">Boarding Points</div>
                          <ul className="list-group">
                            {(Array.isArray(bus.boarding_points) && bus.boarding_points.length > 0
                              ? bus.boarding_points
                              : busDetails.pickupPoints
                            )?.map((point, idx) => (
                              <li key={idx} className="list-group-item">
                                <strong>{point.time || "Time not available"}</strong> – {point.location || "Location not available"}
                                {point.description && <div className="text-muted small">{point.description}</div>}
                              </li>
                            ))}
                          </ul>

                          {/* Drop Points */}
                          <div className="berth-title mb-2">Dropping Points</div>
                          <ul className="list-group">
                            {(Array.isArray(bus.drop_points) && bus.drop_points.length > 0
                              ? bus.drop_points
                              : busDetails.dropPoints
                            )?.map((point, idx) => (
                              <li key={idx} className="list-group-item">
                                <strong>{point.time || "Time not available"}</strong> – {point.location || "Location not available"}
                                {point.description && <div className="text-muted small">{point.description}</div>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="text-center my-5">
              <h4 className="fw-bold text-danger">
                {getFilterErrorMessage() || (buses.length === 0 ? "Not found" : "")}
              </h4>
              <p className="text-muted">
                {getFilterErrorMessage()
                  ? "Please change filter."
                  : buses.length === 0
                    ? "No buses found for the selected date."
                    : ""}
              </p>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default Buses;
