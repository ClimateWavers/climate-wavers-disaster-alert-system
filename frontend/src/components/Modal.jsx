import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = ({ children, closeFn }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeFn}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={closeFn}
          >
            <IoCloseSharp size={24} className="text-gray-500" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
};
export default Modal;
