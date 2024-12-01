import jwt from "jsonwebtoken";

export const authenticateUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      tokenError: true,
      message: "Authorization token is missing or invalid.",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      const errorMessage = err.name === "TokenExpiredError" ? "Your session has expired. Please log in again." : "Invalid token. Access denied.";

      return res.status(401).json({
        tokenError: true,
        message: errorMessage,
      });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  });
};
