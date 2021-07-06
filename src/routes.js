const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionController = require('./controllers/SessionController');
const StopController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', StopController.index);
routes.post('/spots', upload.single('thumbnail'), StopController.store);

routes.get('/dashboard', DashboardController.show);


module.exports = routes;