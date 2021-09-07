import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import  VideoPlayer from './context/videoContext';
import { AuthProvider } from './context/authContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
    <VideoPlayer>
    <App />
    </VideoPlayer>
    </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


