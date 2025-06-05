import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const port = 3000;
const app = express();

app.use(cookieParser());
app.use('/', routes)

app.listen(port);

console.log(`Api started on port ${port}`);