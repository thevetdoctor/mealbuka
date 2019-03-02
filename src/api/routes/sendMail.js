// api/routes/meals.js

// import { Route } from 'express';

import express from 'express';
import mailController from '../controllers/sendMail';
import auth from '../auth/index';

const router = express.Router();


router.post('/', auth, mailController.sendMail);


export default router;
