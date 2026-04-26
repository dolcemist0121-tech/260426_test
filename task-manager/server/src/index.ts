import express from 'express';
import cors from 'cors';
import { runMigrations } from './db/migrate';
import tasksRouter from './routes/tasks';
import categoriesRouter from './routes/categories';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

runMigrations();

app.use('/api/tasks', tasksRouter);
app.use('/api/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
