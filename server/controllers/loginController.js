import jwt from "jsonwebtoken";

import { checkEmail, validateEmailAndPassword } from "../mysqlQueries/readQueries.js";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN, { expiresIn: "2h" });
};

/**
 *
 * Validate the Email and Password from the Database
 *
 * @method POST
 * @route /api/login
 */
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email or Password is missing" });

  try {
    const emailExists = await checkEmail(email);

    if (!emailExists) return res.status(401).json({ message: "Email does not exist" });

    const checkUser = await validateEmailAndPassword(email, password);

    if (!checkUser) return res.status(403).json({ message: "Invalid Email or password" });
    else {
      const { password, ...user } = checkUser;

      const token = generateToken(user.userID, user.role);

      console.log("Generated Token:", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.MODE === "production",
      });
      res.status(200).json({ user });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
};
