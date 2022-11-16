"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _MailController = _interopRequireDefault(require("../controllers/MailController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mailRouter = (0, _express.Router)();
const mailController = new _MailController.default();
mailRouter.post('/sendMail', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string(),
    name: _celebrate.Joi.string(),
    subject: _celebrate.Joi.string(),
    variables: _celebrate.Joi.object(),
    template: _celebrate.Joi.string()
  }
}), mailController.create);
var _default = mailRouter;
exports.default = _default;