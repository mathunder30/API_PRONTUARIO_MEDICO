import express, {Request, Response, Router} from 'express';
const path = require('path');

const app = express();

app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');