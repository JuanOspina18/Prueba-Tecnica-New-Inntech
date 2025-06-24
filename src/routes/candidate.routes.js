import { Router } from 'express';
import checkRoleConflict from '../middleware/middleware.js';
import { getCandidates, getCandidateById, postCandidate, deleteCandidate } from '../controller/candidate.controller.js';
const candidaterouter = Router();

candidaterouter.get('/candidates', getCandidates);
candidaterouter.get('/candidates/:id', getCandidateById);
candidaterouter.post('/candidates', checkRoleConflict, postCandidate);
candidaterouter.delete('/candidates/:id', deleteCandidate);

export default candidaterouter;