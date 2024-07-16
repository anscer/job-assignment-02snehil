import { Router } from 'express';
import { createState, getStates, getStateById, updateState, deleteState } from '../controllers/stateController';
import { ensureAuthenticated } from '../auth';

const router: Router = Router();

router.post('/', ensureAuthenticated, createState);
router.get('/', getStates);
router.get('/:id', getStateById);
router.put('/:id', ensureAuthenticated, updateState);
router.delete('/:id', ensureAuthenticated, deleteState);

export default router;
