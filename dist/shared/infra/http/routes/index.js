"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _zenvia = _interopRequireDefault(require("../../../../modules/zenvia/infra/http/routes/zenvia.routes"));

var _health = _interopRequireDefault(require("./health.routes"));

var _mail = _interopRequireDefault(require("../../../../modules/mail/infra/http/routes/mail.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/mail', _mail.default);
routes.use('/zenvia', _zenvia.default);
routes.use(_health.default);
var _default = routes;
exports.default = _default;