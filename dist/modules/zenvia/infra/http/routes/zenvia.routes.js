"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ZenviaController = _interopRequireDefault(require("../controllers/ZenviaController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const zenviaRouter = (0, _express.Router)();
const zenviaController = new _ZenviaController.default();
zenviaRouter.post('/sendByText', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    msg: _celebrate.Joi.string().required(),
    to: _celebrate.Joi.string().required(),
    channel: _celebrate.Joi.string().required()
  }
}), zenviaController.sendByText);
zenviaRouter.post('/sendByTemplate', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    templateId: _celebrate.Joi.string().required(),
    fields: _celebrate.Joi.object().required(),
    to: _celebrate.Joi.string().required(),
    channel: _celebrate.Joi.string().required()
  }
}), zenviaController.sendByTemplate);
zenviaRouter.post('/webHookMsg', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    timestamp: _celebrate.Joi.string().required(),
    type: _celebrate.Joi.string().required(),
    subscriptionId: _celebrate.Joi.string().required(),
    channel: _celebrate.Joi.string().required(),
    direction: _celebrate.Joi.string().valid('IN').required(),
    message: _celebrate.Joi.object().required()
  }
}), zenviaController.webHookMsg);
zenviaRouter.get('/stats', zenviaController.stats);
var _default = zenviaRouter;
exports.default = _default;