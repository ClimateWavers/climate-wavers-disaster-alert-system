import { useState, useRef, useEffect } from "react";
import Mobilemenu from "./Mobilemenu";
import { getUser, logout } from "../utils/factory";
import Modal from "../components/Modal";
import Report from "./Report";
import { NavLink } from "react-router-dom";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineAddAlarm } from "react-icons/md";
import { IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { useNotifications } from "../context/NotificationContext";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { hasNewNotification, markAsRead } = useNotifications();
  const userMenuRef = useRef(null);

  const handleNotificationClick = () => {
    markAsRead();
  };

  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const currentUser = getUser();
    console.log("Topbar - current user:", currentUser);
    setUser(currentUser);
    
    // Listen for user updates
    const handleUserUpdate = () => {
      const updatedUser = getUser();
      console.log("Topbar - user updated event received");
      console.log("Topbar - updated user data:", updatedUser);
      console.log("Topbar - profile_picture:", updatedUser?.profile_picture);
      console.log("Topbar - profile_pic:", updatedUser?.profile_pic);
      console.log("Topbar - picture:", updatedUser?.picture);
      setUser(updatedUser);
    };
    
    window.addEventListener('userUpdated', handleUserUpdate);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Handle click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-50 bg-white flex items-center justify-between border-b border-gray-200 shadow-sm h-16 px-4 w-full">
      <button onClick={() => setIsOpen(true)}>
        <img
          src={user?.profile_picture || "/avatar.png"}
          className="md:hidden self-end rounded-full h-12 w-12"
          alt="Profile Pic"
          onError={(e) => {
            e.target.src = "/avatar.png";
          }}
        />
      </button>

      {isOpen === true ? <Mobilemenu setIsOpen={setIsOpen} /> : null}
      <div className="hidden md:flex items-center px-4">
        <img alt="logo" src="/logo.jpg" className="h-10 w-auto" />
      </div>
      <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
        <input
          className="w-full h-10 px-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent"
          type="text"
          placeholder="🔍 Search"
        />
      </div>
      <div className="flex  justify-end self-center">
        <button
          className="hidden md:flex items-center px-4 py-2 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors font-medium"
          onClick={() => setIsModalOpen(true)}
        >
          Report Disaster
        </button>

        {isModalOpen && (
          <Modal closeFn={() => setIsModalOpen(false)}>
            <Report closeModal={() => setIsModalOpen(false)} />
          </Modal>
        )}
        <div className="flex gap-x-4">
          <NavLink
            to={`/app/notifications`}
            className="flex"
            onClick={() => setIsOpen(false)}
            end
          >
            {({ isActive }) => (
              <div className="w-[200%] md:px-4  flex relative">
                {isActive ? (
                  <IoNotifications
                    className=" w-12"
                    size={40}
                    color="#2F4F4F"
                  />
                ) : (
                  <IoNotificationsOutline
                    className="w-12"
                    size={40}
                    onClick={handleNotificationClick}
                  />
                )}
                {hasNewNotification && (
                  <span className="absolute top-[2px] md:right-[26px] right-2 w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </div>
            )}
          </NavLink>
          <MdOutlineAddAlarm
            className="md:hidden"
            size={35}
            color="#434343"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="ml-2 hidden md:flex self-end rounded-full h-12 w-12 overflow-hidden hover:ring-2 hover:ring-[#2F4F4F] transition-all duration-200"
          >
        <img
              src={user?.profile_picture || "/avatar.png"}
              className="w-full h-full object-cover"
          alt="Profile Pic"
              onError={(e) => {
                e.target.src = "/avatar.png";
              }}
            />
          </button>
          
          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-14 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <NavLink
                to={`/app/${user?.id}/profile`}
                className="flex items-center px-4 py-3 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <IoPersonOutline className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-sm font-medium">Profile</span>
              </NavLink>
              
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                  }
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-red-50 text-red-600 transition-colors duration-150"
              >
                <IoLogOutOutline className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
