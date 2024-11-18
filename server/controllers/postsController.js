import { ID } from "node-appwrite";
import { storage } from "../appwriteconfig.js";
import { addNewPost, addNewMedia } from "../mysqlQueries/queries.js";

export const uploadPostController = async (req, res) => {
  try {
    const { userId } = req;
    const { caption } = req.body;
    const postId = ID.unique();

    const mediaInfo = await Promise.all(
      req.files.map(async (file) => {
        console.log(file);
        const mediaId = ID.unique();

        await storage.createFile(process.env.APP_WRITE_IMAGES_BUCKET, mediaId, file);

        const fileUrl = `${process.env.APP_WRITE_ENDPOINT}/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${mediaId}/view`;

        return {
          mediaID: mediaId,
          mediaType: file.mimetype,
          mediaURL: fileUrl,
        };
      })
    );

    const postResult = await addNewPost(postId, userId, caption);
    if (!postResult) throw new Error("Failed to add new post");

    await Promise.all(
      mediaInfo.map(async (media) => {
        const newMedia = await addNewMedia(media.mediaID, media.mediaType, media.mediaURL, postId);
        if (!newMedia) throw new Error("Failed to add new media");
      })
    );

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Inserts a new aeline on the Database
 *
 * @method POST
 * @route /line
 */
export const uploadLineController = async (req, res, next) => {};
