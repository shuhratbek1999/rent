const { body } = require('express-validator');

exports.validateLogin = [
    body('center_number')
        .exists()
        .withMessage('Center Number is required')
        .isInt()
        .withMessage('Center Number must be integer')
        ,
    body('phone_number')
        .optional()
        .isLength({ min: 3, max: 30})
        .withMessage('Must be [3: 30] chars long'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];