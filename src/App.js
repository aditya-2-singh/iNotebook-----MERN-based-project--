import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import { Home } from './component/Home';
import NoteState from './component/NoteState';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './component/About';

function App() {
  return (
    <NoteState>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
