import express from "express";
import auth from "./../../middleware/auth.js"

const gropus = express.Router();

import create from './create.js';

gropus.post('/', auth, create);

export default gropus;