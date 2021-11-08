import express from 'express';

import UserController from './controller';

const router = express.Router();

router.get('/checkId', UserController.checkId);
router.get('/checkLogin', UserController.checkLogin);
router.post('/resetPwd', UserController.resetPwd);
router.post('/signIn', UserController.signIn);
router.post('/signUp', UserController.signUp);
router.post('/guestSignIn', UserController.guestSignIn);
router.get('/logOut', UserController.logOut);
router.post('/changeColor', UserController.changeColor);

export default router;
