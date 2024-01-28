const {
  updateUser,
  createUser,
  loginUser,
  selfDelete,
} = require("../services/user.service");
const { mapError } = require("../utils/apiError");
const { generateJWT, hashPassword } = require("../utils/security");

exports.updateUser = async (req, res, next) => {
  try {
    let profile_picture = req.files?.profile_picture
      ? req.files?.profile_picture[0]
        ? req.files?.profile_picture[0].path
        : undefined
      : undefined;

    let profile_cover = req.files?.profile_cover
      ? req.files?.profile_cover[0]
        ? req.files?.profile_cover[0].path
        : undefined
      : undefined;

    let result = await updateUser(
      {
        profile_picture: profile_picture || null,
        profile_cover: profile_cover || null,
        description: req.body.description,
      },
      req.userId
    );

    if (result.rowCount > 0) {
      res.status(201).json({
        status: 201,
        message: `update picture success`,
        data: result.rows[0],
      });
    } else {
      //res.status(400).json({ status: 400, message: `update picture failure` });
      mapError(400, "update picture failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "error at update user picture", next);
  }
};

exports.createUser = async (req, res, next) => {
  let uid;
  try {
    let result = await createUser(req.body);
    if (result.rowCount > 0) {
      let hashPass = await hashPassword(req.body.Password);
      uid = result.rows[0].userId;
      const token = generateJWT({
        userId: result.rows[0].userId,
        EmailAddressOrPhoneNumber: req.body.EmailAddressOrPhoneNumber,
        hashPass,
      });
      if (token) {
        res
          .status(201)
          .json({ status: 201, data: token, message: "create user success" });
      } else {
        //res.status(400).json({ status: 400, date: "create user error" });
        selfDelete(result.rows[0].userid);
        mapError(400, "create user failure", next);
      }
    }
  } catch (err) {
    console.log(err);
    selfDelete(uid);
    if (err.constraint) {
      mapError(400, err.detail, next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    let { EmailAddressOrPhoneNumber, Password } = req.body;
    const token = await loginUser(EmailAddressOrPhoneNumber, Password);
    if (token) {
      res
        .status(200)
        .json({ status: 200, data: token, message: "login success" });
    } else {
      mapError(400, "login failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
