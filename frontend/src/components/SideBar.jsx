import React from 'react';
import { MdMenuOpen } from "react-icons/md";
import logo from '../assets/svg-gobbler 1.png';
import { FaFolder } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil'; // Import the Recoil hook
import { sidebarState } from '../recoil/menuState';

const Links = [{
    title: 'System',
    path: '/',
    icon: <FaFolder className='text-gray-500 w-6 h-6' />
  },
  {
    title: 'System Code',
    path: '/systemcode',
    icon: <PiSquaresFour className='text-gray-500 w-6 h-6' />
  },
  {
    title: 'Properties',
    path: '/properties',
    icon: <PiSquaresFour className='text-gray-500 w-6 h-6' />
  },
  { 
    title: 'Menus',
    path: '/menus',
    icon: <PiSquaresFour className='text-gray-500 w-6 h-6' />,
  },
  { 
    title: 'API List',
    path: '/api',
    icon: <PiSquaresFour className='text-gray-500 w-6 h-6' />
  },
  { 
    title: 'Users & Group',
    path: '/usersandgroup',
    icon: <FaFolder className='text-gray-500 w-6 h-6' />
  },
  {
    title: 'Competition',
    path: '/competation',
    icon: <FaFolder className='text-gray-500 w-6 h-6' />
  }
];

const SideBar = () => {
    const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarState);

    // Handle the click event to toggle the sidebar
    const handleClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <section
            className={`flex flex-col h-[100vh] rounded-[16px] space-y-3 px-2max-w-[240px] bg-menu-blueGray-800
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[256px]'}`}
        >
            <div className="flex justify-between items-center px-2 py-8">
                <div className='w-[70px] h-[21px] hidden md:flex'>
                    <img src={logo} alt="logo" />
                </div>
                <button onClick={handleClick} className='bg-menu-blueGray-800 text-white rounded-full p-1'>
                    <MdMenuOpen className='w-6 h-6' />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="md:flex md:flex-col space-y-2 hidden ">
                {Links.map((link) => (
                    <NavLink
                        to={link.path}
                        key={link.title}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-[12px] font-bold text-sm 
                            ${isActive ? 'bg-menu-lineGrean text-menu-blueGray-900  mx-2' : 'text-menu-blueGray-400 hover:bg-menu-blueGray-600 hover:text-white'}`
                        }
                    >
                        {link.icon}
                        <span>{link.title}</span>
                    </NavLink>
                ))}
            </nav>
        </section>
    );
};

export default SideBar;
