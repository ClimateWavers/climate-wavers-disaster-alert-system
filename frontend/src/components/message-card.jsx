import { getUser } from "../utils/factory";
import PropTypes from "prop-types"

const MessageCard = ({body, postedBy}) =>{
    const user = getUser()

    return  <div 
    // className={` flex flex-row  ${user.id === postedBy ? "items-right self-end ": "items-right self-start "} my-2`}
    className={`message-card ${user.id == postedBy && "me"}`}
    >
        <p style={{ whiteSpace: 'pre-wrap' }}>{body}</p>
    </div>
}

MessageCard.propTypes = {
  postedBy: PropTypes.string,
  body: PropTypes.string,
};

export default MessageCard