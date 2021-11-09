import express from 'express';

import { getInitialMusic, getNextMusic } from './controller';

const router = express.Router();

router.get('/:uuid/init', getInitialMusic);
router.get('/:uuid/next', getNextMusic);

export default router;
