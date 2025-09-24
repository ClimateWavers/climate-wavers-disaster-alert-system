import Postcomponent from "../components/Postcomponent";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CommentPost from "../components/CommentPost";
import Createcomment from "../components/Createcomment";

const Comment = ({ type }) => {
  const { postId, commentId } = useParams();

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <CommentPost type={type} postId={commentId ? commentId : postId} />
      <div className=" md:border-2 max-sm:border-b-2 border-t-0 rounded-lg shadow-xl shadow-white md:h-40 max-sm:py-2 mt-[-10px] ">
        <Createcomment type={"comments"} postId={postId} parentId={commentId}/>
      </div>
      <div className="md:ml-8 ml-2">
        <Postcomponent type={"comments"} postId={postId} comment={commentId} />
      </div>
    </div>
  );
};

Comment.propTypes = {
  type: PropTypes.string,
};

export default Comment;
