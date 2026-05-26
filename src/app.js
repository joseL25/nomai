import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.routes.js';

const app = express();

// Middlewares globales
app.use(cors({
    origin:['https://nomai.app'],
    methods:[]
}));
app.use(express.json());

// Montaje de rutas base
app.use('/api', indexRouter);

export default app;
