import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './components/App';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import UserProfile from './components/auth/UserProfile';
import './components/styles/index.css';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
