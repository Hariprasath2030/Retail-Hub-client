import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCartShopping, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Cus_Card = ({ title, price, quantity, quantityClass, description, image, onAddToList }) => {
  return (
    <div className="flex w-[250px] h-[350px] shadow-md bg-slate-50 rounded-md p-2 border-2 border-solid border-slate-50">
      <div className="w-full h-full flex flex-col justify-between">
        {/* Image Section */}
        <div className="h-[40%] flex justify-center items-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Title Section */}
        <div className="h-[15%] p-1 flex justify-center items-center font-bold text-center">
          {title}
        </div>

        {/* Description Section */}
        <div className="h-[15%] p-1 text-center text-sm text-gray-600">
          {description}
        </div>

        {/* Price Section */}
        <div className="h-[15%] flex justify-center items-center gap-2 text-lg">
          ₹{price} <FontAwesomeIcon icon={faTag} />
        </div>

        {/* Actions Section */}
        <div className="h-[15%] w-full flex justify-between items-center gap-2">
          <button
            className="w-1/2 flex justify-center items-center gap-1 bg-slate-200 p-1 rounded-md hover:bg-slate-300"
            onClick={onAddToList}
          >
            <FontAwesomeIcon icon={faClipboardList} /> Add to List
          </button>

          <div className={`flex justify-center w-1/2 items-center rounded-md gap-2 font-bold p-1 ${quantityClass}`}>
            {quantity} <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cus_Card;
