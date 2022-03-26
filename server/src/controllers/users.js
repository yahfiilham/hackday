const pool = require('../../services/db');
const queries = require('../queries/users');

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
  getUsers: (req, res) => {
    try {
      pool.query(queries.getUsers, (error, result) => {
        res.status(200).json({
          msg: 'Successful',
          data: result.rows,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (req, res, next) => {
    const { username, fullName, email, password } = req.body;

    // validasi input user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.errors[0].msg });
    }

    // password handling
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // capitalize fullname
    const name = fullName.split(' ');
    for (let i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    const newFullName = name.join(' ');

    try {
      // check email exist
      pool.query(queries.checkEmailExists, [email], (error, result) => {
        if (result.rows.length) return res.status(400).json({ msg: 'Email already exists!' });

        pool.query(queries.createUser, [username, newFullName, email, hashPassword], (error, result) => {
          if (error) throw error;

          res.status(201).json({
            message: 'user created successfully!',
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  getUserById: (req, res) => {
    const id = parseInt(req.params.id);
    try {
      pool.query(queries.getUserById, [id], (error, result) => {
        const noUsers = !result.rows.length;
        if (noUsers) return res.status(201).json({ msg: 'user does not exist in the database!' });

        res.status(200).json({
          message: 'Successful',
          data: result.rows,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: (req, res) => {
    const userId = req.params.id;
    const { username, fullName } = req.body;
    const userImg = req.file.path;

    // validasi input user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.errors[0].msg });
    }

    // validasi input image
    if (!req.file) {
      return res.status(422).json({ msg: 'image must be uploaded!' });
    }

    // capitalize fullname
    const names = fullName.split(' ');
    names.forEach((name, i) => {
      // console.log(names[i].charAt(0));
      names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
    });
    const name = names.join(' ');

    // update user
    pool.query(queries.getUserById, [userId], (error, result) => {
      const noUser = !result.rows.length;
      if (noUser) return res.status(201).json({ msg: 'user does not exist in the database!' });

      pool.query(queries.updateUser, [username, name, userImg, userId], (error, result) => {
        res.status(201).json({
          msg: 'user updated successfully!',
        });
      });
    });
  },
};
