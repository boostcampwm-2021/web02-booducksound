import express from 'express';

import playList from './controller';

const router = express.Router();

// router.get('playList/filter', playList.filter);
router.post('/register', playList.register);
router.put('/modify', playList.modify);
router.delete('/delete', playList.del);

export default router;
