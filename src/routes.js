import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', upload.single('file'), UserController.store);
routes.get('/users', UserController.index);

export default routes;
