import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <MainRoutes />
        </main>
        <footer className=" py-4 flex items-center justify-center sm:px-24 p-4">
          For Any quarries contact us at{" "}
          <a target="_blank" href="mailto:somyajit.codemail@gmail.com">
            somyajit.codemail@gmail.com
          </a>
        </footer>
      </Router>
    </>
  );
}

export default App;
