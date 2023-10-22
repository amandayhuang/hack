import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "../styles/App.css";
import "@passageidentity/passage-elements/passage-auth";
import PastCalls from "./pages/PastCalls";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calls" element={<PastCalls />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
