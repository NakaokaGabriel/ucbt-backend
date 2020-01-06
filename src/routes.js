import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import CategoryController from './app/controllers/CategoryController';
import UserCategoryController from './app/controllers/UserCategoryController';
import SubCategoriesController from './app/controllers/SubCategoriesController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/category', CategoryController.store);
routes.get('/category', CategoryController.index);
routes.put('/category/:category_id', CategoryController.update);

routes.post('/category/:category_id/:user_id', UserCategoryController.store);

routes.get('/subcategories', SubCategoriesController.index);
routes.post('/subcategories', SubCategoriesController.store);

export default routes;
