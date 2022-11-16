"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _SessionsController = _interopRequireDefault(require("../controllers/SessionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
const sessionsController = new _SessionsController.default();
sessionsRouter.post('/create', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    customer_name: _celebrate.Joi.string(),
    customer_email: _celebrate.Joi.string(),
    customer_cpf: _celebrate.Joi.string(),
    customer_phone: _celebrate.Joi.string(),
    first_channel: _celebrate.Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
    current_channel: _celebrate.Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
    sender_id: _celebrate.Joi.string(),
    knowledge_base: _celebrate.Joi.string(),
    externalId: _celebrate.Joi.string(),
    status: _celebrate.Joi.boolean().required()
  }
}), sessionsController.create);
sessionsRouter.post('/update', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    customer_name: _celebrate.Joi.string(),
    customer_email: _celebrate.Joi.string(),
    customer_cpf: _celebrate.Joi.string(),
    customer_phone: _celebrate.Joi.string(),
    first_channel: _celebrate.Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
    current_channel: _celebrate.Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
    sender_id: _celebrate.Joi.string(),
    knowledge_base: _celebrate.Joi.string(),
    externalId: _celebrate.Joi.string(),
    status: _celebrate.Joi.boolean().required()
  }
}), sessionsController.update);
sessionsRouter.get('/list', sessionsController.listAll);
var _default = sessionsRouter;
exports.default = _default;