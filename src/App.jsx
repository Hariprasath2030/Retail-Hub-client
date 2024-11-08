// client/src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


const App = () => { 
    
    const { isAuthenticated } = useAuth();
    return <Router>
        <Routes>
            <Route path='/' element={ !isAuthenticated ? <Home/> : <Navigate to="/Register" /> } />
            <Route path='/' element={ !isAuthenticated ? <Home/> : <Navigate to="/ULogin" /> } />
            <Route path="/Register" element={ !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={ !isAuthenticated ? <Login/> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/login" /> } />


        </Routes>
    </Router>
}
export default App;
