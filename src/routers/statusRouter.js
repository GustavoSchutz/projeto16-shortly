import express from 'express';
import { serverStatus } from '../controllers/status.controller.js';
//import 

const statusRouter = express.Router();
statusRouter.get('/status', serverStatus);

export { statusRouter };