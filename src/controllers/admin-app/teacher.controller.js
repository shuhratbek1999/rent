const {Teacher} = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Teacher Controller
 ******************************************************************************/
class TeacherController {
    getAll = async (req, res, next) =>{
        const model = await Teacher.findAll(); 
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
       }
    getOne = async (req, res, next) =>{
        const model = await Teacher.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!model){
            throw new HttpException(404, "bu id da malumot yo\'q")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        const modell = await Teacher.create(req.body);
        res.status(200).send({
            error: false,  
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: modell
        });
    }
    update = async (req, res, next) =>{
        let data = req.body;
            const model = await Teacher.findOne({
                where:{
                    id: req.params.id
                }
            })
        model.name = data.name;
        model.image = data.image;
        model.lavozimi = data.lavozimi;
        model.toifasi = data.toifasi;
        model.phone = data.phone;
        model.email = data.email;
        model.tajribasi = data.tajribasi;
        model.fan = data.fan;
        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await Teacher.destroy({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, "bunday id yoq")
        }
        else{
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot ochirildi',
            data: model
        });
    }
    }
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new TeacherController;