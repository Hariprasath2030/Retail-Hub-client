// client/src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';

const App = () => { 
    
    const { isAuthenticated } = useAuth();
    return <Router>
        <Routes>
            <Route path='/' element={ !isAuthenticated ? <Home/> : <Navigate to="/Register" /> } />
            <Route path='/' element={ !isAuthenticated ? <Home/> : <Navigate to="/userlogin" /> } />
            <Route path="/Register" element={ !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={ !isAuthenticated ? <Login/> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/login" /> } />
            <Route path='/user_register' element={<UserRegister/>} />
            <Route path='/user_login' element={<UserLogin/>} />
        </Routes>
    </Router>
}
export default App;
