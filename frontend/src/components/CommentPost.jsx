import PropTypes from "prop-types";
import Posts from "./Posts";
import { useFetchPost } from "../hooks/useFetchPost";
import { usePostMutations } from "../hooks/usePostMutations";

const CommentPost = ({ type, postId }) => {
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
  postId: PropTypes.number,
  type: PropTypes.string,
};

export default CommentPost;
