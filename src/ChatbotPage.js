// src/ChatBotPage.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { firebase, analytics } from './firebase';
import Live2DComponent from './Live2DComponent';
import './ChatbotPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function ChatBotPage() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showLive2D, setShowLive2D] = useState(true);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    
    const s = io(`${process.env.REACT_APP_BACKEND}`,{
      timeout: 120000, // Timeout in milliseconds (120 seconds)
      pingInterval: 20000, // Ping interval in milliseconds (20 seconds)
    });

    setSocket(s);

    s.on('message', (msg) => {
      setMessages((messages) => [
        ...messages,
        { text: msg, sender: 'bot' }, // Add sender property to message object
      ]);
      setReceivedMessage(msg);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const token = await firebase.auth().currentUser.getIdToken();
    socket.emit('message', { token, text: message });
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
          <div className="toggle-item" onClick={toggleLive2D}>
            {showLive2D ? 'Hide Live2D' : 'Show Live2D'}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBotPage;
