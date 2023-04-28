import React, { useState, useEffect, useRef } from 'react';
import { firebase, analytics } from './firebase';
import * as PIXI from 'pixi.js';
import { Live2DModel, SoundManager, config } from 'pixi-live2d-display/cubism4';
import axios from 'axios';

const Live2DModelComponent = ({ modelPath, canvasId, receivedMessage }) => {
  const canvasRef = useRef();
  const [model, setModel] = useState(null);
  const [modelinit, setModelInit] = useState(null);
  const [app, setApp] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {

    if (model) return

    async function getIdToken() {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        try {
          const temp_id = await currentUser.getIdToken();
          setIdToken(temp_id)
          console.log('ID Token:', idToken);
        } catch (error) {
          console.error('Error getting ID Token:', error);
        }
      } else {
        console.error('No user is currently signed in.');
      }
    };
    
    const app = new PIXI.Application({
      view: document.getElementById('live2d-canvas'),
      width: 160,
      height: 160,
      backgroundColor: 0xe6f3ff,
    });
    
    setApp(app);

    async function initModel() {
      window.PIXI = PIXI;

      const newModel = await Live2DModel.from(modelPath);
      setModel(newModel);

    };

    initModel();
    getIdToken();

  }, [canvasId, modelPath]);

  useEffect(() => {
    if (modelinit) return

    if (model) {
      app.stage.addChild(model);

      model.anchor.set(0.5, 0.5);
      model.x = app.view.width / 2;
      model.y = app.view.height * 2;
      model.scale.set(0.15);

      model.on('hit', (hitAreas) => {
        if (hitAreas.includes('Head')) {
          model.motion('Tap', 0);
          console.log('Head Hit');
        }
      });

      setModelInit(true)
    }
  }, [model]);

  useEffect(() => {
    
    if (receivedMessage && model) {
      console.log('Processing message:', receivedMessage);
      
      const requestData = {
          "text" : receivedMessage,
          "girl_name" : "Haru"
      }

      axios.post(`${process.env.REACT_APP_BACKEND}/synthesize`, requestData, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      })
      .then(response => {

        const gcsUrl = response.data.gcs_url;
        const motion1 = model.motion('TapBody', 1, 2, gcsUrl);
        // model.expression('F04');

      })
      .catch(error => {
        console.error(error);
      });


    }
  }, [receivedMessage, model]);

  

  return (
    <div>
      <canvas id={canvasId} ref={canvasRef} />
    </div>
  );
};

export default Live2DModelComponent;
