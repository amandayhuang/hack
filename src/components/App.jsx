import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import "../styles/App.css";
import "@passageidentity/passage-elements/passage-auth";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
