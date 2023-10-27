const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const db = require('./config/database');
const MovieController = require('./controller/MovieController');
const UserController = require('./controller/UserController');
const MovieModel = require('./model/MovieModel');

app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/upload'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Movie routes
app.post('/movies', MovieController.create);
app.get('/movies', MovieController.read);
app.put('/movies/:id', MovieController.update);
app.delete('/movies/:id', MovieController.delete);

// User routes
app.post('/users', UserController.create);
app.get('/users', UserController.read);
app.put('/users/:id', UserController.update);
app.delete('/users/:id', UserController.delete);

app.post('/movies/upload', upload.single('photo'), async (req, res) => {
  const file = path.resolve(req.file.path);
  console.log(file);

  if (!file) {
    res.status(400).send({
      status: false,
      data: 'No File is selected.',
    });
    return;
  }

  try {
    const movieData = {
      ...req.body,
      photo: file
    };
    const movie = await MovieModel.create(movieData);
    res.send({
      status: true,
      message: 'Movie has been created successfully!',
      data: movie,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});




app.listen(3000, function () {
  console.log('server running');
});