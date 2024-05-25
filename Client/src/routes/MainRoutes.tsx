// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import _404 from "../pages/404/_404";
import AuthenticationPage from "../pages/authentication/Auth";
import AiServicesPage from "../pages/ai-services/Page";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<_404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/services" element={<AiServicesPage />} />
    </Routes>
  );
};

export default MainRoutes;
