// src/ChatBotPage.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { firebase } from './firebase';
import Live2DComponent from './Live2DComponent';
import {
  useGoogleLogin,
} from '@react-oauth/google';
import './ChatbotPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import VolumeSlider from './VolumeSlider';
import axios from 'axios';
import './MyCustomButton.css';

function MyCustomButton({ onClick, children }) {
  return (
    <button className="my-custom-button" onClick={onClick}>
      {children}
    </button>
  );
}

function setWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function ChatBotPage() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showLive2D, setShowLive2D] = useState(true);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/google`, { 
        code,
      });

      const ttl = 7 * 24 * 3600 * 1000; 
      setWithExpiry("refresh_token", tokens.data.refresh_token, ttl);
      
      // Refresh the page
      window.location.reload();
    },
    onError: () => console.log("Error on GAPI authorize"),
    flow: 'auth-code',
    scope: 'https://mail.google.com/ https://www.googleapis.com/auth/userinfo.profile openid'
  });

  useEffect(() => {
    
    const s = io(`${process.env.REACT_APP_BACKEND}`,{
      timeout: 120000, // Timeout in milliseconds (120 seconds)
      pingInterval: 20000, // Ping interval in milliseconds (20 seconds)
    });

    setSocket(s);

    const addBotMessageWithTypingEffect = (msg) => {
      let typedMessage = '';
      let index = 0;
    
      const typingInterval = setInterval(() => {
        if (index < msg.length) {
          typedMessage += msg[index];
          setMessages((messages) => [
            ...messages.slice(0, -1),
            { text: typedMessage, sender: 'bot' },
          ]);
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    };

    s.on('message', (msg) => {
      setMessages((messages) => [
        ...messages,
        { text: '', sender: 'bot' },
      ]);
      setReceivedMessage(msg);
      addBotMessageWithTypingEffect(msg);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    const token = getWithExpiry('refresh_token');
    if (!token) {
      setShowLoginPopup(true);
    } else {
      setShowLoginPopup(false);
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const idToken = await firebase.auth().currentUser.getIdToken();
    const refreshToken = getWithExpiry("refresh_token");
    const tokens = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/google/refresh-token`, { 
      refreshToken,
    });

    console.log(
      "PAYLOAD RECEIVED"
    )

    console.log(
      tokens.data
    )

    socket.emit('message', { token: idToken, oauth_tokens: tokens.data, text: message });
    setMessages((messages) => [
      ...messages,
      { text: message, sender: 'user' }, // Add sender property to message object
    ]);
    setMessage('');
  };

  const toggleMenu = () => setShowMenu((prevState) => !prevState);
  const toggleLive2D = () => setShowLive2D((prevState) => !prevState);

  return (
    <div className="chatbot-container">
      <div style={{ display: showLive2D ? 'block' : 'none' }}>
          <Live2DComponent receivedMessage={receivedMessage} />
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.sender === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          className="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
      <div className="menu-button-wrapper" onClick={toggleMenu}>
        <div className="menu-button">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      {showMenu && (
        <div className="floating-menu">
          AI Setting
          <br />
          <br />
          AI Volume:
          <VolumeSlider />
          <br />
          Hide or Show AI:
          <div className="toggle-item" onClick={toggleLive2D}>
            {showLive2D ? 
            <div>
              <p style={{"textAlign": "center", "color": "red"}}>Hide</p>
            </div> : 
            <div>
              <p style={{"textAlign": "center", "color": "green"}}>Show</p>
            </div>}
          </div>
        </div>
      )}
      {showLoginPopup && (
        <>
          <div className="backdrop"></div>
          <div className="login-popup">
            <h2>Please log in</h2>
            <MyCustomButton onClick={() => login()}>
              Sign in with Google 🚀{' '}
            </MyCustomButton>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBotPage;
