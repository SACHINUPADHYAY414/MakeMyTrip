import React from 'react';

const PageNotFound = () => {
    const handleGoBack = () => {
        if (document.referrer) {
            window.location.href = document.referrer;
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="text-center">
                <h1 className="display-4">404 - Page Not Found</h1>
                <p className="lead">The page you are looking for does not exist.</p>
                <button onClick={handleGoBack} className="btn btn-primary mt-3">
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
