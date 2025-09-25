import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { IoChatboxEllipsesOutline, IoEllipsisHorizontal, IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import { BsBarChart } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

const ProfileContent = ({ content, type, onLike, onUnlike, onRepost, onUnrepost, onSave, onUnsave }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Set initial states based on content
    if (content) {
      setIsLiked(content.is_reacted || false);
      setIsReposted(content.is_reposted || false);
      setIsBookmarked(content.is_bookmarked || false);
    }
  }, [content]);

  const handleLike = () => {
    if (isLiked) {
      onUnlike && onUnlike({ postType: type, post: content.id });
      setIsLiked(false);
    } else {
      onLike && onLike({ postType: type, post: content.id });
      setIsLiked(true);
    }
  };

  const handleRepost = () => {
    if (isReposted) {
      onUnrepost && onUnrepost({ postType: type, post: content.id });
      setIsReposted(false);
    } else {
      onRepost && onRepost({ postType: type, post: content.id });
      setIsReposted(true);
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      onUnsave && onUnsave({ postType: type, post: content.id });
      setIsBookmarked(false);
    } else {
      onSave && onSave({ postType: type, post: content.id });
      setIsBookmarked(true);
    }
  };

  const renderContent = () => {
    if (!content) return null;

    switch (type) {
      case "post":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={content.user?.profile_picture || "/avatar.png"}
                    alt={content.user?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{content.user?.first_name} {content.user?.last_name}</h3>
                    <p className="text-sm text-gray-500">@{content.user?.username}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-900 whitespace-pre-wrap text-base leading-relaxed">{content.content}</p>
                
                {/* Handle both images and videos */}
                {content.image && (
                  <div className="mt-4">
                    {content.image.includes('.mp4') || content.image.includes('.mov') || content.image.includes('.avi') || content.image.includes('.webm') ? (
                      <video
                        src={content.image}
                        controls
                        className="rounded-xl max-w-full h-auto shadow-md"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={content.image}
                        alt="Post image"
                        className="rounded-xl max-w-full h-auto shadow-md"
                      />
                    )}
                  </div>
                )}
                
                {content.video && (
                  <div className="mt-4">
                    <video
                      src={content.video}
                      controls
                      className="rounded-xl max-w-full h-auto shadow-md"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                
                {content.audio && (
                  <div className="mt-4">
                    <audio
                      src={content.audio}
                      controls
                      className="w-full"
                    >
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                )}
                
                {content.location && (
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{content.location}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-8">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-all duration-200 hover:scale-110"
                  >
                    {isLiked ? <AiFillHeart className="text-red-500" size={22} /> : <AiOutlineHeart size={22} />}
                    <span className="font-medium">{content.total_reactions || 0}</span>
                  </button>
                  
                  <button
                    onClick={() => navigate(`/app/${content.id}/comments`)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-200 hover:scale-110"
                  >
                    <IoChatboxEllipsesOutline size={22} />
                    <span className="font-medium">{content.total_comments || 0}</span>
                  </button>
                  
                  <button
                    onClick={handleRepost}
                    className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all duration-200 hover:scale-110"
                  >
                    {isReposted ? <AiOutlineRetweet className="text-green-500" size={22} /> : <AiOutlineRetweet size={22} />}
                    <span className="font-medium">{content.total_reposts || 0}</span>
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-all duration-200 hover:scale-110"
                  >
                    {isBookmarked ? <PiBookmarkFill className="text-yellow-500" size={22} /> : <PiBookmark size={22} />}
                    <span className="font-medium">{content.total_bookmarks || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "comment":
        console.log("Rendering comment:", content);
        console.log("Comment content:", content.content);
        console.log("Comment user:", content.user);
        console.log("Comment post:", content.post);
        console.log("Comment post_id:", content.post_id);
        console.log("Full comment object keys:", Object.keys(content));
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={content.user?.profile_picture || "/avatar.png"}
                    alt={content.user?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{content.user?.first_name} {content.user?.last_name}</h3>
                    <p className="text-sm text-gray-500">@{content.user?.username}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-600 font-medium mb-2">💬 Comment on:</p>
                  {content.post ? (
                    <div className="bg-white p-3 rounded border">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={content.post.user?.profile_picture || "/avatar.png"}
                          alt={content.post.user?.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{content.post.user?.first_name} {content.post.user?.last_name}</span>
                        <span className="text-xs text-gray-500">@{content.post.user?.username}</span>
                      </div>
                      <p className="text-gray-800 text-sm">{content.post.content}</p>
                      
                      {/* Show original post attachments */}
                      {content.post.image && (
                        <div className="mt-2">
                          {content.post.image.includes('.mp4') || content.post.image.includes('.mov') || content.post.image.includes('.avi') || content.post.image.includes('.webm') ? (
                            <video
                              src={content.post.image}
                              controls
                              className="rounded-lg max-w-full h-32 object-cover"
                              preload="metadata"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={content.post.image}
                              alt="Original post image"
                              className="rounded-lg max-w-full h-32 object-cover"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white p-3 rounded border">
                      <p className="text-gray-600 text-sm italic">Original post not available</p>
                      <p className="text-xs text-gray-500 mt-1">Post ID: {content.post_id || 'Unknown'}</p>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-900 whitespace-pre-wrap text-base leading-relaxed">{content.content}</p>
                  
                  {/* Show comment attachments */}
                  {content.image && (
                    <div className="mt-3">
                      {content.image.includes('.mp4') || content.image.includes('.mov') || content.image.includes('.avi') || content.image.includes('.webm') ? (
                        <video
                          src={content.image}
                          controls
                          className="rounded-lg max-w-full h-auto shadow-sm"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={content.image}
                          alt="Comment image"
                          className="rounded-lg max-w-full h-auto shadow-sm"
                        />
                      )}
                    </div>
                  )}
                  
                  {content.video && (
                    <div className="mt-3">
                      <video
                        src={content.video}
                        controls
                        className="rounded-lg max-w-full h-auto shadow-sm"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  
                  {content.audio && (
                    <div className="mt-3">
                      <audio
                        src={content.audio}
                        controls
                        className="w-full"
                      >
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-8">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-all duration-200 hover:scale-110"
                  >
                    {isLiked ? <AiFillHeart className="text-red-500" size={22} /> : <AiOutlineHeart size={22} />}
                    <span className="font-medium">{content.total_reactions || 0}</span>
                  </button>
                  
                  <button
                    onClick={handleRepost}
                    className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all duration-200 hover:scale-110"
                  >
                    {isReposted ? <AiOutlineRetweet className="text-green-500" size={22} /> : <AiOutlineRetweet size={22} />}
                    <span className="font-medium">{content.total_reposts || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "repost":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={content.user?.profile_picture || "/avatar.png"}
                    alt={content.user?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{content.user?.first_name} {content.user?.last_name}</h3>
                    <p className="text-sm text-gray-500">@{content.user?.username}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-4">
                  <p className="text-sm text-green-600 font-medium mb-2">🔄 Reposted:</p>
                  {content.post && (
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={content.post.user?.profile_picture || "/avatar.png"}
                          alt={content.post.user?.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{content.post.user?.first_name} {content.post.user?.last_name}</h4>
                          <p className="text-sm text-gray-500">@{content.post.user?.username}</p>
                        </div>
                      </div>
                      <p className="text-gray-900">{content.post.content}</p>
                      {content.post.image && (
                        <div className="mt-3">
                          {content.post.image.includes('.mp4') || content.post.image.includes('.mov') || content.post.image.includes('.avi') || content.post.image.includes('.webm') ? (
                            <video
                              src={content.post.image}
                              controls
                              className="rounded-lg max-w-full h-auto shadow-sm"
                              preload="metadata"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={content.post.image}
                              alt="Reposted post image"
                              className="rounded-lg max-w-full h-auto shadow-sm"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "bookmark":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={content.post?.user?.profile_picture || "/avatar.png"}
                    alt={content.post?.user?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{content.post?.user?.first_name} {content.post?.user?.last_name}</h3>
                    <p className="text-sm text-gray-500">@{content.post?.user?.username}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
                  <p className="text-sm text-yellow-600 font-medium mb-2">🔖 Bookmarked:</p>
                  <p className="text-gray-900 text-base leading-relaxed">{content.post?.content}</p>
                  {content.post?.image && (
                    <div className="mt-3">
                      {content.post.image.includes('.mp4') || content.post.image.includes('.mov') || content.post.image.includes('.avi') || content.post.image.includes('.webm') ? (
                        <video
                          src={content.post.image}
                          controls
                          className="rounded-lg max-w-full h-auto shadow-md"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={content.post.image}
                          alt="Bookmarked post image"
                          className="rounded-lg max-w-full h-auto shadow-md"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "reaction":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={content.post?.user?.profile_picture || "/avatar.png"}
                    alt={content.post?.user?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{content.post?.user?.first_name} {content.post?.user?.last_name}</h3>
                    <p className="text-sm text-gray-500">@{content.post?.user?.username}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-4">
                  <p className="text-sm text-red-600 font-medium mb-2">❤️ Liked:</p>
                  <p className="text-gray-900 text-base leading-relaxed">{content.post?.content}</p>
                  {content.post?.image && (
                    <div className="mt-3">
                      {content.post.image.includes('.mp4') || content.post.image.includes('.mov') || content.post.image.includes('.avi') || content.post.image.includes('.webm') ? (
                        <video
                          src={content.post.image}
                          controls
                          className="rounded-lg max-w-full h-auto shadow-md"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={content.post.image}
                          alt="Liked post image"
                          className="rounded-lg max-w-full h-auto shadow-md"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "poll":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={content.user?.profile_picture || "/avatar.png"}
                    alt={content.user?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{content.user?.first_name} {content.user?.last_name}</h3>
                    <p className="text-sm text-gray-500">@{content.user?.username}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <BsBarChart size={20} className="text-blue-500" />
                    <span className="text-blue-600 font-medium">📊 Poll</span>
                  </div>
                  <p className="text-gray-900 text-base leading-relaxed mb-4">{content.question}</p>
                  
                  {content.options && content.options.length > 0 && (
                    <div className="space-y-3">
                      {content.options.map((option, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 font-medium">{option}</span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">0 votes</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <p className="text-gray-500">Unknown content type: {type}</p>
          </div>
        );
    }
  };

  return renderContent();
};

ProfileContent.propTypes = {
  content: PropTypes.object,
  type: PropTypes.string.isRequired,
  onLike: PropTypes.func,
  onUnlike: PropTypes.func,
  onRepost: PropTypes.func,
  onUnrepost: PropTypes.func,
  onSave: PropTypes.func,
  onUnsave: PropTypes.func,
};

export default ProfileContent;
