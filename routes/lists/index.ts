import express from "express";
import auth from "./../../middleware/auth.js"

const lists = express.Router();

import create from './create.js';

lists.post('/', auth, create);

export default lists;