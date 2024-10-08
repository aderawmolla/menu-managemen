// src/components/organisms/MenuManagementButton.js
import React from 'react';
import { PiSquaresFour } from "react-icons/pi";

const MenuManagementButton = ({ onClick }) => {
    return (
    <div className="flex items-center space-x-2"> {/* Flexbox for alignment */}
        <button className="w-[52px] h-[52px] bg-menu-arcticBlue rounded-full flex items-center justify-center">
      <PiSquaresFour className="text-white w-[24px] h-[24px]" /> {/* Adjust icon size inside the button */}
        </button>
        <span className="font-[Plus Jakarta Sans] font-extrabold text-[32px] leading-[40px] tracking-[-0.04em] w-[99px] h-[40px]">
          Menus
        </span>
      </div>
    );
};

export default MenuManagementButton;
