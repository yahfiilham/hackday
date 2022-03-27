require('dotenv').config({ path: './.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const router = require('./src/routes/index');

// Handle post img
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },

  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  multer({
    storage: fileStorage,
    fileFilter,
  }).single('image'),
);
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes
app.get('/', (req, res) => {
  res.send('Welcome to Simple Media Social Database!');
});

app.use('/api/v1', router);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running at http://localhost:5050`));
