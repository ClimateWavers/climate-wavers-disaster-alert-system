import PropTypes from "prop-types";
import Posts from "./Posts";
import { useFetchPost } from "../hooks/useFetchPost";
import { usePostMutations } from "../hooks/usePostMutations";
import { useNavigate } from "react-router-dom";

const CommentPost = ({ type, postId }) => {
  const navigate = useNavigate();
  const { data: post } = useFetchPost({
    type,
    postId,
  });

  const {
    likeMutation,
    unlikeMutation,
    repostMutation,
    unrepostMutation,
    saveMutation,
    unsaveMutation,
  } = usePostMutations();

  if (!post) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg">
          Post not found
        </div>
        <div className="text-gray-400 text-sm mt-2">
          The post you're looking for doesn't exist or has been deleted.
        </div>
        <button
          onClick={() => navigate('/app')}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <Posts
        posts={[post]}
        type={type}
        postId={postId}
        unlike={unlikeMutation}
        like={likeMutation}
        repost={repostMutation}
        unrepost={unrepostMutation}
        save={saveMutation}
        unsave={unsaveMutation}
      />
    </div>
  );
};

CommentPost.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
};

export default CommentPost;
