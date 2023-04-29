import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebase } from './firebase';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const user = firebase.auth().currentUser;

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Redirect to chatbot page
      navigate('/chatbot');
    } catch (error) {
      alert(error.message);
    }
  };

  const logo_url = `${process.env.PUBLIC_URL}/static/RM_LOGO-DEFINITIVE.jpeg`

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo_url} alt="Logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
