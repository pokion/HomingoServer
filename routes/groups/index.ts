import express from "express";
import auth from "./../../middleware/auth.js"

const gropus = express.Router();

import create from './create.js';
import get from './getAll.js';
import remove from './remove.js';

gropus.post('/', auth, create);
gropus.get('/', auth, get);
gropus.delete('/', auth, remove);

export default gropus;