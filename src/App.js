// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { firebase } from './firebase';
import LoginPage from './LoginPage';
import ChatBotPage from './ChatbotPage';
import Live2DComponent from './Live2DComponent';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chatbot"
          element={
            user ? (
              <ChatBotPage />
            ) : (
              <Navigate
                to={{
                  pathname: '/login',
                  state: { from: '/chatbot' },
                }}
              />
            )
          }
        />
        <Route path="/live2d" element={<Live2DComponent />} /> 
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;