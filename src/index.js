import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Civic from './Civic';
import Signup from './Signup';
import Sign from './Sign';
import Open from './Open';
import Register from './Register';
import Dash from './Dash';
import CivicE from './CivicE';
import Profile from './Profile';
import View from './View';
import About from './About';
import Complaints from './Complaints';
import UserManagement from './Usermanagement';
import Com from './Com';
import { GrOverview } from 'react-icons/gr';
import Overview from './Overvier';
import Overvier from './Overvier';
import Usermanagement from './Usermanagement';
import Feedback from './Feedback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Civic />} />
      <Route path="/civic" element={<Civic></Civic>} />
      <Route path="/sign" element={<Signup></Signup>} />
      <Route path="/signs" element={<Sign></Sign>} />
      <Route path="/open" element={<Open></Open>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/Dash" element={<Dash></Dash>} />
      <Route path="/CivicE" element={<CivicE></CivicE>} />
      <Route path="/profile" element={<Profile></Profile>} />
      <Route path="/View" element={<View></View>} />
       <Route path="/about" element={<About></About>} />
        <Route path="/complaints" element={<Complaints></Complaints>} />
         <Route path="/usermanagement" element={<Usermanagement></Usermanagement>} />
          <Route path="/commanage" element={<Com></Com>} />
         <Route path="/overview" element={<Overvier></Overvier>} />
         <Route path="/feedback" element={<Feedback></Feedback>} />

    </Routes>
  </BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
