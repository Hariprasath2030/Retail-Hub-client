import React from "react";
import { ShoppingCart, Zap} from "lucide-react";
const Cus_Card = (props) => {
  return (
    <>
      <div className="flex w-[250px] h-auto shadow-md bg-slate-100 rounded-md p-2 border-2 border-solid border-slate-50">
        <div className="w-full h-full flex flex-col gap-1">
          <div className="h-[35%] p-1 flex justify-center items-center font-bold">
            {props.title}
          </div>
          <div className="h-[35%] flex justify-center items-center">
            {props.desc}
          </div>
          <div className="h-[30%] flex justify-center items-center font-bold">
            ₹{props.price}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cus_Card;
