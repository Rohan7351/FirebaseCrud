import React, { useState } from 'react';
import './App.css';
import Devices from './Devices';
import Messages from './Messages';
import Cards from './Cards';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  const [deviceId, setDeviceId] = useState(null);
  const [deviceNo, setDeviceNo] = useState(null);
  const [deviceName, setDeviceName] = useState(null);

  function getDeviceId(id) {
    setDeviceId(id);
    console.log("App.js id-"+id);
  }

  function getDeviceName(name) {
    setDeviceName(name);
    console.log("App.js name-"+name);

  }

  function getDeviceNo(no) {
    setDeviceNo(no);
    console.log("App.js no-"+no);

  }

  return (
    <div className="App">
      <div className='header'><h1 data-mdb-toggle="animation" data-mdb-animation-reset="true" data-mdb-animation="slide-out-right"></h1></div>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/devices" element={<Devices getDeviceId={getDeviceId} getDeviceNo={getDeviceNo} getDeviceName={getDeviceName} />} />
          <Route path="/cards" element={<Cards val={deviceId} val1={deviceNo} />} />
          <Route path="/messages" element={<Messages val={deviceId} number={deviceNo} name={deviceName} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
