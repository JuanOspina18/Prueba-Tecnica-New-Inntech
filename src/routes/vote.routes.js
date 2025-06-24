import { Router } from 'express';
import { getVotes, getVoteStatistics, postVote } from '../controller/vote.controller.js';
const voteRouter = Router();

voteRouter.get('/votes', getVotes);
voteRouter.get('/votes/statistics', getVoteStatistics);
voteRouter.post('/votes', postVote);

export default voteRouter;