import express from 'express';

import * as Playlist from './controller';

const router = express.Router();

router.get('/', Playlist.get);
router.get('/:_id', Playlist.getById);
router.post('/', Playlist.register);
router.put('/', Playlist.update);
router.delete('/:_id', Playlist.del);

export default router;
