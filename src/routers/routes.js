import express from 'express';
import { authRouter } from './authRouter.js';
import { statusRouter } from './statusRouter.js';

const router = express.Router();

router.use(authRouter);
router.use(statusRouter);

export default router;