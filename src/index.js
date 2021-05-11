import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import  VideoPlayer from './context/videoContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <VideoPlayer>
    <App />
    </VideoPlayer>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


