import authCheck from '../middleware/checkAuth.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import {
  loginValidation,
  registerValidation,
  articlesCreateValidation,
} from './validations.js';
import { storage, upload } from './upload.js';

// Export them as an object
export {
  authCheck,
  handleValidationErrors,
  loginValidation,
  registerValidation,
  articlesCreateValidation,
  upload,
  storage,
};
