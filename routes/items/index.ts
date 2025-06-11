import express from "express";
import auth from "./../../middleware/auth.js"

const items = express.Router();

import create from './create.js';
import get from './getAll.js';
import remove from './remove.js';
import update from './update.js';

items.post('/', auth, create);
items.get('/', auth, get);
items.delete('/', auth, remove);
items.patch('/:itemId', auth, update);

export default items;