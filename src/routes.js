import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CategoryController from './app/controllers/CategoryController';
import SubCategoriesController from './app/controllers/SubCategoriesController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', upload.single('file'), UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/category', CategoryController.index);

routes.post('/subcategories', SubCategoriesController.store);

export default routes;
