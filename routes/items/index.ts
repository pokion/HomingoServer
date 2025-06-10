import express from "express";
import auth from "./../../middleware/auth.js"

const items = express.Router();

import create from './create.js';
import get from './getAll.js';
import remove from './remove.js';

items.post('/', auth, create);
items.get('/', auth, get);
items.delete('/', auth, get);

export default items;