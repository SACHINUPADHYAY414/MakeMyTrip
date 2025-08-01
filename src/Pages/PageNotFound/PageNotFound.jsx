import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1 className="display-4">404 - Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <button onClick={handleGoBack} className="btn btn-primary mt-3">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
