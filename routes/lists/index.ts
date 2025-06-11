import express from "express";
import auth from "./../../middleware/auth.js"

const lists = express.Router();

import create from './create.js';
import get from './getAll.js';
import remove from './remove.js';

lists.post('/', auth, create);
lists.get('/', auth, get);
lists.delete('/', auth, remove);

export default lists;