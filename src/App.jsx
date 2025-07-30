import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home.jsx/Home";
import Flights from "./Pages/Flights/Flights";
import Buses from "./Pages/Buses/Buses";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

const App = () => {
  const { pathname } = useLocation();
  const [config] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout config={config} />}>
        <Route index element={<Home config={config} />} />
         <Route path="flights" element={<Flights />} />
        <Route path="buses" element={<Buses />} />
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
