// api/routes/orders.js

import express from 'express';
import ordersController from '../controllers/orders';
import auth from '../auth/index';

const router = express.Router();


router.post('/', auth, ordersController.makeOrder);

router.get('/', auth, ordersController.getOrders);

router.get('/:id', auth, ordersController.getSpecificOrders);

router.put('/:id', auth, ordersController.modifyOrder);

router.delete('/:id', auth, ordersController.deleteOrder);


export default router;
