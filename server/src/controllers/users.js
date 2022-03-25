const pool = require('../../services/db');
const queries = require('../queries/users');

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
};
