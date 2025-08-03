import Dashboard from "../../Components/MobileDashboard/Dashboard";
import SearchLayout from "../../Components/SearchLayout/SearchLayout";
import ExclusiveOffers from "../ExclusiveOffers/ExclusiveOffers";

const Home = () => {
  return (
    <>
      <div
        className="d-none d-md-flex justify-content-center align-items-center position-relative"
        style={{
          height: "60vh",
          backgroundImage: `url(https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            zIndex: 1
          }}
        ></div>

        <div>
          <SearchLayout />
        </div>
      </div>

      <div className="d-block d-md-none">
        <Dashboard />
      </div>
      <div>
        <ExclusiveOffers className="" />
      </div>
    </>
  );
};

export default Home;
