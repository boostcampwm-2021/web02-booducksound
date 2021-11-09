import express from 'express';

import UserController from './controller';

const router = express.Router();

router.post('/changeColor', UserController.changeColor);
export default router;
