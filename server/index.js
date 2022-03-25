const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./src/routes/index');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes
app.get('/', (req, res) => {
  res.send('Welcome to Simple Media Social Database!');
});

app.use('/api/v1', router);

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server running at http://localhost:5050`));
