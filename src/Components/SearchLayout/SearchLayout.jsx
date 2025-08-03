import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { FaBus, FaWalking, FaCalendarAlt } from "react-icons/fa";
import api from "../../Action/Api";
import { MdSwapHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../Redux/Action/searchReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { useToastr } from "../Toastr/ToastrProvider";

const overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
  minHeight: "83vh"
};

const SearchLayout = () => {
  const inputRef = useRef(null);
  const { customToast } = useToastr();
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(true);

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    fromCity: "",
    toCity: "",
    journeyDate: getTodayDate()
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/cities");
        const cityList = response.data || [];
        setCities(cityList);

        const newDelhi = cityList.find(
          (c) => c.name.toLowerCase() === "new delhi"
        );
        const dwarka = cityList.find((c) => c.name.toLowerCase() === "dwarka");

        setFormData((prev) => ({
          ...prev,
          fromCity: newDelhi ? newDelhi.id.toString() : "",
          toCity: dwarka ? dwarka.id.toString() : ""
        }));
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const { fromCity, toCity, journeyDate } = formData;

    if (!fromCity || !toCity || !journeyDate) {
      customToast({
        severity: "error",
        summary: "Oops!",
        detail: "Please select From City, To City and Date.",
        life: 3000,
        sticky: false,
        closable: true
      });
      return;
    }

    const fromCityName = cities.find(
      (city) => city.id.toString() === fromCity
    )?.name;
    const toCityName = cities.find(
      (city) => city.id.toString() === toCity
    )?.name;

    if (!fromCityName || !toCityName) {
      alert("Invalid city selection");
      return;
    }

    const query = `from=${encodeURIComponent(
      fromCityName
    )}&to=${encodeURIComponent(toCityName)}&date=${encodeURIComponent(
      journeyDate
    )}`;

    try {
      window.loadingStart();
      const response = await api.get(`/buses?${query}`);
      const buses = response.data;

      if (!buses || buses.length === 0) {
        customToast({
          severity: "error",
          summary: "Oops!",
          detail: "No buses found for selected route and date.",
          life: 3000,
          sticky: false,
          closable: true
        });
        window.loadingEnd();
        return;
      }

      dispatch(setSearchResults(buses, fromCityName, toCityName));
      navigate("/buses");
      window.loadingEnd();
    } catch (error) {
      console.error("Search error:", error);
      window.loadingEnd();
    }
  };

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      fromCity: prev.toCity,
      toCity: prev.fromCity
    }));
  };

  useLayoutEffect(() => {
    const checkAndRedirect = () => {
      const isDesktop = window.innerWidth >= 768;

      if (location.pathname === "/search" && isDesktop) {
        window.location.replace("/");
      }

      // Skip overlay when on desktop and path is "/"
      if (isDesktop && location.pathname === "/") {
        setShowOverlay(false);
      } else {
        setShowOverlay(true);
      }
    };

    checkAndRedirect();
    window.addEventListener("resize", checkAndRedirect);
    return () => window.removeEventListener("resize", checkAndRedirect);
  }, [location.pathname]);

  return (
    <div className="d-flex justify-content-center align-items-center position-relative">
      {showOverlay && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={overlayStyle}
        ></div>
      )}

      {/* Desktop Form */}
      <div className="d-none d-md-flex position-relative z-2 w-90 d-flex justify-content-center">
        <form
          className="d-flex flex-column flex-md-row align-items-start bg-white rounded shadow-sm p-3 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          {/* FROM */}
          <div className="flex-grow-1 d-flex flex-column">
            <h4 className="fw-semibold text-secondary fs-5">FROM</h4>
            <div className="input-group gap-3">
              <select
                className="form-select border-0 fw-bold fs-5 ms-4"
                name="fromCity"
                value={formData.fromCity}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                    disabled={formData.toCity === city.id.toString()}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div
            className="d-none d-md-flex align-items-center mt-4 pt-3 me-4 text-primary"
            onClick={handleSwap}
            style={{ cursor: "pointer" }}
          >
            <MdSwapHoriz size={32} />
          </div>

          {/* TO */}
          <div className="flex-grow-1 d-flex flex-column">
            <h4 className="fw-semibold text-secondary fs-5 ">TO</h4>
            <div className="input-group gap-5">
              <select
                className="form-select border-0 fw-bold fs-5"
                name="toCity"
                value={formData.toCity}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                    disabled={formData.fromCity === city.id.toString()}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DATE */}
          <div className="flex-grow-1 d-flex flex-column">
            <h4 className="fw-semibold text-secondary fs-5">Journey Date</h4>
            <input
              ref={inputRef}
              type="date"
              name="journeyDate"
              className="border-0 fw-bold fs-5"
              style={{ outline: "none", boxShadow: "none" }}
              value={formData.journeyDate}
              onChange={handleChange}
            />
          </div>

          <div className="align-items-end ms-md-3 mt-3 pt-1">
            <button
              type="submit"
              className="btn btn-warning fw-bold px-4 py-2 text-white"
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Form */}
      <form
        className="d-flex d-md-none flex-column gap-3 p-3 w-100"
        style={{ maxWidth: "420px", zIndex: 2 }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <h6 className="fw-bold fs-4 text-light text-center">
          Find the Best Travel Deals Instantly
        </h6>

        <div className="form-group">
          <label className="text-white">From</label>
          <select
            name="fromCity"
            className="form-select"
            value={formData.fromCity}
            onChange={handleChange}
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-white">To</label>
          <select
            name="toCity"
            className="form-select"
            value={formData.toCity}
            onChange={handleChange}
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-white">Date</label>
          <input
            type="date"
            name="journeyDate"
            className="form-control"
            value={formData.journeyDate}
            onChange={handleChange}
            min={getTodayDate()}
          />
        </div>

        <button type="submit" className="btn btn-warning fw-bold text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchLayout;
