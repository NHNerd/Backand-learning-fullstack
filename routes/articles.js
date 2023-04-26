import express from 'express';
import {
  authCheck,
  handleValidationErrors,
  articlesCreateValidation,
  upload,
} from '../middleware/index.js';
import * as controller from '../controllers/articles.js';
const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/get/:id', controller.get);
router.post(
  '/create',
  authCheck,
  articlesCreateValidation, //? articlesCreateValidation make validation, if there are errors, then handleValidationErrors parses them and returns the answer
  handleValidationErrors,
  controller.create
);
router.delete('/remove/:id', authCheck, controller.remove);
router.patch(
  '/update/:id',
  authCheck,
  articlesCreateValidation,
  handleValidationErrors,
  controller.update
);

router.post('/upload', authCheck, upload.single('image'), controller.upload);

export default router;
