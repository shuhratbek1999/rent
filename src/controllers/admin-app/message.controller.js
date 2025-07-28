const { Op } = require("sequelize");
const {
  Xabar,
  Room,
  User,
  Elon,
  Images,
} = require("../../../models/init-models");
const HttpException = require("../../utils/HttpException.utils");
const user = require("../../../models/user");

/******************************************************************************
 *                              Message Controller
 ******************************************************************************/
class MessageController {
  getAll = async (req, res, next) => {
    const model = await Room.findAll({
      include: [
        { model: Xabar, as: "xabar" },
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
          include: [
            {
              model: Elon,
              as: "elon",
              attributes: ["id", "name", "phone_number", "price"],
              include: [{ model: Images, as: "images", attributes: ["url"] }],
            },
          ],
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

  getOne = async (req, res, next) => {
    try {
      const { myId, otherUserId } = req.params;
      const model = await Xabar.findAll({
        where: {
          [Op.or]: [
            {
              sender_id: myId,
              receiverId: otherUserId,
            },
            {
              sender_id: otherUserId,
              receiverId: myId,
            },
          ],
        },
        order: [["time", "ASC"]], // vaqt bo‘yicha saralash
      });

      if (!model || model.length === 0) {
        throw new HttpException(404, "Xabarlar topilmadi");
      }

      res.status(200).send({
        success: true,
        error_code: 200,
        message: "Xabarlar muvaffaqiyatli olindi",
        data: model,
      });
    } catch (err) {
      next(err);
    }
  };
  getChattedUsers = async (req, res, next) => {
    try {
      const { myId } = req.params;
      const messages = await Xabar.findAll({
        where: {
          [Op.or]: [{ sender_id: myId }, { receiverId: myId }],
        },
        attributes: ["sender_id", "receiverId"],
      });
      const userIds = new Set();
      messages.forEach((msg) => {
        if (msg.sender_id != myId) userIds.add(msg.sender_id);
        if (msg.receiverId != myId) userIds.add(msg.receiverId);
      });
      const users = await User.findAll({
        where: {
          id: { [Op.in]: Array.from(userIds) },
        },
        attributes: ["id", "name", "email"], // kerakli fieldlar
      });
      console.log(users);

      res.status(200).send({
        success: true,
        error_code: 200,
        message: "Xabarlar muvaffaqiyatli olindi",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  };
  getIncomingUsers = async (req, res, next) => {
    try {
      const { myId } = req.params;
      console.log(myId);
      const senders = await Xabar.findAll({
        where: {
          receiverId: myId,
        },
        group: ["sender_id"],
        include: [
          {
            model: User,
            as: "sender", // modelda aloqani `as: 'sender'` deb belgilagan bo‘lish kerak
            attributes: ["id", "name"], // faqat kerakli maydonlar
          },
        ],
      });
      res.status(200).send(senders);
    } catch (err) {
      next(err);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new MessageController();
