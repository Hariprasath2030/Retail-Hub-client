// Navbar.js
import logo from "/src/assets/retail.png"; // Ensure this path is correct
import "../App.css"
const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
      <h2>SMART RETAIL HUB</h2>
    </div>
   
  </nav>
);

export default Navbar;
