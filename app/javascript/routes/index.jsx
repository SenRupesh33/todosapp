import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Create from "../components/Create";
import Show from "../components/Show";
import Update from "../components/Update";


export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/create" element={<Create />} />
      <Route path="/home/show/:id" element={<Show />} />
      <Route path="/home/update" element={<Update />} />
      
    </Routes>
  </Router>
);