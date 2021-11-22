import express from 'express';

import * as UserController from './controller';

const router = express.Router();

router.get('/playlist', UserController.getMyPlaylist);
router.post('/color', UserController.changeColor);
router.post('/guest-color', UserController.changeNonUserColor);
router.put('/likes', UserController.putLikes);
router.delete('/likes', UserController.deleteLikes);

export default router;
