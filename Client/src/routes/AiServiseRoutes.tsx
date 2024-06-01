// import React from 'react'
import { Routes, Route } from "react-router-dom";
import AiPage from "../components/ai-services/Container";

const AiServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/service?api=imageGeneration" element={<AiPage apiType={0} />} />
      <Route path="/service?api=imageModification" element={<AiPage apiType={1} />} />
      <Route path="/service?api=sketchColorization" element={<AiPage apiType={2} />} />
    </Routes>
  );
};

export default AiServiceRoutes;
