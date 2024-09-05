import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../Pages/Login.jsx"
import Registro from "../Pages/Registro.jsx"
import Home from '../Pages/Home.jsx';


const Routing = () => {
  return (
    <Router>
     <Routes>
       <Route path="/" element={<Registro />} />
       <Route path="/Login" element={<Login />} />
       <Route path="/Home" element={<Home />} />
       <Route path="/Registro" element={<Registro />} />
     </Routes>
    </Router>
   );
};
export default Routing;
