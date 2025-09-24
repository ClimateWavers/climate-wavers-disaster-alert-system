import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Accountcard from "./Accountcard";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import Modal from "./Modal";
import IncidentIntegration from "./IncidentIntegration";
import Createpost from "./Createpost";
import PropTypes from "prop-types";

const Posts = ({
  type,
  posts,
  postId,
  unlike,
  like,
  repost,
  unrepost,
  save,
  unsave,
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [localPosts, setLocalPosts] = useState(() => {
    // Get posts from localStorage if available
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });
  const navigate = useNavigate();

  // Update localPosts whenever posts prop changes
  useEffect(() => {
    if (posts && posts.length > 0) {
      setLocalPosts(posts);
    }
  }, [posts]);

  // Save updated posts to localStorage whenever localPosts change
  useEffect(() => {
    if (localPosts && localPosts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(localPosts));
    }
  }, [localPosts]);
  
  const handleOptimisticUpdate = (postId, changes) => {
    setLocalPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...changes } : post
      )
    );
  };

  const handleLike = (post) => {
    const updatedPost = { ...post, is_reacted: !post.is_reacted };
    if (updatedPost.is_reacted) {
      updatedPost.total_reactions += 1;
      handleOptimisticUpdate(post.id, updatedPost);
      like.mutate({ postType: type, post: post.id });
    } else {
      updatedPost.total_reactions -= 1;
      handleOptimisticUpdate(post.id, updatedPost);
      unlike.mutate({ postType: type, post: post.id });
    }
  };

  const handleRepost = (post) => {
    const updatedPost = { ...post, is_reposted: !post.is_reposted };
    if (updatedPost.is_reposted) {
      updatedPost.total_reposts += 1;
      handleOptimisticUpdate(post.id, updatedPost);
      repost.mutate({ postType: type, post: post.id });
    } else {
      updatedPost.total_reposts -= 1;
      handleOptimisticUpdate(post.id, updatedPost);
      unrepost.mutate({ postType: type, post: post.id });
    }
  };

  const handleSave = (post) => {
    const updatedPost = { ...post, is_bookmarked: !post.is_bookmarked };
    if (updatedPost.is_bookmarked) {
      updatedPost.total_bookmarks += 1;
      handleOptimisticUpdate(post.id, updatedPost);
      save.mutate({ postType: type, post: post.id });
    } else {
      updatedPost.total_bookmarks -= 1;
      handleOptimisticUpdate(post.id, updatedPost);
      unsave.mutate({ postType: type, post: post.id });
    }
  };

  const commentPage = (post) => {
    if (type === "post") {
      navigate(`/${post.id}/comments`, {
        state: { post: post },
      });
    } else if (type === "comments") {
      navigate(`/${postId}/${post.id}/comments`, {
        state: { post: post },
      });
    }
  };

  return (
    <div className="py-3 text-start max-sm:max-w-full break-words overflow-hidden">
      {posts?.length > 0 ? (
        localPosts.map((post) => (
          <div
            key={`${post?.user?.id}${post?.id}`}
            className="border-b-[1px] border-gray-100 py-4"
          >
            {isCommentModalOpen && (
              <Modal closeFn={() => setIsCommentModalOpen(false)}>
                <Createpost
                  parentId={type === "comments" ? commentId : ""}
                  postId={type === "post" ? commentId : postId}
                  type="comments"
                  closeModal={() => setIsCommentModalOpen(false)}
                />
              </Modal>
            )}
            <Accountcard user={post?.user} />
            <button onClick={() => commentPage(post)} className="w-full">
              <p
                className="text-left md:text-2xl max-sm:text-[20px] font-serif px-3 my-3 "
                style={{ whiteSpace: "pre-wrap" }}
              >
                {post?.content?.split(/(\s+)/).map((word, index) =>
                  word.startsWith("#") ? (
                    <span key={index} style={{ color: "#047857" }}>
                      {word}
                    </span>
                  ) : (
                    word
                  )
                )}
              </p>
              {post?.image && (
                <img
                  className="w-[100%] px-3 rounded-2xl"
                  src={post.image}
                  alt="Post content"
                />
              )}
            </button>
            <div className="flex flex-row justify-between px-3 mt-2 ">
              <Link onClick={() => setIsCommentModalOpen(true)}>
                <button
                  className="flex flex-row items-center px-3 mt-2"
                  onClick={() => {
                    setIsCommentModalOpen(true);
                    setCommentId(post.id);
                  }}
                >
                  <IoChatboxEllipsesOutline size={25} />
                  <p className="text-xs ml-1 ">{post?.total_comments}</p>
                </button>
              </Link>
              <button
                className="flex flex-row items-center px-3 mt-2"
                onClick={() => handleLike(post)}
              >
                {post?.is_reacted ? (
                  <AiFillHeart
                    size={25}
                    color={"#FF0000"}
                    className="transition active:animate-ping ease-in-out duration-150 hover:scale-125"
                  />
                ) : (
                  <AiOutlineHeart
                    size={25}
                    className="transition active:animate-ping ease-in-out duration-150 hover:scale-125"
                  />
                )}
                <p className="text-xs ml-1 ">{post?.total_reactions}</p>
              </button>
              <button
                className="flex flex-row items-center px-3 mt-2"
                onClick={() => handleRepost(post)}
              >
                <AiOutlineRetweet
                  size={25}
                  className="transition active:animate-ping ease-in-out duration-150 hover:scale-125"
                  color={post?.is_reposted ? "#047857" : ""}
                />
                <p className="text-xs ml-1 ">{post?.total_reposts}</p>
              </button>
              <button
                className="flex flex-row items-center px-3 mt-2"
                onClick={() => handleSave(post)}
              >
                {post?.is_bookmarked ? (
                  <PiBookmarkFill
                    size={25}
                    color={"rgb(0 128 128 / 1)"}
                    className="transition ease-in-out active:animate-ping duration-150 hover:scale-125"
                  />
                ) : (
                  <PiBookmark
                    size={25}
                    className="transition ease-in-out active:animate-ping duration-150 hover:scale-125"
                  />
                )}
                <p className="text-xs ml-1 ">{post?.total_bookmarks}</p>
              </button>
              <div className="flex flex-row items-center">
                <IncidentIntegration />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="px-4">{type === "post" ? "Fetching posts..."  : "" }</p>
      )}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  postId: PropTypes.string,
  unlike: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  repost: PropTypes.object.isRequired,
  unrepost: PropTypes.object.isRequired,
  save: PropTypes.object.isRequired,
  unsave: PropTypes.object.isRequired,
};

export default Posts;
