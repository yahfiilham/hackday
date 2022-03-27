module.exports = {
  getUsers: 'SELECT users.id, username, fullname, email, password, user_picture, refresh_token, post_id, user_id, picture_post, created_at, updated_at FROM users INNER JOIN posts ON posts.user_id = users.id ORDER BY posts.post_id DESC',
  getUserById:
    'SELECT users.id, username, fullname, email, password, user_picture, refresh_token, post_id, user_id, picture_post, created_at, updated_at FROM users LEFT JOIN posts ON posts.user_id = users.id WHERE users.id = $1 ORDER BY posts.post_id DESC',
  checkEmailExists: 'SELECT * FROM users WHERE email = $1',
  createUser: 'INSERT INTO users (username, fullname, email, password) VALUES ($1, $2, $3, $4)',
  updateUser: 'UPDATE users SET username = $1, fullname = $2, user_picture = $3 WHERE id = $4',
};
