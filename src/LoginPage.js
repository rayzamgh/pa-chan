// src/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebase, analytics} from './firebase';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const user = firebase.auth().currentUser;

  console.log(user)

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       navigate('/chatbot');
  //     }else{
  //       console.log("Not Logged in")
  //     }
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);

      // Redirect to chatbot page
      navigate('/chatbot');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
