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
    if (posts && Array.isArray(posts) && posts.length > 0) {
      setLocalPosts(posts);
    } else if (posts && typeof posts === 'string') {
      // Handle case where posts is a string (error message)
      console.warn('Posts prop is a string:', posts);
      setLocalPosts([]);
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {Array.isArray(localPosts) && localPosts.length > 0 ? (
        localPosts.map((post) => (
          <div
            key={`${post?.user?.id}${post?.id}`}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 hover:-translate-y-1 group"
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
            <div className="p-6 pb-4">
              <Accountcard user={post?.user} />
            </div>
            <button onClick={() => commentPage(post)} className="w-full text-left group-hover:bg-gray-50/50 transition-colors duration-200">
              <div className="px-6 pb-4">
                <p
                  className="text-gray-900 text-lg leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-200"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {post?.content?.split(/(\s+)/).map((word, index) =>
                    word.startsWith("#") ? (
                      <span key={index} className="text-[#2F4F4F] font-semibold hover:text-[#1a3a3a] transition-colors duration-200">
                        {word}
                      </span>
                    ) : (
                      word
                    )
                  )}
                </p>
                {post?.image && (
                  <div className="mt-4">
                    <img
                      className="w-full rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      src={post.image}
                      alt="Post content"
                    />
                  </div>
                )}
                {post?.video && (
                  <div className="mt-4">
                    <video
                      className="w-full rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      controls
                      preload="metadata"
                    >
                      <source src={post.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {post?.audio && (
                  <div className="mt-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 group-hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#2F4F4F] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.808L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.808a1 1 0 011.617.808zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Audio Recording
                          </p>
                          <p className="text-xs text-gray-500">
                            Click to play
                          </p>
                        </div>
                        <audio
                          className="flex-1"
                          controls
                          preload="metadata"
                        >
                          <source src={post.audio} type="audio/mpeg" />
                          <source src={post.audio} type="audio/wav" />
                          <source src={post.audio} type="audio/ogg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </button>
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
              <Link onClick={() => setIsCommentModalOpen(true)}>
                <button
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group/btn"
                  onClick={() => {
                    setIsCommentModalOpen(true);
                    setCommentId(post.id);
                  }}
                >
                  <IoChatboxEllipsesOutline 
                    size={20} 
                    className="text-gray-500 group-hover/btn:text-blue-500 transition-colors duration-200" 
                  />
                  <span className="text-sm font-medium text-gray-500 group-hover/btn:text-blue-500 transition-colors duration-200">
                    {post?.total_comments || 0}
                  </span>
                </button>
              </Link>
              
              <button
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 group/btn"
                onClick={() => handleLike(post)}
              >
                {post?.is_reacted ? (
                  <AiFillHeart
                    size={20}
                    className="text-red-500 transition-all duration-200 group-hover/btn:scale-110"
                  />
                ) : (
                  <AiOutlineHeart
                    size={20}
                    className="text-gray-500 group-hover/btn:text-red-500 transition-all duration-200 group-hover/btn:scale-110"
                  />
                )}
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  post?.is_reacted ? 'text-red-500' : 'text-gray-500 group-hover/btn:text-red-500'
                }`}>
                  {post?.total_reactions || 0}
                </span>
              </button>
              
              <button
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-green-50 transition-all duration-200 group/btn"
                onClick={() => handleRepost(post)}
              >
                <AiOutlineRetweet
                  size={20}
                  className={`transition-all duration-200 group-hover/btn:scale-110 ${
                    post?.is_reposted 
                      ? 'text-green-500' 
                      : 'text-gray-500 group-hover/btn:text-green-500'
                  }`}
                />
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  post?.is_reposted ? 'text-green-500' : 'text-gray-500 group-hover/btn:text-green-500'
                }`}>
                  {post?.total_reposts || 0}
                </span>
              </button>
              
              <button
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-teal-50 transition-all duration-200 group/btn"
                onClick={() => handleSave(post)}
              >
                {post?.is_bookmarked ? (
                  <PiBookmarkFill
                    size={20}
                    className="text-teal-500 transition-all duration-200 group-hover/btn:scale-110"
                  />
                ) : (
                  <PiBookmark
                    size={20}
                    className="text-gray-500 group-hover/btn:text-teal-500 transition-all duration-200 group-hover/btn:scale-110"
                  />
                )}
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  post?.is_bookmarked ? 'text-teal-500' : 'text-gray-500 group-hover/btn:text-teal-500'
                }`}>
                  {post?.total_bookmarks || 0}
                </span>
              </button>
              
              <div className="flex items-center">
                <IncidentIntegration />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F4F4F] mx-auto mb-6"></div>
            <p className="text-gray-600 text-base font-medium">
              {type === "post" ? "Loading posts..." : "Loading..."}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Please wait while we fetch the latest content
            </p>
          </div>
        </div>
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
