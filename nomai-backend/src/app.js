import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.routes.js';
import notFoundMiddleware from './middlewares/notFound.middlewares.js';

const app = express();

// Middlewares globales
app.use(cors({
  origin: ['https://nomai.app'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// Montaje de rutas base
app.use('/api', indexRouter);

// 404 para rutas no encontradas
app.use(notFoundMiddleware);

export default app;
