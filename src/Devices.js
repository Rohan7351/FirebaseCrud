import React, { useState, useEffect, useRef } from 'react';
import { db } from './config';
import { ref, onValue, update } from 'firebase/database';
import { NavLink } from 'react-router-dom';

import './Devices.css'; // Import your external CSS file.
import notificationSound from './notification.mp3'; // Import your notification sound file

function Devices({ getDeviceId, getDeviceNo, getDeviceName }) {
  const [todoData, setTodoData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({ id: '', number: '' }); // State for selected device
  const isFirstLoad = useRef(true);
  const audioRef = useRef(new Audio(notificationSound));
  const [canPlaySound, setCanPlaySound] = useState(false); // State to track if sound can be played

  useEffect(() => {
    const starCountRef = ref(db, 'Devices');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPost = Object.keys(data || {}).map(key => ({
        id: key,
        ...data[key]
      }));

      newPost.sort((a, b) => b.INSTALLED_TIME - a.INSTALLED_TIME || 0);
      const filteredData = newPost.filter(item => !item.blocked);

      if (!isFirstLoad.current && filteredData.length > todoData.length && canPlaySound) {
        console.log(filteredData.length+" "+todoData.length);
        playNotificationSound();
      }

      isFirstLoad.current = false;
      setTodoData(filteredData);
    });
  }, [canPlaySound]);

  const handleBlockMessage = (id) => {
   
    const confirmBlock = window.confirm("Are you sure you want to block this device?");
    if (confirmBlock) {
      const deviceRef = ref(db, `Devices/${id}`);
      update(deviceRef, { blocked: true })
        .then(() => {
          setTodoData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch((error) => {
          console.error('Error blocking device: ', error);
        });
    }
  };

  const showMsg = (item) => {
    const deviceId = item.id;
    // const deviceNumber = item.numbers ? Object.values(item.numbers)[0] : '';
    const deviceNumber = item.number ? item.number : '';

    sessionStorage.setItem(item.id, 'visited');

    setSelectedDevice({ id: deviceId, number: deviceNumber });

    getDeviceId(deviceId);
    // getDeviceName(item.names ? Object.values(item.names)[0] : '');
    getDeviceName(item.name);
    
    getDeviceNo(deviceNumber);
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .catch(error => {
          console.error('Failed to play notification sound:', error);
        });
    }
  };

  const enableSound = () => {
    setCanPlaySound(true);
  };

  return (
    <div className="container">
      <div className='header'>
        <h1 className='title'>
          Device List
        </h1>
        <div className='notify'>
          <button className='notification' onClick={enableSound}>
            Enable Notifications Sound
          </button>
        </div>
      </div>
      <hr></hr>
      <ul className="list-group">
        {todoData.map((item, index) => (
          <div key={index} className="device-card">
            <NavLink to="/messages" className="device-link">
              <div className={`device-box ${sessionStorage.getItem(item.id) === 'visited' ? 'boxVisited' : 'boxUnVisited'}`} onClick={() => showMsg(item)}>
                <div className="device-info">
                  <span className="device-numbering">{index + 1}.</span>
                  <span className="device-name">
                    <b>Name  </b> 
                    {` - ${item.name === null ? 'Not Available' : item.name === undefined ? 'Not Available' : item.name}`}
                    {/* {item.names ? Object.values(item.names)[0] : item.id} */}
                  </span>
                  
                  <span className="device-number">
                    <b>
                    Mobile no 
                    </b>  
                                        {/* {item.numbers ? ` - ${Object.values(item.numbers)[0]}` : ''} */}
                    
                     {` - ${item.number === null ? 'Not Available' : item.number === undefined ? 'Not Available' : item.number}`}
                  </span>
                  <span className="device-status">
                    <b>Status</b>
                     - {item.online === true ? 'Online' : item.online === false ? 'Offline' : 'Not Available'}
                  </span>
                </div>
              </div>
            </NavLink>
            <button className="block-button" onClick={(e) => { e.stopPropagation(); handleBlockMessage(item.id); }}>
              Block
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Devices;
