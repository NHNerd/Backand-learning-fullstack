import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'invalid mail format').isEmail(),
  body('password', 'password must contain at least 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'invalid mail format').isEmail(),
  body('password', 'password must contain at least 5 characters').isLength({ min: 5 }),
  body('name', 'name must contain at least 3 characters').isLength({ min: 3 }),
  //? optional - if avatar is not exist it's okay, if exists then check if it is a url
  body('avatarUrl', 'invalid link format').optional().isURL(),
];

export const articlesCreateValidation = [
  body('title', 'Title must contain at least 3 characters')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Text must contain at least 3 characters').isLength({ min: 3 }).isString(),
  body('tags', 'Invalid format (change to String)').optional().isArray(),
  body('imageURL', 'Invalid image link').optional().isString(),
];
