import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="flex w-full h-[90vh] justify-center items-center flex-col gap-10 bg-center bg-[url('https://www.vasyerp.com/assets-new/images/Smart%20Retail%20Solution/Analytics%20and%20reports.webp')] bg-no-repeat z-10">
        <div className="backdrop-blur-sm h-auto p-5 w-[1200px] flex justify-center items-center flex-col gap-10 bg-center">
          <div className="text-3xl font-bold">
            "Revolutionize Your Retail Business with Smart Retail Hub"
          </div>
          <div className="text-2xl">
            "Automated systems to optimize inventory, enhance customer
            experience, and drive s /ales growth."
          </div>
        </div>
        <div className="">
          <Link to={"/register"}>
            <button className="p-3 bg-blue-500 h-auto rounded-md text-white">
              Explore Features
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
