import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  userLogin,
  uploadPost,
  uploadLine,
  fetchPosts,
  fetchPostInformation,
  likePost,
  unlikePost,
  followUserRequest,
  unfollowUserRequest,
  checkFollowingStatusRequest,
  addCommentRequest,
  getCommentsRequest,
  fetchFollower,
  fetchFollowing,
  fetchUserPosts,
  getSpecificUserRequest,
  userLogout,
  getProgramsRequest,
  postApplication,
  updateUserDetailsRequest,
  updateUserProfileRequest,
  getConversationMessagesRequest,
  getConversationListRequest,
  addNewMessageRequest,
  createNewAlbum,
  getAlbumPosts,
  getAlbumInformation,
  addImageOnAlbum,
  fetchAlbums,
  sendOTP,
  verifyOTP,
  changePassword,
  fetchUsers,
  fetchEvents,
  fetchUserEvents,
  fetchEventInformation,
  markEventInterested,
  unmarkEventInterested,
  fetchUserInterestedEvents,
  uploadEvent,
  checkUserInterested,
  fetchJobListing,
  addNewJobListing,
  deletePostRequest,
  deleteEventRequest,
  deleteJobRequest,
  getAlumniDetails,
} from "../index.js";

/**
 * React query to get user info
 *
 * @author Giovanni Leo
 */
export const useGetUser = (id) => {
  return useQuery({
    queryFn: () => getSpecificUserRequest(id),
    queryKey: ["user", id],
  });
};

/**
 * React query to get user info
 *
 * @author Giovanni Leo
 */
export const useGetAlumniDetails = (id) => {
  return useQuery({
    queryFn: () => getAlumniDetails(id),
    queryKey: ["alumni", id],
  });
};

/**
 * React query to login user
 *
 * @author Giovanni Leo
 */
export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }) => userLogin(email, password),
  });
};

/**
 * React query to logout user
 *
 * @author Giovanni Leo
 */
export const useLogoutUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => client.clear(),
  });
};

/**
 * React query to upload a new post
 *
 * @author Giovanni Leo
 */
export const useUploadPost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ caption, images }) => uploadPost(caption, images),
    onSuccess: () => client.invalidateQueries(["posts"]),
  });
};

/**
 * React query to upload a new post
 *
 * @author Giovanni Leo
 */
export const useUploadLine = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ caption }) => uploadLine(caption),
    onSuccess: () => client.invalidateQueries(["posts"]),
  });
};

/**
 * React query to handle loading of posts
 *
 * @author Giovanni Leo
 */
export const useGetPosts = (length) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, length }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

/**
 * React query to handle loading of events
 *
 * @author Giovanni Leo
 */
export const useGetEvents = (length) => {
  return useInfiniteQuery({
    queryKey: ["events"],
    queryFn: ({ pageParam }) => fetchEvents({ pageParam, length }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

/**
 * React query to handle loading of job listings
 *
 * @author Giovanni Leo
 */
export const useGetJobListings = (length) => {
  return useInfiniteQuery({
    queryKey: ["joblistings"],
    queryFn: ({ pageParam }) => fetchJobListing({ pageParam, length }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

/**
 * React query to handle loading of albums
 *
 * @author Giovanni Leo
 */
export const useGetAlbums = (length) => {
  return useInfiniteQuery({
    queryKey: ["albums"],
    queryFn: ({ pageParam }) => fetchAlbums({ pageParam, length }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

/**
 * React query to handle loading of users
 *
 * @author Giovanni Leo
 */
export const useGetUsers = ({ length, key }) => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUsers({ pageParam, length, key }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

/**
 * React query to handle loading of posts
 *
 * @author Giovanni Leo
 */
export const useGetUserPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchUserPosts(userId),
  });
};

/**
 * React query to handle loading of posts
 *
 * @author Giovanni Leo
 */
export const useGetUserEvents = (userId) => {
  return useQuery({
    queryKey: ["events", userId],
    queryFn: () => fetchUserEvents(userId),
  });
};

/**
 * React query to handle loading of posts
 *
 * @author Giovanni Leo
 */
export const useGetUserInterestedEvents = (userId) => {
  return useQuery({
    queryKey: ["events/interested_events", userId],
    queryFn: () => fetchUserInterestedEvents(userId),
  });
};

/**
 * React query to get post comment and like count
 *
 * @author Giovanni Leo
 */
export const usePostInformation = (postId) => {
  return useQuery({
    queryKey: ["post_comment_like_count", postId],
    queryFn: () => fetchPostInformation(postId),
  });
};

/**
 * React query to get interested users in events
 *
 * @author Giovanni Leo
 */
export const useEventInformation = (eventId) => {
  return useQuery({
    queryKey: ["event_interested_users", eventId],
    queryFn: () => fetchEventInformation(eventId),
  });
};

/**
 * React query to like a post
 *
 * @author Giovanni Leo
 */
export const useLikePost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (postId) => likePost(postId),
    onSuccess: (_, postId) => client.invalidateQueries(["post_comment_like_count", postId]),
  });
};

/**
 * React query to unlike a post
 *
 * @author Giovanni Leo
 */
export const useUnlikePost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (postId) => unlikePost(postId),
    onSuccess: (_, postId) => client.invalidateQueries(["post_comment_like_count", postId]),
  });
};

/**
 * React query to unlike a post
 *
 * @author Giovanni Leo
 */
export const useUnmarkInterested = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, userid }) => unmarkEventInterested(eventId),
    onSuccess: (_, { eventId, userid }) => {
      client.invalidateQueries[("event_interested_users", eventId)];
      client.invalidateQueries(["interested", eventId, userid]);
    },
  });
};

/**
 * React query to mark an event as interested
 *
 * @author Giovanni Leo
 */
export const useMarkInterested = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, userid }) => markEventInterested(eventId),
    onSuccess: (_, { eventId, userid }) => {
      client.invalidateQueries[("event_interested_users", eventId)];
      client.invalidateQueries(["interested", eventId, userid]);
    },
  });
};

/**
 * React query to get follower count of a user
 *
 * @author Giovanni Leo
 */
export const useUserFollower = (userId) => {
  return useQuery({
    queryKey: ["follower", userId],
    queryFn: () => fetchFollower(userId),
  });
};

/**
 * React query to get following count of a user
 *
 * @author Giovanni Leo
 */
export const useUserFollowing = (userId) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => fetchFollowing(userId),
  });
};

/**
 * React query to unfollow a user
 *
 * @author Giovanni Leo
 */
export const useUnFollowUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userId) => unfollowUserRequest(userId),
    onSuccess: (_, userId) => {
      client.invalidateQueries(["follower", userId]);
      client.invalidateQueries(["follow_status", userId]);
    },
  });
};

/**
 * React query to follow  a user
 *
 * @author Giovanni Leo
 */
export const useFollowUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userId) => followUserRequest(userId),
    onSuccess: (_, userId) => {
      client.invalidateQueries(["follower", userId]);
      client.invalidateQueries(["follow_status", userId]);
    },
  });
};

/**
 * React query to check if user is following a the user
 *
 * @author Giovanni Leo
 */
export const useIsFollowing = (userId) => {
  return useQuery({
    queryFn: () => checkFollowingStatusRequest(userId),
    queryKey: ["follow_status", userId],
  });
};

/**
 * React query to add a new comment
 *
 * @author Giovanni Leo
 */
export const useAddComment = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ content, postId }) => addCommentRequest(content, postId),
    onSuccess: (_, postId) => client.invalidateQueries(["post_comments", postId]),
  });
};

/**
 * React query to get comments
 *
 * @author Giovanni Leo
 */
export const useComments = (postId) => {
  return useQuery({
    queryFn: () => getCommentsRequest(postId),
    queryKey: ["post_comments", postId],
  });
};

/**
 * React query to get comments
 *
 * @author Giovanni Leo
 */
export const usePrograms = () => {
  return useQuery({
    queryFn: () => getProgramsRequest(),
    queryKey: ["programs"],
  });
};

/**
 * React query to post new application
 *
 * @author Giovanni Leo
 */
export const useApplication = () => {
  return useMutation({
    mutationFn: (applicationDetails) => postApplication(applicationDetails),
  });
};

/**
 * React query to update user details
 *
 * @author Giovanni Leo
 */
export const useUpdateUserDetails = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userDetails) => updateUserDetailsRequest(userDetails),
    onSuccess: (_, userDetails) => {
      const userId = userDetails.id;
      client.invalidateQueries(["user", userId]);
    },
  });
};

/**
 * React query to update user details
 *
 * @author Giovanni Leo
 */
export const useUpdateUserProfile = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ oldProfileURL, newImage, userId }) => updateUserProfileRequest({ oldProfileURL, newImage }),
    onSuccess: (_, { userId }) => {
      client.invalidateQueries(["user", userId]);
    },
  });
};

/**
 * React query to get conversation messages
 *
 * @author Giovanni Leo
 */
export const useConversationMessages = (receiverID) => {
  return useQuery({
    queryKey: ["conversation", "messages", receiverID],
    queryFn: () => getConversationMessagesRequest(receiverID),
  });
};

/**
 * React query to get conversation list
 *
 * @author Giovanni Leo
 */
export const useConversationList = () => {
  return useQuery({
    queryKey: ["conversation", "list"],
    queryFn: () => getConversationListRequest(),
  });
};

/**
 * React query to add new message
 *
 * @author Giovanni Leo
 */
export const useAddMessage = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ receiverId, conversationID, content }) => addNewMessageRequest({ receiverId, conversationID, content }),
    onSuccess: (_, { receiverId }) => {
      client.invalidateQueries(["conversation", "messages", receiverId]);
      client.invalidateQueries(["conversation", "list"]);
    },
  });
};

/**
 * React query to create a new album
 *
 * @author Giovanni Leo
 */
export const useNewAlbum = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ albumTitle, images }) => createNewAlbum({ albumTitle, images }),
    onSuccess: () => {
      client.invalidateQueries(["posts"]);
    },
  });
};

/**
 * React query to add image on the album
 *
 * @author Giovanni Leo
 */
export const useAddImageAlbum = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ albumTitle, images, albumId }) => addImageOnAlbum({ albumTitle, images, albumId }),
    onSuccess: (_, albumId) => {
      client.invalidateQueries(["album", albumId]);
    },
  });
};

/**
 * React query to get album posts
 *
 * @author Giovanni Leo
 */
export const useAlbumPosts = (albumId) => {
  return useQuery({
    queryFn: () => getAlbumPosts(albumId),
    queryKey: ["album", "post", albumId],
  });
};

/**
 * React query to get album informations
 *
 * @author Giovanni Leo
 */
export const useAlbumInformation = (albumId) => {
  return useQuery({
    queryFn: () => getAlbumInformation(albumId),
    queryKey: ["album", "information", albumId],
  });
};

/**
 * React query to send OTP code
 *
 * @author Giovanni Leo
 */
export const useSendOTP = () => {
  return useMutation({
    mutationFn: (email) => sendOTP(email),
  });
};

/**
 * React query to verify OTP code
 *
 * @author Giovanni Leo
 */
export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: ({ email, otp }) => verifyOTP(email, otp),
  });
};

/**
 * React query to change password
 *
 * @author Giovanni Leo
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ email, newPassword }) => changePassword(email, newPassword),
  });
};

/**
 *
 * React query to upload a new event
 *
 * @author Giovanni Leo
 */
export const useUploadEvent = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ location, dateTime, description, category, title, image }) =>
      uploadEvent({ location, dateTime, description, category, title, image }),
    onSuccess: () => client.invalidateQueries(["events"]),
  });
};

/**
 *
 * React query to check if user is intereseted on the event
 *
 * @author Giovanni Leo
 */
export const useCheckInterested = (eventid, userid) => {
  return useQuery({
    queryKey: ["interested", eventid, userid],
    queryFn: () => checkUserInterested(eventid, userid),
  });
};

/**
 *
 * React query to add a new job listing
 *
 * @author Giovanni Leo
 */
export const useUploadJobListing = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ jobTitle, company, experienceRequired, workType, salary, description, url }) =>
      addNewJobListing({ jobTitle, company, experienceRequired, workType, salary, description, url }),
    onSuccess: () => {
      client.invalidateQueries(["joblistings"]);
    },
  });
};

/**
 *
 * React query to delete a post
 *
 * @author Giovanni Leo
 */
export const useDeletePost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (postId) => deletePostRequest(postId),
    onSuccess: () => {
      client.invalidateQueries(["posts"]);
    },
  });
};

/**
 *
 * React query to delete a event
 *
 * @author Giovanni Leo
 */
export const useDeleteEvent = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (eventID) => deleteEventRequest(eventID),
    onSuccess: () => client.invalidateQueries(["events"]),
  });
};

/**
 *
 * React query to delete a event
 *
 * @author Giovanni Leo
 */
export const useDeleteJob = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => deleteJobRequest(jobId),
    onSuccess: () => {
      client.invalidateQueries(["joblistings"]);
    },
  });
};
