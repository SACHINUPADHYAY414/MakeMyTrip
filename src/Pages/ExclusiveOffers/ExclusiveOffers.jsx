import React, { useState, useEffect, useRef } from 'react';
import OfferCard from '../../Components/OfferCard/OfferCard';
import WhyBookWithUs from '../../Components/WhyBookWithUs/WhyBookWithUs';

const tabs = ['All Offers', 'Bus', 'Cabs', 'Hotels', 'Flights', 'Trains'];

const offersData = {
    Bus: [
        {
            id: 1,
            title: 'Grab FLAT Rs.75 OFF* on Buses',
            description: 'Get 10% off on all bus bookings',
            code: 'BUS10',
            img: 'https://promos.makemytrip.com/images//Bus-Desktop-SS-RathYatra-17Jun.jpg?im=Resize=(134,134)',
        },
        {
            id: 2,
            title: 'Up to 15% OFF* on Buses',
            description: 'Flat ₹100 off on early bookings',
            code: 'EARLYBUS',
            img: 'https://promos.makemytrip.com/appfest/xhdpi//Desktop-TripAssured-31May.jpg?im=Resize=(134,134)',
        },
        {
            id: 3,
            title: 'Introducing TripAssured on Bus Bookings!',
            description: 'Flat ₹100 off on early bookings',
            code: 'EARLYBUSS',
            img: 'https://promos.makemytrip.com/appfest/2x//bhim-bus-116x116-10012025.jpg?im=Resize=(134,134)',
        },
        {
            id: 4,
            title: "#TicketsToHappiness: Grab Up to 10% OFF* on Bus Bookings!",
            description: 'Get 10% off on all bus bookings',
            code: 'BUSTICKET',
            img: 'https://promos.makemytrip.com/images//Desktop-BustNorthOffer-5Jun.jpg?im=Resize=(134,134)',
        },
        {
            id: 5,
            title: 'Grab FLAT Rs.75 OFF* on Buses (Repeat)',
            description: 'Get 10% off on all bus bookings',
            code: 'BUS10',
            img: 'https://promos.makemytrip.com/images//Bus-Desktop-SS-RathYatra-17Jun.jpg?im=Resize=(134,134)',
        },
        {
            id: 6,
            title: 'Up to 15% OFF* on Buses (Repeat)',
            description: 'Flat ₹100 off on early bookings',
            code: 'EARLYBUS',
            img: 'https://promos.makemytrip.com/appfest/xhdpi//Desktop-TripAssured-31May.jpg?im=Resize=(134,134)',
        },
        {
            id: 7,
            title: 'Introducing TripAssured on Bus Bookings! (Repeat)',
            description: 'Flat ₹100 off on early bookings',
            code: 'EARLYBUSS',
            img: 'https://promos.makemytrip.com/appfest/2x//bhim-bus-116x116-10012025.jpg?im=Resize=(134,134)',
        },
        {
            id: 8,
            title: "#TicketsToHappiness: Grab Up to 10% OFF* (Repeat)",
            description: 'Get 10% off on all bus bookings',
            code: 'BUSTICKET',
            img: 'https://promos.makemytrip.com/images//Desktop-BustNorthOffer-5Jun.jpg?im=Resize=(134,134)',
        },
    ],
    'All Offers': [
        {
            id: 9,
            title: 'Special All Offer',
            description: 'Up to 20% off on all bookings',
            code: 'ALLOFF',
            img: 'https://promos.makemytrip.com/images//Desktop-BustNorthOffer-5Jun.jpg?im=Resize=(134,134)',
        },
    ],
    Cabs: [
        {
            id: 10,
            title: 'Cab Offer',
            description: '₹200 off on cab rides',
            code: 'CAB200',
            img: 'https://promos.makemytrip.com/appfest/xhdpi//Desktop-TripAssured-31May.jpg?im=Resize=(134,134)'
        },
    ],
    Hotels: [
        {
            id: 11,
            title: 'Hotel Offer',
            description: 'Stay 3 nights, pay for 2',
            code: 'HOTELSTAY',
            img: 'https://promos.makemytrip.com/images//Desktop-BustNorthOffer-5Jun.jpg?im=Resize=(134,134)',
        },
    ],
    Flights: [
        {
            id: 12,
            title: 'Flight Offer',
            description: '₹500 off on first flight booking',
            code: 'FLY500',
            img: 'https://promos.makemytrip.com/appfest/xhdpi//Desktop-TripAssured-31May.jpg?im=Resize=(134,134)'
        },
    ],
    Trains: [
        {
            id: 14,
            title: 'Train Offer 1',
            description: '₹300 off on train bookings',
            code: 'TRAIN300',
            img: 'https://promos.makemytrip.com/images//Train-Desktop-SS-RathYatra-17Jun.jpg?im=Resize=(134,134)',
        },
        {
            id: 15,
            title: 'Train Offer 2',
            description: '₹500 off on train bookings',
            code: 'TRAIN500',
            img: 'https://promos.makemytrip.com/images//Desktop-SeatAvailability-24Jun.jpg?im=Resize=(134,134)',
        },
    ],
};


const OffersTabs = () => {
    const [activeTab, setActiveTab] = useState('All Offers');
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 350;
            if (direction === 'left') {
                sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }

            setTimeout(checkForScrollPosition, 300);
        }
    };

    useEffect(() => {
        checkForScrollPosition();
        const ref = sliderRef.current;
        if (ref) {
            ref.addEventListener('scroll', checkForScrollPosition);
        }

        return () => {
            if (ref) {
                ref.removeEventListener('scroll', checkForScrollPosition);
            }
        };
    }, []);

    const checkForScrollPosition = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const handleBook = (id) => {
        console.log(`Booking clicked for offer id: ${id}`);
    };

    const offers =
        activeTab === 'All Offers'
            ? Object.values(offersData).flat()
            : offersData[activeTab] || [];

    const busRoutes = [{
        city: "Delhi",
        image: "https://images.emtcontent.com/hotel-img/del-sm.webp",
        routes: ["Manali", "Jaipur", "Amritsar", "Lucknow", "Shimla"],
    },
    {
        city: "Bengaluru",
        image: "https://images.emtcontent.com/hotel-img/blr-sm.webp",
        routes: ["Hyderabad", "Mumbai", "Goa", "Chennai", "Pune"],
    },
    {
        city: "Hyderabad",
        image: "https://images.emtcontent.com/hotel-img/hyd-sm.webp",
        routes: ["Bengaluru", "Mumbai", "Goa", "Chennai", "Pune"],
    },
    {
        city: "Pune",
        image: "https://images.emtcontent.com/hotel-img/pune-sm.webp",
        routes: ["Bengaluru", "Goa", "Indore", "Nagpur", "Hyderabad"],
    },
    {
        city: "Chennai",
        image: "https://images.emtcontent.com/hotel-img/mumb-sm.webp",
        routes: ["Bengaluru", "Coimbatore", "Hyderabad", "Madurai", "Tirunelveli"],
    },
    {
        city: "Indore",
        image: "https://images.emtcontent.com/hotel-img/indr-sm.webp",
        routes: ["Mumbai", "Pune", "Ahmednagar", "Nagpur"],
    },
    {
        city: "Ahmedabad",
        image: "https://images.emtcontent.com/hotel-img/indr-sm.webp",
        routes: ["Porbandar", "Jamnagar", "Udaipur", "Indore", "Rajkot"],
    },
    {
        city: "Mumbai",
        image: "https://images.emtcontent.com/hotel-img/mumb-sm.webp",
        routes: ["Bengaluru", "Hyderabad", "Indore", "Goa", "Pune"],
    },
    {
        city: "Goa",
        image: "https://images.emtcontent.com/hotel-img/goa-sm.webp",
        routes: ["Hyderabad", "Bengaluru", "Pune", "Mumbai", "Kolhapur"],
    }, {
        city: "Coimbatore",
        image: "https://images.emtcontent.com/hotel-img/combt-sm.webp",
        routes: ["Chennai", "Bengaluru", "Hyderabad", "Tuticorin", "Sivakasi"]
    }, {
        city: "Kolhapur",
        image: "https://images.emtcontent.com/hotel-img/jaipur-sm.webp",
        routes: ["Goa", "Pune", "Mumbai", "Nagpur",]

    }, {
        city: "",
        image: "https://images.emtcontent.com/hotel-img/ngpr-sm.webp",
        routes: ["Pune", "Nagpur", "Bengaluru",]
    }
    ];
    const [expanded, setExpanded] = useState(false);
    const hiddenWrapperRef = useRef(null);
    const [hiddenHeight, setHiddenHeight] = useState(0);

    const visibleRoutes = busRoutes.slice(0, 9);
    const hiddenRoutes = busRoutes.slice(9);
    const hasHiddenRoutes = hiddenRoutes.length > 0;

    useEffect(() => {
        if (expanded && hiddenWrapperRef.current) {
            const scrollHeight = hiddenWrapperRef.current.scrollHeight;
            setHiddenHeight(scrollHeight);
        } else {
            setHiddenHeight(0);
        }
    }, [expanded]);


    const faqs = [
        {
            question: "Why should I book bus tickets with MakeMyTrip.com?",
            answer:
                "MakeMyTrip is one of the best platforms to book bus tickets that come up with latest technological updates keeping its users in mind. Wide options for buses are available with great offers and discounts. ",
        },
        {
            question: "What are the payment methods for booking bus tickets?",
            answer:
                "We accept payments via credit/debit cards, UPI, wallets, and net banking for your convenience.",
        },
        {
            question: "How to avail discount on bus booking with MakeMyTrip?",
            answer:
                "You can use promo codes during checkout or check our Offers section for ongoing discounts.",
        },
        {
            question: "What to do if I lose my ticket?",
            answer:
                "You can retrieve your ticket from your email or MakeMyTrip account under 'My Bookings'.",
        },
        {
            question: "How can I cancel my bus ticket at MakeMyTrip?",
            answer:
                "Go to 'My Bookings', choose the ticket, and select cancel. Refund will be processed per policy.",
        },
    ];
    const [openIndex, setOpenIndex] = useState(0);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='mt-4'>
            <div className="container position-relative py-3 bg-white rounded shadow-lg mb-4">

                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="fw-bold m-0">Offers</h3>
                    <div className="d-flex gap-2">
                        {canScrollLeft && (
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => scroll('left')}
                            >
                                &#8592;
                            </button>
                        )}
                        {canScrollRight && (
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => scroll('right')}
                            >
                                &#8594;
                            </button>
                        )}
                    </div>
                </div>

                <ul className="nav nav-tabs mb-3 flex-wrap">
                    {tabs.map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button
                                className={`nav-link ${activeTab === tab ? 'active fw-semibold' : ''}`}
                                onClick={() => setActiveTab(tab)}
                                type="button"
                                style={{ cursor: 'pointer' }}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>

                <div
                    ref={sliderRef}
                    className="d-flex gap-3 overflow-auto"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                >
                    {offers.map(({ id, title, description, code, img }) => (
                        <OfferCard
                            key={id}
                            img={img}
                            title={title}
                            description={description}
                            code={code}
                            onBook={() => handleBook(id)}
                        />
                    ))}
                </div>


            </div>
            <div className="custom-container my-4 shadow-lg">
                <div className="bg-body rounded shadow-md p-4">
                    <h4 className="fw-bold mb-4">Experience Flying with our Airline Partners</h4>

                    <div className="row g-4">
                        {/* Air Asia */}
                        <div className="col-12 col-md-6">
                            <div className="overflow-hidden rounded-4">
                                <img
                                    src="https://platforms.makemytrip.com/contents/07e30964-bcda-4c81-873f-fbb283b1845f"
                                    alt="Air Asia"
                                    className="img-fluid w-100"
                                    style={{ objectFit: 'cover', height: '180px' }}
                                />
                            </div>
                        </div>

                        {/* Cathay Pacific */}
                        <div className="col-12 col-md-6">
                            <div className="overflow-hidden rounded-4">
                                <img
                                    src="https://platforms.makemytrip.com/contents/fb0b8518-346f-4c5d-b86e-bc520d8111cf"
                                    alt="Cathay Pacific"
                                    className="img-fluid w-100"
                                    style={{ objectFit: 'cover', height: '180px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container my-4 shadow-lg">
                <div className="bg-white p-4 rounded shadow-sm">
                    <div className="row align-items-center">
                        {/* Left section */}
                        <div className="col-md-7">
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src="https://img.icons8.com/color/48/000000/downloads.png"
                                    alt="Download icon"
                                    className="me-2"
                                    style={{ width: '48px', height: '48px' }}
                                />
                                <h4 className="fw-bold mb-0">Download App Now !</h4>
                            </div>
                            <p className="mb-3">
                                Use code <strong>WELCOMEMMT</strong> and get <strong>FLAT 12% OFF</strong> on your first domestic flight booking
                            </p>

                            {/* Mobile input and button */}
                            <div className="input-group mb-4" style={{ maxWidth: '500px' }}>
                                <span className="input-group-text bg-white">
                                    <img
                                        src="https://flagcdn.com/w40/in.png"
                                        alt="India Flag"
                                        width="20"
                                        className="me-1"
                                    />
                                    +91
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Mobile number"
                                />
                                <button className="btn btn-outline-primary fw-bold">
                                    GET APP LINK
                                </button>
                            </div>

                            {/* App download buttons */}
                            <div className="d-flex gap-3">
                                <a href="#" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                                        alt="Google Play"
                                        height="40"
                                    />
                                </a>
                                <a href="#" target="_blank" rel="noreferrer">
                                    <img
                                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                        alt="App Store"
                                        height="40"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* QR code section */}
                        <div className="col-md-5 text-md-end text-center mt-4 mt-md-0">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-app-link.com"
                                alt="QR Code"
                                width="150"
                                height="150"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="custom-container my-4 bg-body text-center rounded shadow-lg">
                <div className="bg-body rounded p-4">
                    <h2 className="fw-bold mb-5">Popular Bus Routes</h2>

                    {/* First 9 visible */}
                    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                        {visibleRoutes.map((route, index) => (
                            <div className="col d-flex align-items-start gap-3" key={index}>
                                <img
                                    src={route.image}
                                    alt={route.city}
                                    className="rounded"
                                    width="70"
                                    height="70"
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="text-start">
                                    <h5 className="fw-bold mb-1">{route.city}</h5>
                                    <small>To: {route.routes.join(', ')}</small>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Animated expandable container */}
                    {hasHiddenRoutes && (
                        <div
                            ref={hiddenWrapperRef}
                            className="overflow-hidden transition-height mt-3"
                            style={{
                                height: `${expanded ? hiddenHeight : 0}px`,
                                transition: 'height 0.5s ease',
                            }}
                        >
                            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                                {hiddenRoutes.map((route, index) => (
                                    <div
                                        className="col d-flex align-items-start gap-3"
                                        key={index + 9}
                                    >
                                        <img
                                            src={route.image}
                                            alt={route.city}
                                            className="rounded"
                                            width="70"
                                            height="70"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="text-start">
                                            <h5 className="fw-bold mb-1">{route.city}</h5>
                                            <small>To: {route.routes.join(', ')}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Toggle Button */}
                    {hasHiddenRoutes && (
                        <button
                            className="btn btn-primary px-4 rounded-pill fw-bold"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? 'Show Less' : 'View More'}
                        </button>
                    )}
                </div>
            </div>

            <div className="custom-container my-4 bg-body text-center rounded shadow-lg">
                <div className="card border-0">
                    <div className="row g-0 align-items-center">
                        {/* Text Content */}
                        <div className="col-md-6">
                            <div className="card-body text-start">
                                <h2 className="fw-bold mb-4">Book Bus Tickets Online with MakeMyTrip</h2>
                                <p className="mb-3">
                                    Just think that you’re all set for your much-awaited road trip across India with your loved ones,
                                    and you’re starting this incredible journey by bus. It’s indeed an amazing experience that everyone
                                    desires. And why not? There’s something truly intriguing about setting off on a road trip. Imagine
                                    yourself settled, capturing awe-inspiring scenes, lush greenery, vibrant cities, and rustic villages
                                    from the window seat. From wholesome conversations with loved ones to exploring unplanned stops,
                                    you can experience it during your mesmerising journey. Whether you’re travelling with your partner,
                                    family members, friends, or solo, the road to your favourite destination turns into a beautiful canvas
                                    for unforgettable memories that one cherishes.
                                    In addition to this, the easy booking online, comfortable seating, spacious coaches, and vast route
                                    coverage are some other features, promising a convenient journey at its peak.
                                    So, why wait? Book your bus now and start your trip packed with lots of exploration and experiences.
                                </p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="col-md-6 p-4" style={{ height: "25rem" }}>
                            <img
                                src="https://images.emtcontent.com/bus-img/bus-img_new6.webp"
                                alt="Bus on highway"
                                className="img-fluid rounded-end w-100 h-100 object-fit-cover rounded"
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="card-body text-start pt-0">
                            <p className="mb-0">
                                So, why wait? Book your bus now and start your trip packed with lots of exploration and experiences.
                                In addition to this, the easy booking online, comfortable seating, spacious coaches, and vast route
                                coverage are some other features, promising a convenient journey at its peak. So, why wait?
                                Book your bus now and start your trip packed with lots of exploration and experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <WhyBookWithUs />

            <div className="custom-container my-4 bg-body text-center rounded shadow-lg p-4">
                <h2 className="fw-bold text-center mb-4">FAQ's</h2>
                <div className="accordion">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-bottom pb-3 mb-2">
                            <button
                                className="w-100 text-start border-0 bg-white py-1 px-0 d-flex justify-content-between align-items-center"
                                onClick={() => toggleFAQ(index)}
                                style={{ fontSize: '1.1rem', fontWeight: '600' }}
                            >
                                {faq.question}
                                <i
                                    className={`bi bi-chevron-${openIndex === index ? 'up' : 'down'
                                        }`}
                                ></i>
                            </button>
                            <div className={`faq-answer text-start ${openIndex === index ? 'show' : ''}`}>
                                <p className="text-muted pe-3">
                                    {faq.answer}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OffersTabs;
