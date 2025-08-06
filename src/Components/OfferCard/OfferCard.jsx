import React from 'react';

const OfferCard = ({ img, title, description, code, onBook }) => {
    return (
        <div
            className="card flex-row shadow-md"
            style={{
                width: '350px',
                minWidth: '410px',
                borderRadius: '0.5rem',
                height: '220px',
            }}
        >
            <div className="col-6 p-0">
                <img
                    src={img}
                    alt={title}
                    className="img-fluid h-100 object-fit-cover"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.5rem 0 0 0.5rem',
                    }}
                />
            </div>

            <div className="col-6">
                <div className="card-body h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h6 className="card-title fw-bold mb-1" style={{ fontSize: '1rem' }}>
                            {title}
                        </h6>
                        <hr
                            style={{ borderTop: '2px solid #e60000', width: '30px', margin: '5px 0' }}
                        />
                        <p className="card-text mb-2" style={{ fontSize: '0.85rem' }}>
                            {description}
                        </p>
                        {code && (
                            <p className="card-text mb-1" style={{ fontSize: '0.75rem' }}>
                                Code: <strong>{code}</strong>
                            </p>
                        )}
                    </div>
                    <div className="text-end">
                        <button className="btn btn-primary fw-semibold" onClick={onBook}>
                            BOOK NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OfferCard;
