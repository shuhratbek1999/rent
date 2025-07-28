const {
  Elon,
  Images,
  Comment,
  Category,
  CategoryFields,
  ElonExtra,
  Subcategory,
  MainCategory,
  User,
  UserDate,
} = require("../../../models/init-models");
const HttpException = require("../../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
/******************************************************************************
 *                              Elon Controller
 ******************************************************************************/
class ElonController {
  io;
  socket;
  socketConnect = (io, socket) => {
    this.io = io;
    this.socket = socket;
  };
  getNameElon = async (req, res, next) => {
    // console.log(req.query, 'params', 'salommm');
    let model = await Elon.findAll({
      where: {
        name: req.query.name,
      },
      attributes: [
        "id",
        "category_id",
        "subcategory_id",
        [sequelize.literal("subcategory.name"), "category_name"],
        "name",
        "description",
        "create_at",
        "price",
        "status",
        "adress",
        "contact_name",
        "email",
        "foydalanish",
        "holati",
        "price_agreement",
        "phone_number",
      ],
      include: [
        { model: Images, as: "images", attributes: ["url"] },
        {
          model: Subcategory,
          as: "subcategory",
          attributes: ["name"],
          include: [{ model: MainCategory, as: "main_cat" }],
        },
        {
          model: User,
          as: "user",
          include: [{ model: UserDate, as: "user_date" }],
        },
        {
          model: ElonExtra,
          as: "elonExtra",
          include: [{ model: CategoryFields, as: "category_fields" }],
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
    });
    res.status(200).send({
      success: true,
      error_code: 200,
      message: "information is out",
      data: model,
    });
  };
  //adminlar uchun
  adminAll = async (req, res, next) => {
    let model = await Elon.findAll({
      attributes: [
        "id",
        "category_id",
        "subcategory_id",
        [sequelize.literal("category.name"), "category_name"],
        "name",
        "description",
        "create_at",
        "price",
        "status",
        "adress",
        "contact_name",
        "email",
        "foydalanish",
        "holati",
        "price_agreement",
        "phone_number",
      ],
      include: [
        { model: Images, as: "images", attributes: ["url"] },
        { model: Category, as: "category", attributes: ["name"] },
      ],
    });
    res.status(200).send({
      success: true,
      error_code: 200,
      message: "information is out",
      data: model,
    });
  };
  // royhatdan otganlar uchun
  userOne = async (req, res, next) => {
    let model = await Elon.findAll({
      where: {
        user_id: req.currentUser.id,
      },
      attributes: [
        "id",
        "category_id",
        "subcategory_id",
        [sequelize.literal("category.name"), "category_name"],
        "name",
        "description",
        "create_at",
        "price",
        "status",
        "adress",
        "contact_name",
        "email",
        "foydalanish",
        "holati",
        "price_agreement",
        "phone_number",
      ],
      include: [
        { model: Images, as: "images", attributes: ["url"] },
        { model: Category, as: "category", attributes: ["name"] },
      ],
    });
    res.status(200).send({
      success: true,
      error_code: 200,
      message: "information is out",
      data: model,
    });
  };

  getOne = async (req, res, next) => {
    const model = await Elon.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "category_id",
        "subcategory_id",
        [sequelize.literal("category.name"), "category_name"],
        [sequelize.literal("subcategory.name"), "subcategory_name"],
        "name",
        "description",
        "create_at",
        "price",
        "status",
        "adress",
        "contact_name",
        "email",
        "foydalanish",
        "holati",
        "price_agreement",
        "phone_number",
        "pay_type",
      ],
      include: [
        { model: Images, as: "images", attributes: ["url"] },
        {
          model: Subcategory,
          as: "subcategory",
          attributes: ["id", "name"],
          include: [{ model: MainCategory, as: "main_cat" }],
        },
        {
          model: Category,
          as: "category",
          include: [
            {
              model: Subcategory,
              as: "sub_cat",
              include: [{ model: MainCategory, as: "main_cat" }],
            },
          ],
        },
        {
          model: ElonExtra,
          as: "elonExtra",
          include: [{ model: CategoryFields, as: "category_fields" }],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!model) {
      throw new HttpException(404, "information not found");
    }
    res.status(200).send({
      success: true,
      error_code: 200,
      message: "information is out",
      data: model,
    });
  };
  // admin uchun
  adminElonAll = async (req, res, next) => {
    const model = await Elon.findAll({
      where: {
        status: { [Op.ne]: "tasdiqlangan" },
      },
      attributes: [
        "id",
        "category_id",
        "subcategory_id",
        [sequelize.literal("subcategory.name"), "category_name"],
        "name",
        "description",
        "create_at",
        "price",
        "status",
        "adress",
        "contact_name",
        "email",
        "foydalanish",
        "holati",
        "price_agreement",
        "phone_number",
      ],
      include: [
        { model: Images, as: "images", attributes: ["url"] },
        { model: Subcategory, as: "subcategory", attributes: ["name"] },
      ],
    });
    if (!model) {
      throw new HttpException(404, "not found");
    }
    res.send({
      success: true,
      message: "elon all",
      data: model,
    });
  };
  create = async (req, res, next) => {
    try {
      await this.checkValidation(req);
      let time = Math.floor(new Date().getTime() / 1000);
      const {
        name,
        description,
        category_id,
        subcategory_id,
        price,
        status,
        adress,
        contact_name,
        email,
        foydalanish,
        holati,
        price_agreement,
        phone_number,
        Comment,
        fields,
        pay_type,
      } = req.body;
      const model = await Elon.create({
        name,
        description,
        category_id,
        subcategory_id,
        create_at: time,
        price,
        status,
        adress,
        contact_name,
        email,
        foydalanish,
        holati,
        price_agreement,
        phone_number,
        user_id: req.currentUser.id,
        pay_type,
      });
      await this.#ImagesAdd(req.files, model);
      await this.#CommentAdd(Comment, model);
      await this.#elonExtra(fields, model);
      await this.io.emit("updateElon");
      res.status(200).send({
        success: true,
        error_code: 200,
        message: "information added",
        data: model,
      });
    } catch (err) {
      throw new HttpException(404, err);
    }
  };
  update = async (req, res, next) => {
    try {
      let data = req.body;
      console.log(data, "files");

      let time = Math.floor(new Date().getTime() / 1000);
      const model = await Elon.findOne({
        where: {
          id: req.params.id,
        },
      });
      model.name = data.name;
      model.description = data.description;
      model.category_id = data.category_id;
      model.subcategory_id = data.subcategory_id;
      model.price = data.price;
      model.create_at = time;
      model.status = data.status;
      model.adress = data.adress;
      model.contact_name = data.contact_name;
      model.email = data.email;
      model.foydalanish = data.foydalanish;
      model.holati = data.holati;
      model.price_agreement = data.price_agreement;
      model.phone_number = data.phone_number;
      model.pay_type = data.pay_type;
      model.user_id = req.currentUser.id;
      model.save();
      if (data.img) {
        if (Array.isArray(req.files) && Array.isArray(data.img)) {
          data.img.forEach((f) => {
            let file = {
              filename: f,
            };
            req.files.push(file);
          });
        } else {
          let file = {
            filename: data.img,
          };
          req.files.push(file);
        }
      }
      await this.#ImagesAdd(req.files, model, false);
      await this.#CommentAdd(data.Comment, model, false);
      await this.#elonExtra(data.fields, model, false);
      res.status(200).send({
        success: true,
        error_code: 200,
        message: "Information update",
        data: model,
      });
    } catch (err) {
      throw new HttpException(400, err);
    }
  };
  #ImagesAdd = async (images, model, insert = true) => {
    try {
      if (!insert) {
        await this.#deleteImg(model.id);
      }
      console.log(images, "images");
      for (let key of images) {
        let img = {
          url: key.filename ? key.filename : key,
          doc_id: model.id,
        };
        await Images.create(img);
      }
    } catch (err) {
      throw new HttpException(400, err);
    }
  };
  #CommentAdd = async (comment, model, insert = true) => {
    try {
      comment = comment ? JSON.parse(comment) : "";
      let time = Math.floor(new Date().getTime() / 1000);
      if (!insert) {
        await this.#deleteComment(model.id);
      }
      if (Comment.length > 0) {
        for (let key of comment) {
          let comment = {
            comment_text: key.comment_text,
            user_id: req.currentUser.id,
            elon_id: model.id,
            created_at: time,
          };
          await Comment.create(comment);
        }
      }
    } catch (err) {
      throw new HttpException(400, err);
    }
  };
  #elonExtra = async (elonExtra, model, insert = true) => {
    try {
      elonExtra = elonExtra ? JSON.parse(elonExtra) : "";

      if (!insert) {
        await this.#deleteElonExtra(model.id);
      }
      for (let key of elonExtra) {
        let extra = {
          elon_id: model.id,
          field_id: key.field_id,
          values: key.values ? key.values : "",
        };
        // console.log(extra, "key");
        await ElonExtra.create(extra);
      }
    } catch (err) {
      throw new HttpException(400, err);
    }
  };
  #deleteElonExtra = async (id) => {
    await ElonExtra.destroy({ where: { elon_id: id } });
  };
  #deleteImg = async (id) => {
    await Images.destroy({ where: { doc_id: id } });
  };
  #deleteComment = async (id) => {
    await Comment.destroy({ where: { elon_id: id } });
  };
  delete = async (req, res, next) => {
    try {
      await this.#deleteImg(req.params.id);
      const model = await Elon.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!model) {
        throw new HttpException(404, "id not found");
      } else {
        res.status(200).send({
          success: true,
          error_code: 200,
          message: "information delete",
          data: model,
        });
      }
    } catch (err) {
      throw new HttpException(400, err);
    }
  };
  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ElonController();
