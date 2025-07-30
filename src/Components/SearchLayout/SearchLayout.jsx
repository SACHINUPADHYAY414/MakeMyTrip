import React, { useState, useEffect } from "react";
import { FaBus, FaWalking, FaCalendarAlt } from "react-icons/fa";
import api from "../../Action/Api";
import { MdSwapHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { SET_SEARCH_RESULTS } from "../../Redux/Action/searchReducer";
import { useNavigate } from 'react-router-dom';

const SearchLayout = () => {
    const [cities, setCities] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fromCity: "",
        toCity: "",
        journeyDate: "",
    });

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await api.get("/cities");
                setCities(response.data || []);
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
            const response = await api.get(`/search?${query}`);
            const buses = response.data;
            dispatch({
                type: SET_SEARCH_RESULTS,
                payload: buses,
            });
            navigate('/buses');
            console.log("buses", buses)
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

    return (
        <div className="container my-5">
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
                    <div className="input-group">
                        <span className="input-group-text bg-light border-0 d-flex align-items-center gap-1">
                            <FaBus size={18} />
                            <FaWalking size={14} />
                        </span>
                        {/* FROM */}
                        <select
                            className="form-select border-0"
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
                    className="d-none d-md-flex align-items-center mt-4 pt-1 me-3 text-primary"
                    style={{ userSelect: "none", cursor: "pointer" }}
                    onClick={handleSwap}
                >
                    <MdSwapHoriz size={32} />
                </div>

                {/* TO */}
                <div className="flex-grow-1 d-flex flex-column">
                    <h4 className="fw-semibold text-secondary mb-2">TO</h4>
                    <div className="input-group">
                        <span className="input-group-text bg-light border-0 d-flex align-items-center gap-1">
                            <FaBus size={18} />
                            <FaWalking size={14} />
                        </span>
                        {/* TO */}
                        <select
                            name="toCity"
                            className="form-select border-0"
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

                {/* Journey Date */}
                <div className="flex-grow-1 d-flex flex-column">
                    <h4 className="fw-semibold text-secondary mb-2">Journey Date</h4>
                    <div className="input-group mb-2">
                        <span className="input-group-text bg-light border-0 d-flex align-items-center">
                            <FaCalendarAlt size={18} />
                        </span>
                        <input
                            name="journeyDate"
                            type="date"
                            className="form-control border-0"
                            value={formData.journeyDate}
                            onChange={handleChange}
                            aria-label="Journey date"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="d-flex align-items-end ms-md-3 mt-4 justify-content-center justify-content-md-start">
                    <button
                        type="submit"
                        className="btn btn-warning fw-bold px-4 py-2 text-white"
                    >
                        SEARCH
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchLayout;
