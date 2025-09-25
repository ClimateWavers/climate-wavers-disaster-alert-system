import { NavLink } from "react-router-dom";
import { getUser } from "../utils/factory";
import { MdOutlineCampaign, MdCampaign } from "react-icons/md";
import { RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const Footer = () => {
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    setUser(getUser())
  }, [])

  const activeStyle = {};

  return (
    <div className="flex w-full">
      {/* Menu */}
      <div
        className="list-none w-[100%] px-2 fixed z-30 bg-white bottom-0 text-base
        flex justify-between items-center"
      >
        <NavLink
          to={"/app"}
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <img
              alt=""
              src={isActive ? "../../home.png" : "../../home.svg"}
              className="w-[30px] h-[30px] object-contain"
            />
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={"/app/community"}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <img
              alt=""
              src={isActive ? "../../people1.png" : "../../people.png"}
              className="w-[30px] h-[30px] object-contain"
            />
          )}
        </NavLink>

        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/app/${user.id}/profile`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <img
              alt=""
              src={isActive ? "../../profile1.png" : "../../profile.png"}
              className="w-[30px] h-[30px] object-contain"
            />
          )}
        </NavLink>
       
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={`/app/donations`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <img
              alt=""
              src={isActive ? "../../wallet1.png" : "../../wallet.png"}
              className="w-[30px] h-[30px] object-contain"
            />
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={"/campaigns"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) =>
            isActive ? (
              <MdCampaign className="w-[38px]" size={35} color="#2F4F4F" />
            ) : (
              <MdOutlineCampaign className="w-[38px]" size={35} color="#434343"/>
            )
          }
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/disasters`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
            {({ isActive }) =>
              isActive ? (
                <RiAlarmWarningFill
                  className="w-[30px]"
                  size={35}
                  color="#EA4335"
                />
              ) : (
                <RiAlarmWarningLine
                  className="w-[30px] "
                  size={35}
                  color="#434343"
                />
              )
            }
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={"/app/notifications"}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <img
              alt=""
              src={isActive ? "../../img_notification_blue_gray_900.png" : "../../img_notification.svg"}
              className="w-[30px] h-[30px] object-contain"
            />
          )}
        </NavLink>
       
      </div>
    </div>
  );
};

export default Footer;
