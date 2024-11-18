import jwt from "jsonwebtoken";

export const authenticateUserCookie = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided. Please Login Again" });
  }

  jwt.verify(token, process.env.TOKEN, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: err.message });
    }

    req.userId = data.userId;
    req.role = data.role;

    next();
  });
};
