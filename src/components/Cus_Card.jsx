import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Cus_Card = (props) => {
  return (
    <>
      <div className="flex w-[250px] h-[250px] space-between shadow-md bg-slate-50 rounded-md p-2 border-2 border-solid border-slate-50">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="h-[30%] p-1 flex justify-center items-center font-bold">
            {props.title}
          </div>
          <div className="h-[30%] flex justify-center items-center gap-2">
            ₹{props.price} <FontAwesomeIcon icon={faTag} />
          </div>
          <div className="h-[20%] w-[100%] gap-2 flex justify-end">
            <button className='w-1/2 flex justify-center items-center gap-1 bg-slate-200'><FontAwesomeIcon icon={faClipboardList} />Add to List</button>
            <div className={`flex justify-center w-1/2 items-center rounded-md gap-4 font-bold ${props.quantityClass}`}>
            {props.quantity} <FontAwesomeIcon icon={faCartShopping} />
          </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default Cus_Card;
