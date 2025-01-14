import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction  } from '../../controllers/thoughtController.js';

// /api/thoughts
router

.route('/')
.get(getThoughts)
.get(getSingleThought)
.post(createThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId
router

.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction);

export default router;
