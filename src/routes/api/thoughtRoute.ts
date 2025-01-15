import { Router } from 'express';
const router = Router();
import {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getReactions,
    createReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

// /api/thoughts/:thoughtId
router.route('/:thoughtId/reactions').get(getReactions).post(createReaction)

router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction);

export default router;
