import express from 'express';
import bodyParser from 'body-parser';
import users from './users/index.js';
import groups from './groups/index.js';

const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true}));
routes.use(bodyParser.json());

routes.use((req, res, next) => {
	console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
	next();
})

routes.use('/user', users)
routes.use('/group', groups)

export default routes;