import jwt from "jsonwebtoken";

export const authenticateUserCookie = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      tokenError: true,
      message: "No token provided. Please Login Again",
    });
  }

  jwt.verify(token, process.env.TOKEN, (err, data) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired. Please log in again." });
      }
      console.error(err);
      return res.status(403).json({ message: "Token verification failed. Please log in again." });
    }

    req.userId = data.userId;
    req.role = data.role;

    next();
  });
};
