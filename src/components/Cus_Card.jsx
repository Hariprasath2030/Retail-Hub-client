import React from "react";
import { ShoppingCart, Zap} from "lucide-react";
const Cus_Card = (props) => {
  return (
    <>
      <div className="flex w-[300px] h-auto shadow-md bg-slate-100 rounded-md p-2 border-2 border-solid border-slate-50">
        <div className="w-full h-full flex flex-col gap-1">
          <img
            src={props.url}
            className="h-[280px] bg-slate-400  shadow-md rounded-md w-auto flex justify-center items-center"
            alt="Product_image"
          />
          <div className="h-[15%] p-1 flex justify-center items-center font-bold">
            {props.title}
          </div>
          <div className="h-[35%] flex justify-center items-center">
            {props.desc}
          </div>
          <div className="h-[15%] flex justify-center items-center font-bold">
            ₹{props.price}
          </div>
          <div className="h-[75px] w-full flex gap-3">
            <button className="w-1/2 flex bg-slate-300 hover:bg-slate-200 hover:shadow-lg justify-center items-center rounded-sm">
              <ShoppingCart />
              &nbsp;Add to Cart
            </button>
            <button className="w-1/2 flex bg-slate-400 hover:bg-slate-500 hover:shadow-lg justify-center items-center rounded-sm">
              <Zap />
              &nbsp;Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cus_Card;
