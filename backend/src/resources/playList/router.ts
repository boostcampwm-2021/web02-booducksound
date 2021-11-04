import express from 'express';

import playList from './controller';

const router = express.Router();

// router.get('playList/filter', playList.filter);
router.post('/', playList.register);
router.put('/', playList.modify);
router.delete('/', playList.del);

export default router;
