import { Router } from 'express';
const router = Router();
import thoughtRoutes from './thoughtRoute.js';
import userRoutes from './userRoute.js';

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

export default router;
