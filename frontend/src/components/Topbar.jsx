import { useState } from "react";
import Mobilemenu from "./Mobilemenu";
import { getUser } from "../utils/factory";
import Modal from "../components/Modal";
import Report from "./Report";
import { NavLink } from "react-router-dom";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAddAlarm } from "react-icons/md";
import { useNotifications } from "../context/NotificationContext";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasNewNotification, markAsRead } = useNotifications();

  const handleNotificationClick = () => {
    markAsRead();
  };

  const user = getUser();

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
                  <IoIosNotifications
                    className=" w-12"
                    size={40}
                    color="#2F4F4F"
                  />
                ) : (
                  <IoIosNotificationsOutline
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

        <img
          src={user?.profile_picture || "/avatar.png"}
          className="ml-2 hidden md:flex self-end rounded-full h-12 w-12"
          alt="Profile Pic"
          onError={(e) => {
            e.target.src = "/avatar.png";
          }}
        />
      </div>
    </div>
  );
};

export default Topbar;
