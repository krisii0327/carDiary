const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json()); //ez miatt a sor miatt tudtunk a json-t feldolgozni
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
//middleware
//cors felelős azért, hogy tudjuk használni a backendet és a frontendet (cors-middleware)
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/accountRoutes'));
app.use('/', require('./routes/noteRoutes'));

app.get('/api/test', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json('test ok');
});

app.listen(4000);
