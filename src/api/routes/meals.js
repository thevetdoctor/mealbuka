// api/routes/meals.js

// import { Route } from 'express';

import express from 'express';
import mealsController from '../controllers/meals';
import auth from '../auth/index';

const router = express.Router();


router.post('/', auth, mealsController.addMeal);

router.put('/:id', auth, mealsController.modifyMeal);

router.delete('/:id', auth, mealsController.deleteMeal);

router.get('/', auth, mealsController.getAllMeals);


export default router;
