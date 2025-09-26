import { NavLink } from "react-router-dom";
import { MdOutlineCampaign, MdCampaign } from "react-icons/md";
import { RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { FaTree } from "react-icons/fa";

const Footer = ({ setIsOpen }) => {
  const activeStyle = {};

  return (
    <div className="flex w-full">
      {/* Menu */}
      <div
        className="list-none w-[100%] px-2 fixed z-30 bg-white bottom-0 text-base
        flex justify-between"
      >
        <NavLink
          to={"/onboarding/home"}
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <img
              alt="home"
              src={isActive ? "../../home.png" : "../../home.svg"}
              className=" w-[30px]"
            />
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={"/onboarding/community"}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <img
              alt="community"
              src={isActive ? "../../people1.png" : "../../people.png"}
              className="  w-[30px]"
            />
          )}
        </NavLink>

        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/onboarding/profile`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <img
              alt="profile"
              src={isActive ? "../../profile1.png" : "../../profile.png"}
              className="  w-[30px]"
            />
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={`/onboarding/bot`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <img src="../../waverbot.png" className=" w-auto w-[2rem]" />
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={`/onboarding/notifications`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <img
              alt=""
              src={isActive ? "../../notifications1.png" : "../../notifications.png"}
              className=" w-auto w-[30px]"
            />
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={"/onboarding/plant-tree"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) => (
            <FaTree 
              className="w-[30px]" 
              size={30} 
              color={isActive ? "#10B981" : "#434343"} 
            />
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/onboarding/disasters`}
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
       
      </div>
    </div>
  );
};

export default Footer;
