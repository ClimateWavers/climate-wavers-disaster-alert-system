import PropTypes from "prop-types";

const ChatsListCard = ({ id, handleClick, title, isCurrent }) => {
  return (
    <div
      onClick={() => {
        handleClick(id);
      }}
      className={ isCurrent ? "chat-list-card  active" : "chat-list-card"}
    >
      <p className="title">{title}</p>
    </div>
  );
};

ChatsListCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};
export default ChatsListCard;
