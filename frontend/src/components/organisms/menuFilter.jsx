import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const MenuDropdown = () => {
  const [selectedMenu, setSelectedMenu] = useState(''); 
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    'Menu',
    'System Management',
    'KB',
    'Dashboard',
    'Reports',
    'User Management',
    'Settings',
    'Logs',
    'Support'
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
    setIsOpen(false); 
  };

  return (
    <div className="relative inline-block w-[349px] h-[74px] text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={toggleDropdown}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedMenu || 'Select Menu'}
          <FiChevronDown className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {menuItems.map((menu, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                onClick={() => handleMenuSelect(menu)}
              >
                {menu}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedMenu && (
        <div className="mt-4">
          <h4 className="text-xl font-semibold">Selected Menu:</h4>
          <p className="text-lg text-gray-700">{selectedMenu}</p>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
