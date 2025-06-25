import express from "express";
import auth from "./../../middleware/auth.js"

const users = express.Router();

import register from './register.js';
import login from './login.js';
import userData from './getAllData.js';

users.post('/', register);
users.post('/login', login);
users.get('/userData', auth, userData)

export default users;