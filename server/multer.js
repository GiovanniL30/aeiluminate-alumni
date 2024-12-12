import multer from "multer";

/**
 *
 * @author Giovanni Leo
 */
const storage = multer.memoryStorage();
export const upload = multer({ storage });
