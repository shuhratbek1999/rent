const UserModel = require('../../models/user.model');
const HttpException = require('../../utils/HttpException.utils');
const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('../../startup/config');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { phone_number, password: pass } = req.body;
        console.log(phone_number);
        console.log(pass);
        const user = await UserModel.findOne({
            where:{ 
                phone_number: phone_number,
                status: status.active
            }
        });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password_hash);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const token = jwt.sign({ user_id: user.id.toString() }, secret_jwt, {
            expiresIn: '24h'
        });

        user.token = token;
        
        res.send({
            success: true,
            message: 'User info',
            data: user
        });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;