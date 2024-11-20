import { getPrograms } from "../mysqlQueries/readQueries.js";

/**
 *
 * Get all list of programs on Database (programs)
 *
 * @method GET
 * @route /api/programs
 */
export const getProgramsController = async (req, res) => {
  try {
    const programs = await getPrograms();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Failed to get programs" });
  }
};
