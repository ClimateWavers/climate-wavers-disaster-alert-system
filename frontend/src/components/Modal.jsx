import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = ({ children, closeFn }) => {
  return ReactDOM.createPortal(
    <button
      className="h-[100vh] overflow-auto min-w-[100vw] bg-white bg-opacity-20 backdrop-blur-xl fixed inset-0 z-50 flex justify-center items-center"
      onClick={closeFn}
    >
      <button
        className="bg-white border-2 rounded-lg px-2 pt-8 text-black md:max-w-[90vw] max-w-[100vw] relative  "
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute top-1 p-4 right-1 hover:cursor-pointer"
          onClick={closeFn}
        >
          <IoCloseSharp size={25} />
        </span>
        <div>{children}</div>
      </button>
    </button>,
    document.body
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
};
export default Modal;
