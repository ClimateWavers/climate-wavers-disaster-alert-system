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
    <div className=" fixed z-50 bg-white flex  items-center justify-between md:border-b-1 border-[#000000] md:shadow-xl md:h-[80px] px-2 py-2  w-[100%]  ">
      <button onClick={() => setIsOpen(true)}>
        <img
          src={user?.profile_picture}
          className="md:hidden self-end rounded-full h-12 w-12"
          alt="Profile Pic"
        />
      </button>

      {isOpen === true ? <Mobilemenu setIsOpen={setIsOpen} /> : null}
      <div className=" hidden md:flex justify-self-center md:justify-self-start px-4">
        <img alt="logo" src="../../Logo.png" />
      </div>
      <div className="px-8 w-[80%] justify-center  flex hidden md:flex">
        <input
          className="bg-graylight-300 h-[60px] relative left-[6%] p-1 md:p-2 w-[83%] outline-[2px]  border border-[#dadada] focus:border-2 focus:outline-2 focus:outline-gray-300 border-gray-200 rounded-2xl text-graydark "
          type="text"
          placeholder="🔍 Search"
        />
      </div>
      <div className="flex  justify-end self-center">
        <button
          className="text-center hidden md:grid items-center  mx-4 font-semibold bg-linear  text-white shadow-xl self-center shadow-white-300 lg:w-[12vw] w-[15vw]  px-4 md:h-[50px] lg:text-xl  rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="leading-5 self-center"> Report Disaster</p>
        </button>

        {isModalOpen && (
          <Modal closeFn={() => setIsModalOpen(false)}>
            <Report closeModal={() => setIsModalOpen(false)} />
          </Modal>
        )}
        <div className="flex gap-x-4">
          <NavLink
            to={`/notifications`}
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
                    color="#008080"
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
          src={user?.profile_picture}
          className="ml-2 hidden md:flex self-end rounded-full h-12 w-12"
          alt="Profile Pic"
        />
      </div>
    </div>
  );
};

export default Topbar;
