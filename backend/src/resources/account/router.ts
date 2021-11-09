import express from 'express';

import UserController from './controller';

const router = express.Router();

router.get('/check-id', UserController.checkId);
router.get('/check-login', UserController.checkLogin);
router.post('/reset-pwd', UserController.resetPwd);
router.post('/sign-in', UserController.signIn);
router.post('/sign-up', UserController.signUp);
router.post('/guest-sign-in', UserController.guestSignIn);
router.get('/log-out', UserController.logOut);

export default router;
