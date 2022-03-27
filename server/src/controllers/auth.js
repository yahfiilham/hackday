const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../../services/db');
const queries = require('../queries/auth');
const queryUsers = require('../queries/users');

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;

    try {
      pool.query(queryUsers.checkEmailExists, [email], async (error, result) => {
        const match = await bcrypt.compare(password, result.rows[0].password);

        if (!match) return res.status(400).json({ msg: 'wrong password!' });

        const { id: userId, fullname: fullName, email } = result.rows[0];

        const accessToken = jwt.sign({ userId, fullName, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20s',
        });

        const refreshToken = jwt.sign({ userId, fullName, email }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d',
        });

        pool.query(queries.updateToken, [refreshToken, userId], (error, result) => {});

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        // Kirim json untuk diakses oleh client
        res.json({ accessToken });
      });
    } catch (error) {
      res.status(400).json({ msg: 'Email does not exist!' });
    }
  },

  refreshToken: (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) return res.sendStatus(401);

      pool.query(queries.refreshToken, [refreshToken], (error, result) => {
        if (!result.rows[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
          if (err) return res.sendStatus(403);

          const { id: userId, fullname: fullName, email } = result.rows[0];
          const accessToken = jwt.sign({ userId, fullName, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s',
          });

          res.json({ accessToken });
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    pool.query(queries.refreshToken, [refreshToken], (error, result) => {
      if (!result.rows[0]) return res.sendStatus(204);

      const userId = result.rows[0].id;
      pool.query(queries.updateToken, [null, userId], (error, result) => {});

      res.clearCookie('refreshToken');

      return res.sendStatus(200);
    });
  },
};
