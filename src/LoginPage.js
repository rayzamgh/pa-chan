import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  GoogleLogin,
} from '@react-oauth/google';
import { firebase } from './firebase';
import './LoginPage.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      console.log("credentialResponse")
      console.log(credentialResponse)
      const credential = firebase.auth.GoogleAuthProvider.credential(
        credentialResponse["credential"]
      );

      await firebase.auth().signInWithCredential(credential);
      navigate('/chatbot');
    } catch (error) {
      alert(`Sign in error: ${error}`);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const logo_url = `${process.env.PUBLIC_URL}/static/RM_LOGO-DEFINITIVE.jpeg`;

  return (
    <div className="login-container">
      <GoogleOAuthProvider clientId={clientId}>
        <div className="login-box">
          <div className="logo-container">
            <img src={logo_url} alt="Logo" className="logo" />
          </div>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={handleLoginError}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginPage;
