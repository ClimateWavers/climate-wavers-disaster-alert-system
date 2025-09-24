import Menu from "./Menu";
import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";

const Mobilemenu = ({ setIsOpen }) => {
  return (
    <div className="bg-white backdrop-blur-3xl bg-opacity-100 fixed top-0 left-0 md:w-[25vw] w-[75vw] h-[100vh] z-10  max-h-screen ">
      <div className="top-0 left-0 h-[100vh]  w-[100%] border-r-[1px] rounded-3xl border-gray-200">
        <span
          className="absolute top-2 right-2 hover:cursor-pointer "
          onClick={() => setIsOpen(false)}
        >
          <IoCloseSharp size={32} />
        </span>
        <Menu setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

Mobilemenu.propTypes = {
  setIsOpen: PropTypes.func,
};
export default Mobilemenu;
