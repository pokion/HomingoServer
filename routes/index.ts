import express from 'express';
import bodyParser from 'body-parser';
import users from './users/index.js';

const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true}));
routes.use(bodyParser.json());

routes.use('/user', users)

export default routes;