"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

// import AppError from '@shared/errors/AppError';
let WebHookService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class WebHookService {
  async msg(data) {
    return data;
  }

  async msgStatus(data) {
    return data;
  }

}) || _class);
var _default = WebHookService;
exports.default = _default;