const Joi = require("joi");
const fs = require("fs");
const Complaint = require("../models/complaint");
const Reply = require("../models/reply");
const { BACKEND_SERVER_PATH } = require("../config/index");

const ComplaintDTO = require("../dto/complaint");
const DetailsComplaintDTO = require("../dto/complaint-details");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const complaintController = {
  async create(req, res, next) {
    // 1. validate req body
    // 2. handle photo storage, naming
    // 3. add db
    // 4. return response
    // client side-> base64 encoded string -> decode -> store -> save photo path in db
    const createComplaintSchema = Joi.object({
      category: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      user: Joi.string().regex(mongodbIdPattern).required(),
      photo: Joi.string(),
      status: Joi.string(),
    });

    const { error } = createComplaintSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { category, title, description, user, status, photo } = req.body;

    // read as buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    // allot a random name to photo
    const imagePath = `${Date.now()}-${user}.png`;

    try {
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }

    // save complaint in db
    let newComplaint;
    try {
      newComplaint = new Complaint({
        category,
        title,
        description,
        user,
        status,
        photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });
      await newComplaint.save();
    } catch (error) {
      return next(error);
    }
    const complaintDto = new ComplaintDTO(newComplaint);
    return res.status(201).json({ complaint: complaintDto });
  },

  async getAll(req, res, next) {
    try {
      const complaints = await Complaint.find({});

      const complaintDto = [];
      for (let i = 0; i < complaints.length; ++i) {
        const dto = new ComplaintDTO(complaints[i]);
        complaintDto.push(dto);
      }
      return res.status(200).json({ complaints: complaintDto });
    } catch (error) {
      return next(error);
    }
  },
  async getById(req, res, next) {
    // validate Id
    // response

    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    let complaint;
    const { id } = req.params;
    try {
      complaint = await Complaint.findById({ _id: id }).populate("user");
    } catch (error) {
      return next(error);
    }
    const complaintDto = new DetailsComplaintDTO(complaint);
    res.status(200).json({ complaint: complaintDto });
  },
  async update(req, res, next) {
    const updateComplaintSchema = Joi.object({
      category: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
      complaintId: Joi.string().regex(mongodbIdPattern).required(),
      user: Joi.string().regex(mongodbIdPattern).required(),
      photo: Joi.string(),
      status: Joi.string(),
    });
    // validation of the request body and params
    const { error } = updateComplaintSchema.validate(req.body);
    const { title, description, complaintId, status, category, user, photo } =
      req.body;

    let complaint;
    try {
      complaint = await Complaint.findOne({ _id: complaintId });
    } catch (error) {
      return next(error);
    }

    try {
      await Complaint.updateOne({ _id: complaintId }, { status });
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ message: req.body });
  },
  async delete(req, res, next) {
    const deleteComplaintSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    //validation of the request body and params
    const { error } = deleteComplaintSchema.validate(req.params);

    const { id } = req.params;

    // Delete Complaint
    // Delete Reply
    try {
      await Complaint.deleteOne({ _id: id });
      await Reply.deleteMany({ Comment: id });
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ message: "Complaint Deleted" });
  },
};

module.exports = complaintController;
