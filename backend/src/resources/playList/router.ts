import express from 'express';

import Playlist from './controller';

const router = express.Router();

// router.get('Playlist/filter', Playlist.filter);
router.post('/', Playlist.register);
router.put('/', Playlist.modify);
router.delete('/', Playlist.del);

export default router;
