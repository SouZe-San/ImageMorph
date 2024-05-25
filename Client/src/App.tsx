// import { useState } from 'react'
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
// import Auth from "./pages/authentication/Auth";
// import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <MainRoutes />
        </main>
        <footer className="mt-8 py-4 flex items-center justify-center px-24">
          For Any quarries contact us at{" "}
          <a target="_blank" href="mailto:somyajit.codemail@gmail.com">
            image.morph@helpline.come
          </a>
        </footer>
      </Router>
    </>
  );
}

export default App;
