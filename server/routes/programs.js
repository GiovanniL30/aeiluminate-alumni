import express from "express";
import connection from "../connections.js";

export const router = express.Router();

router.get("/programs", (req, res) => {
  const query = "SELECT * FROM academic_programs";

  connection.query(query, (error, result) => {
    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json(result);
  });
});
