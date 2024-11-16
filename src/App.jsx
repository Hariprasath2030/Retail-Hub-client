import Customer from './components/Customer';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import TotalPage from './components/TotalPage';
import Bar from './components/Bar';
import BarcodeScanner from './components/BarcodeScanner';
import PDFDetails from './components/PDFDetails';
import PDFGenerator from './components/PDFGenerator';
import AddProduct from './components/AddProduct'; // Fixed component name casing

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

                {/*bill product*/}
                <Route path="/totalpage" element={<TotalPage />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/barcodescanner" element={<BarcodeScanner />} />
                <Route path="/pdfdetails" element={<PDFDetails />} />
                <Route path="/pdfgenerator" element={<PDFGenerator />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/dashboard" element={<Navigate to="/dashboard" />} />

            </Routes>
        </Router>
    );
}

export default App;
