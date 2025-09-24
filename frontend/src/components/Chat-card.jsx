import PropTypes from "prop-types";

const ChatCard = ({ createdAt, current, handleClick, id }) => {
  function formatDate(isoDate) {
    const d = new Date(Date(isoDate));
    return d.toISOString();
  }
  return (
    <li
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(id);
        }
      }}
      className={`border-b-[1px] border-gray-500 h-[45px] text-center ${
        current === id && "current"
      }`}
    >
      {formatDate(createdAt)}
    </li>
  );
};

ChatCard.propTypes = {
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired, // Expecting a date string or Date object
  current: PropTypes.bool, // Expecting a boolean, not required
  handleClick: PropTypes.func.isRequired, // Expecting a function
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Expecting a number or string
};

ChatCard.defaultProps = {
  current: false, // Default value for current if not provided
};

export default ChatCard;
