module.exports = {
  postImg: 'INSERT INTO posts(user_id, picture_post) VALUES($1, $2)',
  deleteImg: 'DELETE FROM posts WHERE post_id = $1',
};
