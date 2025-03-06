const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models/nosql/users");
const { handleHttpError } = require("../utils/handleError");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const user = await usersModel.create({ ...req, password });
    user.set("password", undefined, { strict: false });
    res.send({ token: await tokenSign(user), user });
  } catch (err) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({ email: req.email }).select("password name role email");
    if (!user) return handleHttpError(res, "USER_NOT_EXISTS", 404);
    
    const check = await compare(req.password, user.password);
    if (!check) return handleHttpError(res, "INVALID_PASSWORD", 401);
    
    user.set("password", undefined, { strict: false });
    res.send({ token: await tokenSign(user), user });
  } catch (err) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };