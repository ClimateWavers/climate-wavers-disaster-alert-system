import Menu from "./Menu";
import PropTypes from "prop-types";
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { logout } from "../utils/factory";

const Mobilemenu = ({ setIsOpen }) => {
  return (
    <div className="bg-white backdrop-blur-3xl bg-opacity-100 fixed top-0 left-0 md:w-[25vw] w-[75vw] h-[100vh] z-10  max-h-screen ">
      <div className="top-0 left-0 h-[100vh]  w-[100%] border-r-[1px] rounded-3xl border-gray-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#2F4F4F]">Menu</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  logout();
                }
              }}
              className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <IoLogOutOutline size={20} />
              <span className="ml-2 text-sm font-medium">Logout</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <IoCloseSharp size={24} />
            </button>
          </div>
        </div>
        <Menu setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

Mobilemenu.propTypes = {
  setIsOpen: PropTypes.func,
};
export default Mobilemenu;
