import Customer from './components/Customer';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import BarcodeScanner from './components/BarcodeScanner';
import BillDetails from './components/BillDetails';
import MainCompartment from './components/MainCompartment';
import AddProduct from './components/Addproduct.jsx';
import About from './components/About';
import PrintListPage from './components/PrintListPage';
import Productdescription from './components/productdescription'; // Fixed component name casing

const App = () => { 
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Redirect to /dashboard if authenticated, otherwise show Home */}
                <Route path='/' element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />

                {/* Registration routes with appropriate redirection */}
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/user_register" element={isAuthenticated ? <Navigate to="/customer" /> : <UserRegister />} />

                {/* Login routes with appropriate redirection */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/user_login" element={isAuthenticated ? <Navigate to="/customer" /> : <UserLogin />} />

                {/* Protected dashboard route */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/customer" element={isAuthenticated ? <Customer /> : <Navigate to="/user_login" />} />
                <Route path="/print-list" element={isAuthenticated ? <PrintListPage /> : <Navigate to="/user_login" />} />
                {/*bill product*/}
                <Route path="/billdetails" element={<BillDetails />} />
                <Route path="/barcodescanner" element={<BarcodeScanner />} />
                <Route path="/maincompartment" element={<MainCompartment />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/productdescription" element={<Productdescription/>} />
        
            </Routes>
        </Router>
    );
}

export default App;
