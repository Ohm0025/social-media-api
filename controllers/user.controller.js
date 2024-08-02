const {
  updateUser,
  createUser,
  loginUser,
  selfDelete,
  getOtherUserProfile,
} = require("../services/user.service");
const { mapError } = require("../utils/apiError");
const { generateJWT, hashPassword } = require("../utils/security");

exports.updateUser = async (req, res, next) => {
  try {
    let result = await updateUser(
      {
        profile_picture: req.body.profile_picture || null,
        profile_cover: req.body.profile_cover || null,
        description: req.body.description || null,
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
      mapError(400, "username or password is incorrect", next);
    }
  } catch (err) {
    console.log(err);
    if (err.message.includes("connect ECONNREFUSED")) {
      mapError(500, "server down please try again later", next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};

exports.getOtherUserProfile = async (req, res, next) => {
  try {
    let { otherUserId } = req.body;
    let result = await getOtherUserProfile(otherUserId, req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        message: `get other user profile success`,
        data: result.rows[0],
      });
    } else {
      mapError(400, "get other user profile failure", next);
    }
  } catch (err) {
    console.log(err);
    if (err.message.includes("connect ECONNREFUSED")) {
      mapError(500, "server down please try again later", next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};
