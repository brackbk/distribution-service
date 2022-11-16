"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _MessagesController = _interopRequireDefault(require("../controllers/MessagesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messagesRouter = (0, _express.Router)();
const messagesController = new _MessagesController.default();
messagesRouter.post('/create', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    session_id: _celebrate.Joi.string(),
    from: _celebrate.Joi.string(),
    to: _celebrate.Joi.string(),
    type: _celebrate.Joi.string().valid('text', 'file', 'template', 'contacts', 'location').required(),
    channel: _celebrate.Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
    body: _celebrate.Joi.string(),
    externalId: _celebrate.Joi.string(),
    status: _celebrate.Joi.boolean().required()
  }
}), messagesController.create);
messagesRouter.post('/update', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    session_id: _celebrate.Joi.string(),
    from: _celebrate.Joi.string(),
    to: _celebrate.Joi.string(),
    type: _celebrate.Joi.string().valid('text', 'file', 'template', 'contacts', 'location').required(),
    channel: _celebrate.Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
    body: _celebrate.Joi.string(),
    externalId: _celebrate.Joi.string(),
    status: _celebrate.Joi.string().valid('sending', 'success', 'error').required()
  }
}), messagesController.update);
messagesRouter.get('/list', messagesController.listAll);
var _default = messagesRouter;
exports.default = _default;