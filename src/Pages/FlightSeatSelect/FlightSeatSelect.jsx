import React, { useEffect, useRef, useState } from "react";
import DateCard from "../../Components/DateCard/DateCard";
import FlightCard from "../../Components/FlightCard/FlightCard";

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

const FlightSeatSelect = () => {
  const [selectedDate, setSelectedDate] = useState("2025-08-06");
  const [loading, setLoading] = useState(true);

const [flights, setFlights]=useState([{
    "id": 1,
    "airline": "Indigo",
    "flightNumber": "6E-2568",
    "departureTime": "18:00",
    "departureCity": "Ghaziabad",
    "duration": "07h 15m",
    "stops": 1,
    "arrivalTime": "01:15",
    "arrivalCity": "Mumbai",
    "price": 5818,
    "discount": 175,
    "imageUrl": "https://downloadr2.apkmirror.com/wp-content/uploads/2023/06/50/647b177898517_in.goindigo.android-384x384.png"
  },
  {
    "id": 2,
    "airline": "Air India",
    "flightNumber": "AI-101",
    "departureTime": "09:00",
    "departureCity": "Delhi",
    "duration": "06h 00m",
    "stops": 0,
    "arrivalTime": "15:00",
    "arrivalCity": "Mumbai",
    "price": 7200,
    "discount": 250,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9GkjE7b0_NT0NiXSYhHVSrqElEZnL0veQ&s"
  },
  {
    "id": 3,
    "airline": "SpiceJet",
    "flightNumber": "SG-234",
    "departureTime": "13:30",
    "departureCity": "Mumbai",
    "duration": "02h 30m",
    "stops": 0,
    "arrivalTime": "16:00",
    "arrivalCity": "Goa",
    "price": 4300,
    "discount": 100,
    "imageUrl": "https://logodix.com/logo/2132631.jpg"
  },
  {
    "id": 4,
    "airline": "Vistara",
    "flightNumber": "UK-452",
    "departureTime": "07:45",
    "departureCity": "Bangalore",
    "duration": "04h 15m",
    "stops": 1,
    "arrivalTime": "12:00",
    "arrivalCity": "Delhi",
    "price": 8100,
    "discount": 300,
    "lockPrice": 350,
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Vistara_Logo.svg/1200px-Vistara_Logo.svg.png"
  },
  {
    "id": 5,
    "airline": "GoAir",
    "flightNumber": "G8-676",
    "departureTime": "22:00",
    "departureCity": "Chennai",
    "duration": "03h 45m",
    "stops": 0,
    "arrivalTime": "01:45",
    "arrivalCity": "Hyderabad",
    "price": 3950,
    "discount": 120,
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/6/6e/GoAir_logo.svg"
  }])
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
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

  useEffect(() => {
    fetch("https://mocki.io/v1/1c44a417-7d3d-4f8a-a59f-f39c76aa32f0")
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch flights:", err);
        setLoading(false);
      });
  }, []);

  const handleAirlineToggle = (airlineName) => {
    setSelectedAirlines((prev) =>
      prev.includes(airlineName)
        ? prev.filter((a) => a !== airlineName)
        : [...prev, airlineName]
    );
  };

  const handleBook = () => {
    console.log("Book now clicked");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredFlights = flights.filter((flight) => {
    const airlineMatch =
      selectedAirlines.length === 0 ||
      selectedAirlines.includes(flight.airline);

    const discountedPrice = flight.discount
      ? flight.price - flight.discount
      : flight.price;

    const priceMatch =
      discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];

    return airlineMatch && priceMatch;
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-3">
          <h5 className="fw-bold">{filteredFlights.length} Flights Found</h5>

          <div className="card shadow-lg rounded-4 mt-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Filter</h6>
                <h6
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedAirlines([]);
                    setPriceRange([0, 10000]);
                  }}
                >
                  Reset
                </h6>
              </div>

              {/* Price Filter */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#price"
                  aria-expanded="true"
                >
                  Price
                  <i className="bi bi-chevron-down"></i>
                </div>
                <div className="collapse show" id="price">
                  <div className="border rounded p-2 mt-2">
                    <div className="d-flex justify-content-between mt-3">
                      <span>₹ {priceRange[0]}</span>
                      <span>₹ {priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      className="form-range mt-2"
                      min="500"
                      max="20000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Airline Filter */}
              <div className="mb-1 px-2">
                <div
                  className="text-start d-flex justify-content-between align-items-center fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target="#airlines"
                  aria-expanded="true"
                >
                  Airlines
                  <i className="bi bi-chevron-down"></i>
                </div>
                <div className="collapse show" id="airlines">
                  <div className="border rounded p-2 mt-2">
                    {["Air India", "Indigo", "SpiceJet", "Vistara", "GoAir"].map(
                      (airline) => (
                        <div className="form-check" key={airline}>
                          <input
                            type="checkbox"
                            className="form-check-input mb-1"
                            onChange={() => handleAirlineToggle(airline)}
                            checked={selectedAirlines.includes(airline)}
                          />
                          <label className="form-check-label">{airline}</label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9">
          {/* Date Selection */}
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
                <DateCard
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

          {/* Flights */}
          {loading ? (
            <p>Loading flights...</p>
          ) : filteredFlights.length === 0 ? (
            <p>No flights found matching your filters.</p>
          ) : (
            filteredFlights.map((flight) => (
              <FlightCard key={flight.id} {...flight} onClick={handleBook} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSeatSelect;
