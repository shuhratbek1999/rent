const { body } = require('express-validator');

exports.validateLogin = [
    body('name')
        .optional()
        .isLength({ min: 3, max: 30})
        .withMessage('Must be [3: 30] chars long'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('email')
        .exists()
        .withMessage('email is required')
];