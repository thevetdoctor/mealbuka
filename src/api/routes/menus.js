// api/routes/menus.js

import express from 'express';
import menusController from '../controllers/menus';
import auth from '../auth/index';

const router = express.Router();

router.post('/', auth, menusController.addMenu);

router.post('/special', auth, menusController.addMenuSpecial);

router.get('/', auth, menusController.getMenu);

router.get('/all', auth, menusController.getAllMenu);


export default router;
