const Joi = require("joi");
const Reply = require("../models/reply");
const ReplyDTO = require("../dto/reply");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const replyController = {
  async create(req, res, next) {
    const createReplySchema = Joi.object({
      reply: Joi.string().required(),
      complaint: Joi.string().regex(mongodbIdPattern).required(),
      user: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = createReplySchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { reply, complaint, user } = req.body;

    try {
      const newReply = new Reply({
        reply,
        complaint,
        user,
      });

      await newReply.save();
    } catch (error) {
      return next(error);
    }
    return res.status(201).json({ message: "Reply Created" });
  },

  async getById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    let { id } = req.params;
    let reply;
    try {
      reply = await Reply.find({ complaint: id }).populate("user");
    } catch (error) {
      return next(error);
    }
    let replyDto = [];

    for (let i = 0; i < reply.length; i++) {
      const obj = new ReplyDTO(reply[i]);
      replyDto.push(obj);
    }

    return res.status(200).json({ data: replyDto });
  },
};

module.exports = replyController;
