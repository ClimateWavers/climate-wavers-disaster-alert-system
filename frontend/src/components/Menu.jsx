import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import Createpost from "./Createpost";
import { getUser } from "../utils/factory";
import { MdOutlineCampaign, MdCampaign } from "react-icons/md";
import { RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const Menu = ({ setIsOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser());
  }, []);

  const activeStyle = {
    borderLeft: "5px solid #008080",
    borderRadius: "20px",
    paddingLeft: "4px",
    backgroundColor: "#00808014",
    width: "100%",
    height: "60px",
    fontWeight: "500",
  };

  return (
    <div className="flex flex-col px-2 w-[100%] md:pl-1 pl-4">
      {/* Menu */}
      <div
        className="list-none text-base lg:text-2xl  md:text-lg
        flex flex-col lg:gap-y-4 pt-10 w-auto mb-10"
      >
        <NavLink
          to={"/"}
          className="flex items-center py-2 lg:px-8  text-xl md:text-2xl"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                alt="home"
                src={isActive ? "../../home.png" : "../../home.svg"}
                className="mr-4 w-auto"
              />
              Home
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  text-xl md:text-2xl"
          to={"/community"}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../people1.png" : "../../people.png"}
                className="mr-4 w-auto"
              />
              Community
            </>
          )}
        </NavLink>

        <NavLink
          className="flex items-center py-2 lg:px-8  text-xl md:text-2xl"
          to={`/${user.id}/profile`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../profile1.png" : "../../profile.png"}
                className="mr-4 w-auto"
              />
              Profile
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  text-xl md:text-2xl"
          to={`/bot`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <img src="../../waverbot.png" className="mr-4 w-auto" />
          WaverX
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  text-xl md:text-2xl"
          to={`/wallet`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../wallet1.png" : "../../wallet.png"}
                className="mr-4 w-auto"
              />
              Wallet
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  text-xl md:text-2xl"
          to={"/campaigns"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) => (
            <div className="w-[200%] flex">
              {isActive ? (
                <MdCampaign className="mr-2" size={40} color="#008080" />
              ) : (
                <MdOutlineCampaign className="mr-2" size={40} color="#434343" />
              )}
              <p className="ml-1">Campaigns</p>
            </div>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  text-xl md:text-2xl"
          to={`/disasters`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) => (
            <div className="w-[200%] flex">
              {isActive ? (
                <RiAlarmWarningFill
                  className="mr-2"
                  size={35}
                  color="#EA4335"
                />
              ) : (
                <RiAlarmWarningLine
                  className="mr-2"
                  size={35}
                  color="#434343"
                />
              )}
              <p className="self-center pl-2"> Disasters </p>
            </div>
          )}
        </NavLink>
        {/* <NavLink
          to={`/notifications`}
          className="flex items-center py-2 lg:px-8  text-xl md:text-2xl"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <div className="w-[200%] flex max-sm:">
              {isActive ? (
                <IoIosNotifications
                  className="mr-2"
                  size={40}
                  color="#008080"
                />
              ) : (
                <IoIosNotificationsOutline className="mr-2" size={40} />
              )}
              <p className="self-center"> Notifications</p>
            </div>
          )}
        </NavLink> */}
      </div>
      {/* Post btn */}
      <button
        // to={"./createpost"}
        className="text-xl text-center font-semibold bg-[#008080] text-white shadow-xl self-center shadow-white-300 w-[80%] max-sm:w-[80%] py-4 rounded-3xl"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Post
      </button>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <Createpost
            type={"post"}
            closeModal={() => {
              setIsModalOpen(false);
              setIsOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Menu;
