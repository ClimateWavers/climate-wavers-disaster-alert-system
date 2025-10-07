import { useEffect } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { usePostMutations } from "../hooks/usePostMutations";
import { usePagination } from "../hooks/usePagination";

const Postcomponent = ({ type, postId, comment, itemsPerPage = 10 }) => {
  const { data: posts, error } = useFetchPosts({
    type,
    postId,
    comment,
  });

  const {
    likeMutation,
    unlikeMutation,
    repostMutation,
    unrepostMutation,
    saveMutation,
    unsaveMutation,
  } = usePostMutations();

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
  } = usePagination(posts || [], itemsPerPage);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error("An error occurred while fetching posts");
    }
  }, [error]);

  return (
    <div className="space-y-6">
      <Posts
        posts={paginatedData}
        type={type}
        postId={postId}
        unlike={unlikeMutation}
        like={likeMutation}
        repost={repostMutation}
        unrepost={unrepostMutation}
        save={saveMutation}
        unsave={unsaveMutation}
      />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            className="justify-center"
          />
        </div>
      )}
    </div>
  );
};

Postcomponent.propTypes = {
  type: PropTypes.string,
  comment: PropTypes.string,
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Postcomponent;
