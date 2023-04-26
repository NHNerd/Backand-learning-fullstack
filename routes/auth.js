import express from 'express';
import {
  authCheck,
  handleValidationErrors,
  registerValidation,
  loginValidation,
} from '../middleware/index.js';
import * as controller from '../controllers/auth.js';
const router = express.Router();

//? loginValidation make validation, if there are errors, then handleValidationErrors parses them and returns the answer
router.post('/login', loginValidation, handleValidationErrors, controller.login);
router.post('/register', registerValidation, handleValidationErrors, controller.register);
router.get('/me', authCheck, controller.me);

export default router;
