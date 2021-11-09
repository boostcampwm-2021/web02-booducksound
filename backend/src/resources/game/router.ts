import express from 'express';

import { getMusic } from './controller';

const router = express.Router();

router.get('/:uuid/:round', getMusic);

export default router;
