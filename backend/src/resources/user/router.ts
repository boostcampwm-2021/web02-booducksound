import express from 'express';

import UserController from './controller';

const router = express.Router();

router.get('/getMyPlaylist', UserController.getMyPlaylist);
router.post('/changeColor', UserController.changeColor);
export default router;
