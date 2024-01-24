const {
  updateUser,
  createUser,
  loginUser,
} = require("../services/user.service");
const { mapError } = require("../utils/apiError");

exports.updateUser = async (req, res, next) => {
  try {
    console.log(req.files);
    let result = await updateUser(
      {
        profile_picture: req.files.profile_picture || null,
        profile_cover: req.files.profile_cover || null,
        description: req.body.description,
      },
      req.userId
    );
    if (result.rowCount > 0) {
      res.status(201).json({ status: 201, message: `update picture success` });
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
  try {
    let token = await createUser(req.body);
    if (token) {
      res
        .status(201)
        .json({ status: 200, data: token, message: "create user success" });
    } else {
      //res.status(400).json({ status: 400, date: "create user error" });
      mapError(400, "create user failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "error at create user", next);
  }
};

exports.loginUser = async () => {
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
