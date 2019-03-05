// api/routes/users.js

import express from 'express';
import UsersController from '../controllers/users';
// import auth from '../auth/index';

const router = express.Router();


router.post('/signup', UsersController.signup);

router.post('/login', UsersController.login);

router.get('/admin', UsersController.admin);

// router.post('/manageUser', auth, UsersController.manageUser);


export default router;
