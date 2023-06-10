const {News} = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              News Controller
 ******************************************************************************/
class NewsController {
    getAll = async (req, res, next) =>{
        const model = await News.findAll(); 
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
       }
    getOne = async (req, res, next) =>{
        const model = await News.findOne({
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
        let datetime = Math.floor(new Date().getTime()/1000)
        const modell = await News.create({
            "name": req.body.name,
            "image": req.body.file,
            "aftor": req.body.aftor,
            "text": req.body.text,
            "datetime": datetime,
        });
        res.status(200).send({
            error: false,  
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: modell
        });
    }
    update = async (req, res, next) =>{
        let data = req.body;
        let datetime = Math.floor(new Date().getTime()/1000)
            const model = await News.findOne({
                where:{
                    id: req.params.id
                }
            })
        model.name = data.name;
        model.image = data.file;
        model.aftor = data.aftor;
        model.text = data.text;
        model.datetime = datetime;
        model.comment_id = data.comment_id;
        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await News.destroy({
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
module.exports = new NewsController;