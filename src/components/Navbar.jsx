import React from "react";
import { Link } from "react-router-dom";
import { UserRoundPen } from "lucide-react";
const Navbar = () => {
  return (
    <>
      <div className="bg-slate-100 h-[4.2rem]   flex flex-row font-serif shadow-md">
        <div className="w-1/2 h-full flex p-2 ml-10 items-center">
          <Link to={"/"}>
            <div className="w-auto p-2">
              <h1>Retail Hub</h1>
            </div>
          </Link>
        </div>
        <div className="w-1/2 h-full flex justify-end">
          <ul className="list-none flex flex-row gap-16 mt-5 mr-10">
            <Link to={"/register"}>
              <li className="hover:border-b-4 hover:border-slate-400">
                Register
              </li>
            </Link>
            <Link to={"/login"}>
              <li className="hover:border-b-4  hover:border-slate-400">
                Login
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:border-b-4 hover:border-slate-400">
                About us
              </li>
            </Link>
            <Link to={"/customer"}>
              <li className="hover:border-b-4 hover:border-slate-400">
                <UserRoundPen/>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
