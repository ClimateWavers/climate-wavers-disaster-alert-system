## Project Overview

This project is a comprehensive Climate Wavers social network application featuring a range of functionalities including notifications, posts, polls, comments, reactions, views, follows, and bookmarks. The application also supports user activity tracking and custom actions for post interaction. It uses Django and Django REST Framework for backend development and includes a set of APIs to handle various operations.

## Table of Contents

1. [Features](#features)
2. [API Endpoints](#api-endpoints)
   - [Notification Endpoint](#notification-endpoints)
   - [Post Endpoints](#post-endpoints)
   - [Poll Endpoints](#poll-endpoints)
   - [Comment Endpoints](#comment-endpoints)
   - [Reaction Endpoints](#reaction-endpoints)
   - [Repost Endpoints](#repost-endpoints)
   - [View Endpoints](#view-endpoints)
   - [Follow Endpoints](#follow-endpoints)
   - [Bookmark Endpoints](#bookmark-endpoints)
   - [User Endpoints](#user-endpoints)
4. [URL Patterns](#url-patterns)

## Features
- **Notification** making notifications and mark as read
- **Posts:** Create, update, and manage posts with support for hashtags, comments, reactions, views, and reposts.
- **Polls:** Create and participate in polls. Track poll votes.
- **Comments:** Comment on posts and track reactions to comments.
- **Reactions:** React to posts and comments.
- **Reposts:** Repost content from other users.
- **Views:** Track views on posts.
- **Follows:** Follow and unfollow other users.
- **Bookmarks:** Bookmark and unbookmark posts.
- **User Activity:** Track user activity including posts, comments, reactions, and more.

## API Endpoints

### Notifications

1. **List Notifications**
   - **URL**: `/api/v1/notifications/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "message": "New comment on your post",
         "created_at": "2023-08-01T12:00:00Z",
         "is_read": false
       }
     ]
     ```

2. **Mark Notifications as Read**
   - **URL**: `/api/v1/notifications/mark-read/`
   - **Method**: `PATCH`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "Notifications marked as read"
     }
     ```

### Post Endpoints

- **List Posts**
  - **URL:** `api/v1/post/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all posts.
  - **Response:** List of posts with annotations for comment count, reaction count, view count, and repost count.

- **Create Post**
  - **URL:** `api/v1/post/`
  - **Method:** `POST`
  - **Description:** Create a new post.
  - **Request Body:** `title`, `content`, `image`, `audio`
  - **Response:** Created post details.

- **Retrieve Post**
  - **URL:** `api/v1/post/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific post by ID.
  - **Response:** Post details.

- **Update Post**
  - **URL:** `api/v1/post/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific post by ID.
  - **Request Body:** `title`, `content`, `image`, `audio`
  - **Response:** Updated post details.

- **Delete Post**
  - **URL:** `api/v1/post/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific post by ID.
  - **Response:** Success message.

- **Search by Hashtag**
  - **URL:** `api/v1/search-by-hashtag/`
  - **Method:** `GET`
  - **Description:** Search posts by hashtag with optional filters.
  - **Query Parameters:** `hashtag`, `filter_by`, `location`
  - **Response:** Lists of top posts, latest posts, media posts, and associated people.

- **Trending Hashtags**
  - **URL:** `api/v1/trending/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of trending hashtags.
  - **Response:** List of trending hashtags.

### Poll Endpoints

- **List Polls**
  - **URL:** `api/v1/polls/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all polls.
  - **Response:** List of polls.

- **Create Poll**
  - **URL:** `api/v1/polls/`
  - **Method:** `POST`
  - **Description:** Create a new poll.
  - **Request Body:** `question`, `options`, `visibility`, `duration`
  - **Response:** Created poll details.

- **Retrieve Poll**
  - **URL:** `api/v1/polls/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific poll by ID.
  - **Response:** Poll details.

- **Update Poll**
  - **URL:** `api/v1/polls/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific poll by ID.
  - **Request Body:** `question`, `options`, `visibility`, `duration`
  - **Response:** Updated poll details.

- **Delete Poll**
  - **URL:** `api/v1/polls/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific poll by ID.
  - **Response:** Success message.

- **Vote in Poll**
  - **URL:** `api/v1/polls/{id}/vote/`
  - **Method:** `POST`
  - **Description:** Vote in a specific poll.
  - **Request Body:** `option`
  - **Response:** Vote status message.

### Comment Endpoints

- **List Comments**
  - **URL:** `api/v1/comments/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all comments.
  - **Response:** List of comments.

- **Create Comment**
  - **URL:** `api/v1/comments/`
  - **Method:** `POST`
  - **Description:** Create a new comment.
  - **Request Body:** `user`, `content_type`, `object_id`, `content`
  - **Response:** Created comment details.

- **Retrieve Comment**
  - **URL:** `api/v1/comments/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific comment by ID.
  - **Response:** Comment details.

- **Update Comment**
  - **URL:** `api/v1/comments/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific comment by ID.
  - **Request Body:** `content`
  - **Response:** Updated comment details.

- **Delete Comment**
  - **URL:** `api/v1/comments/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific comment by ID.
  - **Response:** Success message.

### Reaction Endpoints

- **List Reactions**
  - **URL:** `api/v1/reactions/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all reactions.
  - **Response:** List of reactions.

- **Create Reaction**
  - **URL:** `api/v1/reactions/`
  - **Method:** `POST`
  - **Description:** Create a new reaction.
  - **Request Body:** `user`, `content_type`, `object_id`, `reaction_type`
  - **Response:** Created reaction details.

- **Retrieve Reaction**
  - **URL:** `api/v1/reactions/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific reaction by ID.
  - **Response:** Reaction details.

- **Update Reaction**
  - **URL:** `api/v1/reactions/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific reaction by ID.
  - **Request Body:** `reaction_type`
  - **Response:** Updated reaction details.

- **Delete Reaction**
  - **URL:** `api/v1/reactions/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific reaction by ID.
  - **Response:** Success message.

### Repost Endpoints

- **List Reposts**
  - **URL:** `api/v1/reposts/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all reposts.
  - **Response:** List of reposts.

- **Create Repost**
  - **URL:** `api/v1/reposts/`
  - **Method:** `POST`
  - **Description:** Create a new repost.
  - **Request Body:** `user`, `post`
  - **Response:** Created repost details.

- **Retrieve Repost**
  - **URL:** `api/v1/reposts/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific repost by ID.
  - **Response:** Repost details.

- **Update Repost**
  - **URL:** `api/v1/reposts/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific repost by ID.
  - **Request Body:** `post`
  - **Response:** Updated repost details.

- **Delete Repost**
  - **URL:** `api/v1/reposts/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific repost by ID.
  - **Response:** Success message.

### View Endpoints

- **List Views**
  - **URL:** `api/v1/views/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all views.
  - **Response:** List of views.

- **Create View**
  - **URL:** `api/v1/views/`
  - **Method:** `POST`
  - **Description:** Create a new view.
  - **Request Body:** `user`, `post`
  - **Response:** Created view details.

- **Retrieve View**
  - **URL:** `api/v1/views/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific view by ID.
  - **Response:** View details.

- **Update View**
  - **URL:** `api/v1/views/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific view by ID.
  - **Request Body:** `post`
  - **Response:** Updated view details.

- **Delete View**
  - **URL:** `api/v1/views/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific view by ID.
  - **Response:** Success message.

### Follow Endpoints

- **List Follows**
  - **URL:** `api/v1/follows/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all follows.
  - **Response:** List of follows.

- **Create Follow**
  - **URL:** `api/v1/follows/`
  - **Method:** `POST`
  - **Description:** Create a new follow.
  - **Request Body:** `follower`, `following`
  - **Response:** Created follow details.

- **Retrieve Follow**
  - **URL:** `api/v1/follows/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific follow by ID.
  - **Response:** Follow details.

- **Update Follow**
  - **URL:** `api/v1/follows/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific follow by ID.
  - **Request Body:** `follower`, `following`
  - **Response:** Updated follow details.

- **Delete Follow**
  - **URL:** `api/v1/follows/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific follow by ID.
  - **Response:** Success message.

### Bookmark Endpoints

- **List Bookmarks**
  - **URL:** `api/v1/bookmarks/`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all bookmarks.
  - **Response:** List of bookmarks.

- **Create Bookmark**
  - **URL:** `api/v1/bookmarks/`
  - **Method:** `POST`
  - **Description:** Create a new bookmark.
  - **Request Body:** `user`, `post`
  - **Response:** Created bookmark details.

- **Retrieve Bookmark**
  - **URL:** `api/v1/bookmarks/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific bookmark by ID.
  - **Response:** Bookmark details.

- **Update Bookmark**
  - **URL:** `api/v1/bookmarks/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific bookmark by ID.
  - **Request Body:** `post`
  - **Response:** Updated bookmark details.

- **Delete Bookmark**
  - **URL:** `api/v1/bookmarks/{id}/`
  - **Method:** `DELETE`
  - **Description:** Delete a specific bookmark by ID.
  - **Response:** Success message.

### User Endpoints

- **Retrieve User Profile**
  - **URL:** `api/v1/users/{id}/`
  - **Method:** `GET`
  - **Description:** Retrieve a specific user's profile.
  - **Response:** User profile details.

- **Update User Profile**
  - **URL:** `api/v1/users/{id}/`
  - **Method:** `PUT`
  - **Description:** Update a specific user's profile.
  - **Request Body:** `name`, `bio`, `profile_picture`
  - **Response:** Updated user profile details.

## URL Patterns

### Notifications

1. **List Notifications**
   - **URL**: `/api/v1/notifications/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "message": "New comment on your post",
         "created_at": "2023-08-01T12:00:00Z",
         "is_read": false
       }
     ]
     ```

2. **Mark Notifications as Read**
   - **URL**: `/api/v1/notifications/mark-read/`
   - **Method**: `PATCH`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "Notifications marked as read"
     }
     ```

### Posts

1. **List Posts**
   - **URL**: `/api/v1/post/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "user": 1,
         "content": "This is a post",
         "created_at": "2023-08-01T12:00:00Z",
         "hashtags": ["#example"],
         "comment_count": 2,
         "reaction_count": 5,
         "view_count": 10,
         "repost_count": 1
       }
     ]
     ```

2. **Create Post**
   - **URL**: `/api/v1/post/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Request Body**:
     ```json
     {
       "content": "This is a new post"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 2,
       "user": 1,
       "content": "This is a new post",
       "created_at": "2023-08-01T12:01:00Z",
       "hashtags": ["#newpost"]
     }
     ```

3. **Search by Hashtag**
   - **URL**: `/api/v1/post/search-by-hashtag/?hashtag=#example`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "top_posts": [
         {
           "id": 1,
           "user": 1,
           "content": "This is a post",
           "created_at": "2023-08-01T12:00:00Z",
           "hashtags": ["#example"],
           "comment_count": 2,
           "reaction_count": 5,
           "view_count": 10,
           "repost_count": 1
         }
       ],
       "latest_posts": [
         {
           "id": 1,
           "user": 1,
           "content": "This is a post",
           "created_at": "2023-08-01T12:00:00Z",
           "hashtags": ["#example"],
           "comment_count": 2,
           "reaction_count": 5,
           "view_count": 10,
           "repost_count": 1
         }
       ],
       "media_posts": [],
       "associated_people": [
         {
           "id": 1,
           "username": "user1",
           "email": "user1@example.com"
         }
       ]
     }
     ```

4. **Bookmark Post**
   - **URL**: `/api/v1/post/{post_id}/bookmark/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "post bookmarked"
     }
     ```

5. **Unbookmark Post**
   - **URL**: `/api/v1/post/{post_id}/unbookmark/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "bookmark removed"
     }
     ```

6. **Get Trending Hashtags**
   - **URL**: `/api/v1/post/trending/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
    {
        "hashtags": "",
        "count": 21
    },
    {
        "hashtags": "#climatewavers",
        "count": 2
    },
    {
        "hashtags": "#Environmental",
        "count": 2
    },
    {
        "hashtags": "#changinglife",
        "count": 1
    },
    {
        "hashtags": "#life",
        "count": 1
    }
  ]
     ```

### User

1. **Get User Activity**
   - **URL**: `/api/v1/users/activity/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "post_count": 10,
       "comment_count": 5,
       "reaction_count": 20,
       "view_count": 15,
       "repost_count": 3,
       "follower_count": 50,
       "following_count": 25,
       "bookmark_count": 5
     }
     ```

2. **Follow User**
   - **URL**: `/api/v1/users/{user_id}/follow/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "following user1"
     }
     ```

3. **Unfollow User**
   - **URL**: `/api/v1/users/{user_id}/unfollow/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "unfollowed user1"
     }
     ```

### Comments

1. **List Comments**
   - **URL**: `/api/v1/comments/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "user": 1,
         "post": 1,
         "content": "This is a comment",
         "created_at": "2023-08-01T12:00:00Z",
         "reaction_count": 2
       }
     ]
     ```

2. **Create Comment**
   - **URL**: `/api/v1/comments/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Request Body**:
     ```json
     {
       "post": 1,
       "content": "This is a new comment"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 2,
       "user": 1,
       "post": 1,
       "content": "This is a new comment",
       "created_at": "2023-08-01T12:01:00Z"
     }
     ```

### Reactions

1. **List Reactions**
   - **URL**: `/api/v1/reactions/`
   - **Method**: `GET`
   - **Headers**:


     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "user": 1,
         "post": 1,
         "type": "like",
         "created_at": "2023-08-01T12:00:00Z"
       }
     ]
     ```

2. **Create Reaction**
   - **URL**: `/api/v1/reactions/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Request Body**:
     ```json
     {
       "post": 1,
       "type": "like"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 2,
       "user": 1,
       "post": 1,
       "type": "like",
       "created_at": "2023-08-01T12:01:00Z"
     }
     ```

### Polls

1. **List Polls**
   - **URL**: `/api/v1/polls/`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "user": 1,
         "question": "What's your favorite color?",
         "options": [
           {
             "id": 1,
             "text": "Red"
           },
           {
             "id": 2,
             "text": "Blue"
           }
         ],
         "created_at": "2023-08-01T12:00:00Z",
         "vote_count": 10
       }
     ]
     ```

2. **Create Poll**
   - **URL**: `/api/v1/polls/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Request Body**:
     ```json
     {
       "question": "What's your favorite color?",
       "options": [
         {
           "text": "Red"
         },
         {
           "text": "Blue"
         }
       ]
     }
     ```
   - **Response**:
     ```json
     {
       "id": 2,
       "user": 1,
       "question": "What's your favorite color?",
       "options": [
         {
           "id": 3,
           "text": "Red"
         },
         {
           "id": 4,
           "text": "Blue"
         }
       ],
       "created_at": "2023-08-01T12:01:00Z"
     }
     ```

3. **Vote in Poll**
   - **URL**: `/api/v1/polls/{poll_id}/vote/`
   - **Method**: `POST`
   - **Headers**:
     ```json
     {
       "Authorization": "Token your_token_here"
     }
     ```
   - **Request Body**:
     ```json
     {
       "option_id": 1
     }
     ```
   - **Response**:
     ```json
     {
       "status": "vote registered"
     }
     ```

