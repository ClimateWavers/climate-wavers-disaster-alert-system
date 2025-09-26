import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";
import { IoSearch, IoClose, IoPerson, IoTime, IoLocation } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";

const Search = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    posts: [],
    users: [],
    hashtags: [],
    trending: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search
  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      console.log("Search - Starting search for:", searchQuery);
      
      // Save to recent searches
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

      // Search posts
      console.log("Search - Searching posts...");
      const postsResponse = await client.run("get", `${endpoints?.search}posts/?q=${encodeURIComponent(searchQuery)}`, {}, true);
      console.log("Search - Posts response:", postsResponse);
      
      // Search users
      console.log("Search - Searching users...");
      const usersResponse = await client.run("get", `${endpoints?.search}users/?q=${encodeURIComponent(searchQuery)}`, {}, true);
      console.log("Search - Users response:", usersResponse);
      
      // Search hashtags
      console.log("Search - Searching hashtags...");
      const hashtagsResponse = await client.run("get", `${endpoints?.search}hashtags/?q=${encodeURIComponent(searchQuery)}`, {}, true);
      console.log("Search - Hashtags response:", hashtagsResponse);
      
      // Get trending topics
      console.log("Search - Searching trending...");
      const trendingResponse = await client.run("get", `${endpoints?.search}trending/?q=${encodeURIComponent(searchQuery)}`, {}, true);
      console.log("Search - Trending response:", trendingResponse);

      console.log("Search - Setting results...");
      setResults({
        posts: postsResponse?.results || postsResponse || [],
        users: usersResponse?.results || usersResponse || [],
        hashtags: hashtagsResponse?.results || hashtagsResponse || [],
        trending: trendingResponse?.results || trendingResponse || []
      });
      console.log("Search - Results set:", {
        posts: postsResponse?.results || postsResponse || [],
        users: usersResponse?.results || usersResponse || [],
        hashtags: hashtagsResponse?.results || hashtagsResponse || [],
        trending: trendingResponse?.results || trendingResponse || []
      });
    } catch (error) {
      console.error("Search error:", error);
      console.error("Search error details:", error.response?.data);
      console.error("Search error status:", error.response?.status);
      
      // Try global search as fallback
      try {
        console.log("Search - Trying global search fallback...");
        const globalResponse = await client.run("get", `${endpoints?.search}?q=${encodeURIComponent(searchQuery)}`, {}, true);
        console.log("Search - Global search response:", globalResponse);
        
        setResults({
          posts: globalResponse?.posts || [],
          users: globalResponse?.users || [],
          hashtags: globalResponse?.hashtags || [],
          trending: globalResponse?.trending || []
        });
      } catch (fallbackError) {
        console.error("Search fallback error:", fallbackError);
        setResults({
          posts: [],
          users: [],
          hashtags: [],
          trending: []
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query);
      } else {
        setResults({
          posts: [],
          users: [],
          hashtags: [],
          trending: []
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Get suggestions based on query
  useEffect(() => {
    if (query.trim() && query.length > 1) {
      const filteredSuggestions = [
        ...recentSearches.filter(s => s.toLowerCase().includes(query.toLowerCase())),
        ...results.trending.slice(0, 3).map(t => t.name || t.title),
        ...results.hashtags.slice(0, 3).map(h => h.name || h.tag)
      ].slice(0, 5);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, recentSearches, results]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setQuery("");
    setResults({
      posts: [],
      users: [],
      hashtags: [],
      trending: []
    });
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const filteredResults = () => {
    switch (activeTab) {
      case "posts":
        return results.posts;
      case "users":
        return results.users;
      case "hashtags":
        return results.hashtags;
      case "trending":
        return results.trending;
      default:
        return {
          posts: results.posts.slice(0, 3),
          users: results.users.slice(0, 3),
          hashtags: results.hashtags.slice(0, 3),
          trending: results.trending.slice(0, 3)
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div 
        ref={searchRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, users, hashtags..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <IoClose size={20} />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Search Tabs */}
          <div className="flex gap-1 mt-3">
            {["all", "posts", "users", "hashtags", "trending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : query.trim() ? (
            <SearchResults 
              results={filteredResults()} 
              activeTab={activeTab}
              query={query}
            />
          ) : (
            <EmptyState 
              recentSearches={recentSearches}
              onSuggestionClick={handleSuggestionClick}
              onClearRecent={clearRecentSearches}
            />
          )}

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Suggestions</h4>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Search Results Component
const SearchResults = ({ results, activeTab, query }) => {
  if (activeTab === "all") {
    return (
      <div className="space-y-6">
        {results.posts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BsPostcard className="text-teal-500" />
              Posts ({results.posts.length})
            </h3>
            <div className="space-y-3">
              {results.posts.map((post) => (
                <PostResult key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {results.users.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <IoPerson className="text-teal-500" />
              Users ({results.users.length})
            </h3>
            <div className="space-y-3">
              {results.users.map((user) => (
                <UserResult key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}

        {results.hashtags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-teal-500 font-bold">#</span>
              Hashtags ({results.hashtags.length})
            </h3>
            <div className="space-y-3">
              {results.hashtags.map((hashtag) => (
                <HashtagResult key={hashtag.id} hashtag={hashtag} />
              ))}
            </div>
          </div>
        )}

        {results.trending.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <IoTime className="text-teal-500" />
              Trending ({results.trending.length})
            </h3>
            <div className="space-y-3">
              {results.trending.map((trend) => (
                <TrendingResult key={trend.id} trend={trend} />
              ))}
            </div>
          </div>
        )}

        {Object.values(results).every(arr => arr.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">No results found for "{query}"</p>
          </div>
        )}
      </div>
    );
  }

  // Single tab results
  const items = Array.isArray(results) ? results : [];
  
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No {activeTab} found for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        switch (activeTab) {
          case "posts":
            return <PostResult key={item.id} post={item} />;
          case "users":
            return <UserResult key={item.id} user={item} />;
          case "hashtags":
            return <HashtagResult key={item.id} hashtag={item} />;
          case "trending":
            return <TrendingResult key={item.id} trend={item} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

// Result Components
const PostResult = ({ post }) => (
  <Link to={`/app/${post.id}/post`} className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-start gap-3">
      <img 
        src={post.user?.profile_picture || post.user?.profile_pic || "/avatar.png"} 
        alt={post.user?.username}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{post.user?.first_name} {post.user?.last_name}</span>
          <span className="text-gray-500 text-sm">@{post.user?.username}</span>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-400 text-sm">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
        </div>
        <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
        {post.location && (
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <IoLocation size={12} />
            <span>{post.location}</span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

const UserResult = ({ user }) => (
  <Link to={`/app/${user.id}/profile`} className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <img 
        src={user.profile_picture || user.profile_pic || "/avatar.png"} 
        alt={user.username}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{user.first_name} {user.last_name}</h4>
        <p className="text-gray-500 text-sm">@{user.username}</p>
        {user.profession && (
          <p className="text-gray-600 text-sm">{user.profession}</p>
        )}
      </div>
    </div>
  </Link>
);

const HashtagResult = ({ hashtag }) => (
  <Link to={`/app/hashtag/${hashtag.name || hashtag.tag}`} className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
        <span className="text-teal-600 font-bold text-lg">#</span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">#{hashtag.name || hashtag.tag}</h4>
        <p className="text-gray-500 text-sm">{hashtag.post_count || 0} posts</p>
      </div>
    </div>
  </Link>
);

const TrendingResult = ({ trend }) => (
  <div className="p-3 border border-gray-200 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
        <IoTime className="text-orange-600" size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{trend.name || trend.title}</h4>
        <p className="text-gray-500 text-sm">{trend.post_count || 0} posts • {trend.status || 'trending'}</p>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ recentSearches, onSuggestionClick, onClearRecent }) => (
  <div className="space-y-6">
    {recentSearches.length > 0 && (
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
          <button
            onClick={onClearRecent}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </div>
        <div className="space-y-1">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(search)}
              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    )}

    <div className="text-center py-8">
      <IoSearch className="mx-auto text-gray-400 mb-3" size={48} />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Search Climate Wavers</h3>
      <p className="text-gray-500">Find posts, users, hashtags, and trending topics</p>
    </div>
  </div>
);

export default Search;
