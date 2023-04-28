import React from 'react';
import Live2DModelComponent from './Live2DModel';
import './Live2DComponent.css';

const Live2DComponent = ({ receivedMessage }) => {
  const cubism4Model =
  `${process.env.PUBLIC_URL}/static/Haru/Haru.model3.json`;
  return (
    <div className="live2d-container">
      <div className="live2d-box">
        <Live2DModelComponent
          modelPath={cubism4Model}
          canvasId="live2d-canvas"
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Live2DComponent;
