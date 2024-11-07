import React from "react";
import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <>
      <div className="h-[90vh] w-screen flex justify-center absolute items-center z-50">
        <div className="h-100 w-[30%] pb-10 flex flex-col justify-center items-center bg-white rounded-md shadow-md">
          <div className="w-full flex justify-end align-top">
            <Link to={"/"}>
              <button>
                <CircleX className="bg-red-600 rounded-full text-white" />
              </button>
            </Link>
          </div>
          <form className="flex flex-col justify-center w-[80%] h-[80%] rounded-2xl items-center gap-4">
            <h1 className="text-lime-600 font-serif text-2xl font-medium">
              Register Form
            </h1>
            <input
              type="text"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-lime-500 shadow-inner"
              placeholder="Name"
            />
            <input
              type="email"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-lime-500 shadow-inner"
              placeholder="Email"
            />
            <input
              type="phone"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-lime-500 shadow-inner"
              placeholder="phone"
            />
            <input
              type="password"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-lime-500 shadow-inner"
              placeholder="password"
            />
            <input
              type="password"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-lime-500 shadow-inner"
              placeholder="re-enter password"
            />
            <button
              type="submit"
              className="h-12 bg-lime-600 rounded-md w-full text-white p-2 font-serif"
            >
              Register
            </button>
            <div className="">
              Have already an account ?&nbsp;
              <Link to={"/login"} className="text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
