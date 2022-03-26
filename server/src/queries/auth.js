module.exports = {
  updateToken: 'UPDATE users SET refresh_token = $1 WHERE id = $2',
  refreshToken: 'SELECT * FROM users WHERE refresh_token = $1',
};
