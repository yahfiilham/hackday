module.exports = {
  getUsers:
    'SELECT users.id, username, fullname, email, password, user_picture, refresh_token, post_id, user_id, picture_post, picture_title, created_at, updated_at FROM users INNER JOIN posts ON posts.user_id = users.id ORDER BY posts.post_id DESC',
};
