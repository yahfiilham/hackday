const { validationResult } = require('express-validator');
const pool = require('../../services/db');
const queries = require('../queries/post');
const queryUsers = require('../queries/users');

module.exports = {
  postImage: (req, res) => {
    const userId = req.params.id;
    const postImg = req.file.path;

    // validasi input user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.errors[0].msg });
    }

    // validasi input img
    if (!req.file) {
      return res.status(422).json({
        msg: 'image must be uploaded!',
      });
    }

    if (req.file.mimetype === 'image/png') {
      return res.status(402).json({
        msg: 'type PNG does not support!',
      });
    }

    // upload img
    pool.query(queryUsers.getUserById, [userId], (error, result) => {
      const noUser = !result.rows.length;
      if (noUser) return res.status(201).json({ msg: 'user does not exist in the database!' });

      pool.query(queries.postImg, [userId, postImg], (error, result) => {
        res.status(201).json({
          msg: 'Posted image successfully!',
        });
      });
    });
  },

  deleteImage: (req, res) => {
    const postId = req.body.postId;

    pool.query(queries.deleteImg, [postId], (error, result) => {
      res.status(200).json({
        msg: 'image deleted successfully!',
      });
    });
  },
};
