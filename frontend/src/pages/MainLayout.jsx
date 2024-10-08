import React from 'react';
import { MdMenuOpen } from "react-icons/md";
import { useRecoilState } from 'recoil';
import { sidebarState } from '../recoil/menuState';
import SideBar from '../components/SideBar';
import Dashboard from '../components/organisms/dashbord';

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarState);

    // Handle sidebar toggle
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main content area */}
            <div
                className={`transition-all duration-300 ease-in-out 
                ${isSidebarOpen ? 'w-[calc(100%-240px)]' : 'w-full'}`}
            >
                {/* Sidebar toggle button (shown when sidebar is closed) */}
                {!isSidebarOpen && (
                    <div className="absolute top-6 left-4">
                        <button
                            onClick={toggleSidebar}
                            className="bg-gray-800 text-white rounded-full p-2"
                        >
                            <MdMenuOpen className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {/* Dashboard Layout */}
                <Dashboard />
            </div>
        </div>
    );
};

export default MainLayout;
