import express from "express";
import connection from "../connections.js";

export const router = express.Router();

router.get("/users", (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  let query = `
    SELECT users.*, user_details.email 
    FROM users 
    LEFT JOIN user_details ON users.userID = user_details.userid 
    LIMIT ? OFFSET ?
  `;
  const queryParams = [parseInt(pageSize), parseInt(offset)];

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    let countQuery = `
      SELECT COUNT(*) AS total 
      FROM users 
      LEFT JOIN user_details ON users.userID = user_details.userid
    `;

    connection.query(countQuery, (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const totalRecords = countResult[0].total;
      const totalPages = Math.ceil(totalRecords / pageSize);

      res.json({
        results,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalRecords: totalRecords,
          totalPages: totalPages,
        },
      });
    });
  });
});
