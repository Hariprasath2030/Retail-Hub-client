import React from "react";
import "react-router-dom";
const About = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mt-5">
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
            {" "}
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
    </>
  );
};

export default About;
