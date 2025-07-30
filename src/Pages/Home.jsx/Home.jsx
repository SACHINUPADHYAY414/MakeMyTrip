import SearchLayout from "../../Components/SearchLayout/SearchLayout";
import ExclusiveOffers from "../ExclusiveOffers/ExclusiveOffers";
// import backgroundImage from "/public/assets/Home.avif";

const Home = () => {
  const heroStyles = {
    height: '100vh',
    backgroundImage: `url(https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg1.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '2rem',
    textShadow: '0 0 5px rgba(0,0,0,0.7)',
  };

  const glassOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 1,
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
  };

  return (
    <>
      <div style={heroStyles}>
        <div style={glassOverlayStyles}></div>
        <div style={contentStyles}>
          <SearchLayout />
        </div>
      </div>
      <div style={{ filter: 'none', backdropFilter: 'none', position: 'relative', zIndex: 9999 }}>
        <ExclusiveOffers className="mt-4" />
      </div>

    </>
  );
};

export default Home;
