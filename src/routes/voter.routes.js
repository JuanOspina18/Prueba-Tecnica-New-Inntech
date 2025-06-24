import { Router } from 'express';
import checkRoleConflict from '../middleware/middleware.js';
import { getVoters, getVoterById, postVoter, deleteVoter } from '../controller/voter.controller.js';
const voterRouter = Router();

voterRouter.get('/voter', getVoters);
voterRouter.get('/voter/:id', getVoterById);
voterRouter.post('/voter', checkRoleConflict, postVoter);
voterRouter.delete('/voter/:id', deleteVoter)

export default voterRouter;