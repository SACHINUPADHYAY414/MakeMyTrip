import { useState, useEffect, useRef } from "react";
import { FaBus, FaWalking, FaCalendarAlt } from "react-icons/fa";
import api from "../../Action/Api";
import { MdSwapHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../Redux/Action/searchReducer";
import { useNavigate } from 'react-router-dom';
import { useToastr } from "../Toastr/ToastrProvider";
import { useLocation } from 'react-router-dom';

const SearchLayout = () => {
    const inputRef = useRef(null);
    const { customToast } = useToastr();
    const [cities, setCities] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const [formData, setFormData] = useState({
        fromCity: "",
        toCity: "",
        journeyDate: getTodayDate(),
    });

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await api.get("/cities");
                const cityList = response.data || [];
                setCities(cityList);

                // Find New Delhi and Dwarka by name and set default selection
                const newDelhi = cityList.find(city => city.name.toLowerCase() === 'new delhi');
                const dwarka = cityList.find(city => city.name.toLowerCase() === 'dwarka');

                setFormData(prev => ({
                    ...prev,
                    fromCity: newDelhi ? newDelhi.id.toString() : "",
                    toCity: dwarka ? dwarka.id.toString() : "",
                    journeyDate: prev.journeyDate
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
            alert("Please select From City, To City and Date.");
            return;
        }

        const fromCityName = cities.find(city => city.id.toString() === fromCity)?.name;
        const toCityName = cities.find(city => city.id.toString() === toCity)?.name;

        if (!fromCityName || !toCityName) {
            alert("Invalid city selection");
            return;
        }

        const query = `from=${encodeURIComponent(fromCityName)}&to=${encodeURIComponent(toCityName)}&date=${encodeURIComponent(journeyDate)}`;

        try {
            // const response = await api.get(`/search?${query}`);
            const response = await api.get(`/buses?${query}`);
            const buses = response.data;
            console.log("buses data", buses)
            if (!buses || buses.length === 0) {
                customToast({
                    severity: "error",
                    summary: "Oops!",
                    detail: "No buses found for selected route and date.",
                    life: 3000,
                    sticky: false,
                    closable: true,
                });
                return;
            }
            //    dispatch(SET_SEARCH_RESULTS(buses, fromCityName, toCityName));
            dispatch(setSearchResults(buses, fromCityName, toCityName));
            navigate('/buses');
            // setBuses(buses);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const handleSwap = () => {
        setFormData((prev) => ({
            ...prev,
            fromCity: prev.toCity,
            toCity: prev.fromCity,
        }));
    };

    const location = useLocation();
    const isHomePage = location.pathname === "/home" || location.pathname === "/search";

    const wrapperStyle = isHomePage
        ? {
            height: '80vh',
            backgroundImage: `url(https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg1.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
        : {};

    const overlayStyle = isHomePage
        ? {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 1,
        }
        : {};

    return (
        <div
            className="d-flex justify-content-center align-items-center position-relative"
            style={wrapperStyle}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={overlayStyle}
            ></div>

            <div className="position-relative z-2 w-90 d-flex justify-content-center">

                <form
                    className="d-flex flex-column flex-md-row align-items-start bg-white rounded shadow-sm p-3 gap-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    {/* FROM */}
                    <div className="flex-grow-1 d-flex flex-column">
                        <h4 className="fw-semibold text-secondary mb-2">FROM</h4>
                        <div className="input-group justify-content-between gap-3">
                            <span className="input-group-text border-0 d-flex align-items-center gap-1" style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>
                                <FaBus size={18} />
                                <FaWalking size={14} />
                            </span>
                            {/* FROM */}
                            <select
                                className="form-select border-0 fw-bold fs-5 ms-4"
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    appearance: 'none',
                                    backgroundImage: 'none',
                                    paddingRight: '1rem'
                                }}
                                value={formData.fromCity}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, fromCity: e.target.value }))
                                }
                                aria-label="From city"
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option
                                        key={city.id}
                                        value={city.id.toString()}
                                        disabled={formData.toCity && city.id.toString() === formData.toCity}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    <div
                        className="d-none d-md-flex align-items-center mt-4 pt-3 me-4 text-primary"
                        style={{ userSelect: "none", cursor: "pointer" }}
                        onClick={handleSwap}
                    >
                        <MdSwapHoriz size={32} />
                    </div>

                    {/* TO */}
                    <div className="flex-grow-1 d-flex flex-column">
                        <h4 className="fw-semibold text-secondary mb-2">TO</h4>
                    <div className="input-group gap-5">
                            <span className="input-group-text border-0 d-flex align-items-center gap-1" style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>
                                <FaBus size={18} />
                                <FaWalking size={14} />
                            </span>

                            {/* TO */}
                            <select
                                name="toCity" className="form-select border-0 fw-bold fs-5"
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    appearance: 'none',
                                    backgroundImage: 'none',
                                    paddingRight: '1rem'
                                }}
                                value={formData.toCity}
                                onChange={handleChange}
                                aria-label="To city"
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option
                                        key={city.id}
                                        value={city.id.toString()}
                                        disabled={formData.fromCity && city.id.toString() === formData.fromCity}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    <div className="flex-grow-1 d-flex flex-column">
                        <h4 className="fw-semibold text-secondary mb-2">Journey Date</h4>
                        <div className="input-group mb-2">
                            <div className="input-group" onClick={() => inputRef.current && inputRef.current.showPicker ? inputRef.current.showPicker() : inputRef.current.focus()}
                            >
                                <span
                                    className="input-group-text border-0 d-flex align-items-center"
                                    style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                                >
                                    <FaCalendarAlt size={18} />
                                </span>

                                <input
                                    ref={inputRef}
                                    name="journeyDate"
                                    type="date"
                                    className="form-control border-0 fw-bold fs-5"
                                    value={formData.journeyDate}
                                    onChange={handleChange}
                                    aria-label="Journey date"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="align-items-end ms-md-3 mt-3 p justify-content-center justify-content-md-start">
                        <button
                            type="submit"
                            className="btn btn-warning fw-bold px-4 py-2 text-white"
                        >
                            SEARCH
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SearchLayout;
