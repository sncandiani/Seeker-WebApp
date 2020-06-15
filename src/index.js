import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Seeker from "./Seeker"
// Render Seeker, which holds all primary navigation
ReactDOM.render(
  <Router>
    <Seeker />
  </Router>,
  document.getElementById('root')
);


