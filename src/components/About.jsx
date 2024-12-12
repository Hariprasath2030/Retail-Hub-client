import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'antd'; // Assuming you're using MUI Button

const About = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logo = "/src/assets/retail.png"; // Replace with your actual logo path

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    // Define your logout logic here
    console.log("Logging out...");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSidebarOpen && (
            <div className="toggle-button open" onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <img src={logo} alt="Logo" style={{ width: '50px', marginLeft: '15px' }} />
          <h2>SMART RETAIL HUB</h2>
        </div>
        <Button
          onClick={logout}
          style={{
            padding: '8px 15px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '16px',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#333')}
        >
          Logout
        </Button>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <br />
          <br />
          <br />
          <li>
            <Link to="/" onClick={toggleSidebar}>Dashboard</Link>
          </li>
          <li>
            <Link to="/addproduct" onClick={toggleSidebar}>Add Products</Link>
          </li>
          <li>
            <Link to="/mainCompartment" onClick={toggleSidebar}>Bill section</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>About Us</Link>
          </li>
          <li>
            <Link to="/" onClick={() => { toggleSidebar(); logout(); }}>Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? 'shift' : ''}`}>
        {isSidebarOpen && (
          <div className="toggle-button close" onClick={toggleSidebar}>
            <span></span>
            <span></span>
          </div>
        )}
        <div className="background1-image"></div>
        <h1 className="text-2xl font-bold mt-5">
          <br></br>
          <center>About Us</center>
        </h1>
        <div className="flex w-full h-[91vh] justify-center items-center">
          <div className="flex flex-col gap-3 w-[80%] mt-2 p-5 shadow-md rounded-md bg-slate-100">
            <p>
              Welcome to the Smart Retail Management System – a comprehensive,
              innovative solution designed to transform and streamline retail
              operations. Our system is built with modern technology to address
              the key challenges of inventory management, sales tracking, and
              customer engagement. By integrating advanced tools, we aim to
              empower retailers with the ability to automate processes, enhance
              customer satisfaction, and maximize business efficiency.
            </p>
            <p>
              Our platform includes an Automated Checkout System for seamless
              customer transactions, a Sales and Inventory Management Backend for
              real-time stock updates, and a Web Dashboard for analytics and
              insights, built using the powerful MERN stack.
            </p>
            <p>
              In addition, we offer a Customer Engagement Portal for personalized
              shopping experiences and a Notification and Alert System to keep
              retailers and customers updated with essential information. Our
              mission is to provide retailers with an intelligent, flexible, and
              easy-to-use system that enhances both operational efficiency and
              customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
