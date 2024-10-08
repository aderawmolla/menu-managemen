import { useState } from "react";
import TreeDropdown from "./menuTree";
import MenuManagementButton from "./menuManagementButton";
import { FaFolder } from "react-icons/fa";
import MenuDropdown from '../organisms/menuFilter'
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" w-full flex flex-col gap-12 py-4 px-12">
      <div className="flex items-center gap-2">
        <FaFolder className="text-gray-500 w-6 h-6" /> {/* Icon */}
        <p className="text-sm font-semibold text-gray-700">
          <span className="text-gray-400 px-1">/</span> Menus
        </p>
      </div>

      <MenuManagementButton />
      <MenuDropdown/>
      <TreeDropdown />
    </div>
  );
}
