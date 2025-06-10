import express from "express";
import auth from "./../../middleware/auth.js"

const items = express.Router();

import create from './create.js';

items.post('/', auth, create);

export default items;