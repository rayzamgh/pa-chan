# Project Summary

This project is a React-based web application that integrates a chatbot with a 3D animated model using the Live2D framework. The chatbot communicates with a backend server to process user input and generate responses. The animated model reacts to the chatbot's responses and performs various animations and expressions. The application also includes user authentication through Firebase and offers an interactive interface for users to interact with the chatbot.

## Features

- User authentication with Firebase
- Real-time chatbot interaction
- 3D animated model using Live2D framework
- Typing effect for chatbot responses
- Volume control for the animated model
- Menu for controlling the AI model's visibility and settings

## Project Structure

The project is divided into several components:

- `App.js`: The main entry point of the application, responsible for managing user authentication and routing.
- `ChatBotPage.js`: The main chatbot interface, which handles user input, chatbot responses, and live2D integration.
- `Live2DComponent.js`: A wrapper component for the Live2D model, which includes the model's container and layout.
- `Live2DModel.js`: The component responsible for loading, initializing, and managing the Live2D model, as well as handling model animations and expressions.
- `LoginPage.js`: The login page for user authentication.
- `VolumeSlider.js`: A component for controlling the volume of the Live2D model.
- `VolumeContext.js`: A context provider for sharing the volume state between components.

# README

## Installation

1. Clone the repository:

```
git clone https://github.com/user/repo.git
```

2. Install dependencies:

```
cd repo
npm install
```

3. Create a `.env` file in the project root with your environment variables (e.g., `REACT_APP_BACKEND` for your backend server URL).

4. Start the development server:

```
npm start
```

The application will now be running on `http://localhost:3000`.

## Usage

1. Access the application at `http://localhost:3000`.
2. Log in with your Firebase credentials or sign up for a new account.
3. Interact with the chatbot by typing messages and pressing the "Send" button.
4. Open the AI settings menu by clicking the menu button in the bottom-right corner to adjust the volume or toggle the visibility of the Live2D model.

## Customization

To customize the Live2D model, replace the model files in the `public/static` folder and update the `cubism4Model` path in `Live2DComponent.js`. You can also adjust the Live2D model's animations and expressions in the `Live2DModel.js` file based on your model's available motions and expressions.

## Deployment

To deploy the application, follow the deployment guide for your preferred hosting platform (e.g., Firebase, Netlify, or Vercel). Ensure that your environment variables are properly set in your hosting platform's configuration.