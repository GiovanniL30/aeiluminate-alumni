import { ID, InputFile } from "node-appwrite";
import crypto from "crypto";

import { storage } from "../appwriteconfig.js";
import { addNewPost, addNewMedia, getPosts, getMedia } from "../mysqlQueries/queries.js";

/**
 *
 * Inserts a new Post on the Database
 *
 * @method POST
 * @route /api/post
 */
export const uploadPostController = async (req, res) => {
  try {
    const { userId } = req;
    const { caption } = req.body;
    const postId = crypto.randomUUID();

    const mediaInfo = [];

    for (const file of req.files) {
      const result = await storage.createFile(process.env.APP_WRITE_IMAGES_BUCKET, ID.unique(), InputFile.fromBuffer(file.buffer, file.originalname));

      const mediaURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${result.$id}/view?project=${process.env.APP_WRITE_PROJECT_ID}&project=${process.env.APP_WRITE_PROJECT_ID}&mode=admin`;

      mediaInfo.push({
        mediaID: result.$id,
        mediaType: file.mimetype,
        mediaURL,
      });
    }

    const postResult = await addNewPost(postId, userId, caption, new Date());
    if (!postResult) throw new Error("Failed to add new post");

    for (const media of mediaInfo) {
      const newMedia = await addNewMedia(media.mediaID, media.mediaType, media.mediaURL, new Date(), postId);
      if (!newMedia) throw new Error("Failed to add new media");
    }

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error in uploadPostController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Inserts a new aeline on the Database
 *
 * @method POST
 * @route /api/line
 */
export const uploadLineController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { caption } = req.body;
    const postId = crypto.randomUUID();

    const postResult = await addNewPost(postId, userId, caption, new Date());
    if (!postResult) throw new Error("Failed to add new post");

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error in uploadLineController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Get list of Posts on the Database
 *
 * paginated list of posts
 *
 * @method GET
 * @route /api/post
 */
export const getPostController = async (req, res, next) => {
  try {
    const { page, length } = req.query;

    const { posts, total } = await getPosts(page, length);

    const updatedPosts = [];

    for (const post of posts) {
      const postMedia = await getMedia(post.postID);
      updatedPosts.push({ ...post, postMedia });
    }

    const totalPage = Math.ceil(total / length);

    res.status(200).json({
      posts: updatedPosts,
      totatPosts: total,
      totalPage,
    });
  } catch (error) {
    console.error("Error in getting posts:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
