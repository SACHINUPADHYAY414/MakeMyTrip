import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import ChatBot from "../ChatBot/ChatBot";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const [offsetHeight, setOffsetHeight] = useState(0);

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const footerHeight = footerRef.current?.offsetHeight || 0;
    setOffsetHeight(headerHeight + footerHeight);
  }, []);

  useEffect(() => {
    window.loadingStart = () => setIsLoading(true);
    window.loadingEnd = () => setIsLoading(false);

    const timeout = setTimeout(() => {
      window.loadingEnd();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      delete window.loadingStart;
      delete window.loadingEnd;
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header ref={headerRef} />

      <main
        style={{
          flexGrow: 1,
          minHeight: "calc(100vh - 200px)",
          position: "relative", // keep relative for layout context if needed
        }}
      >
        {isLoading ? <Loader /> : <Outlet />}
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1050,
          width: "350px",
          maxWidth: "90vw",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <ChatBot />
      </div>
    </div>
  );
};

export default Layout;
