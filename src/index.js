import express from 'express';
const app = express();  
import {pool} from './models/db.js';
import router from './routes/voter.routes.js';
import morgan from 'morgan';
import candidaterouter from './routes/candidate.routes.js';
import voterRouter from './routes/voter.routes.js';
import voteRouter from './routes/vote.routes.js';
import checkRoleConflict from './middleware/middleware.js';

const PORT = process.env.PORT ?? 3307;
app.use(express.json());
app.use(morgan('dev'));
app.use('/', voterRouter);
app.use('/', candidaterouter);
app.use('/', voteRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 