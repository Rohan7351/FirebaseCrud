// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the Login.css file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/devices');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="body">
    <div className="login-container">
      <div className="login-box">
        <h1 className='logtext'>Login</h1>
        <label htmlFor="email">Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input className='inp' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br/><br/><br/><br/>
        <label htmlFor="password">Password :&nbsp;&nbsp;</label>
        <input className='inp' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/><br/>
        {/* <input type="submit" >Login</input> */}
        <div className='log-bttn'>
    
        <input type='submit' className="login-button"  onClick={handleLogin}/>

        </div>
        
        {/* <button  className="login-button" onClick={handleLogin}>Login</button> */}
        
      </div>
    </div>
    </div>
  );
};

export default Login;
