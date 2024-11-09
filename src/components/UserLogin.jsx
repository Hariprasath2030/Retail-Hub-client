import React from "react";
import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";
const UserLogin = () => {
  return (
    <>
      <div className="flex  w-[1000px] justify-center h-auto">
        <div className="h-auto w-[40%] pb-10 flex flex-col justify-center items-center bg-white rounded-md shadow-md">
          <div className="w-full flex justify-end align-top">
            <Link to={"/"}>
              <button>
                <CircleX className="bg-red-600 rounded-full text-white" />
              </button>
            </Link>
          </div>
          <form className="flex flex-col justify-center w-[80%] h-[80%] rounded-2xl items-center gap-4">
            <h1 className="text-blue-600 font-serif text-2xl font-medium">
              User Login Form
            </h1>
            <input
              type="email"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-blue-500 shadow-inner"
              placeholder="Email"
            />
            <input
              type="password"
              className="font-serif p-2 rounded-md w-full outline-none focus:border-2 focus:border-r-4 focus:border-b-4 border-blue-500 shadow-inner"
              placeholder="password"
            />
            <button
              type="submit"
              className="h-12 bg-blue-600 rounded-md w-full text-white p-2 font-serif"
            >
              Login
            </button>
            <Link to={"/user_register"} className="text-blue-600">
              Sign up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
