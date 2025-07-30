import React, { useState, useEffect, useRef } from 'react';
import OfferCard from '../../Components/OfferCard/OfferCard';


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

    return (
        <div className="container position-relative py-2 bg-white rounded shadow-lg mb-4"
            style={{ marginTop: "-5rem" }} >
            {canScrollLeft && (
                <button
                    className="btn btn-outline-secondary position-absolute start-0 me-3"
                    onClick={() => scroll('left')}
                    style={{ zIndex: 10, top: '60%', marginLeft: "-20px" }}
                >
                    &#8592;
                </button>
            )}

            <div className="mb-1">
                <h3 className="fw-bold">Offers</h3>
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

            {canScrollRight && (
                <button
                    className="btn btn-outline-secondary position-absolute"
                    onClick={() => scroll('right')}
                    style={{ zIndex: 10, top: '60%', right: '-21px' }}
                >
                    &#8594;
                </button>
            )}
        </div>

    );
};

export default OffersTabs;
