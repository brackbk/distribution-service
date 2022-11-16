"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UserTbService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class UserTbService {
  async create(data) {
    try {
      const response = await _axios.default.post(process.env.TABLETALKS_SERVICE + "users", data);
      return response;
    } catch (error) {
      console.log(error);
      throw new _AppError.default('Error to request from bot-service');
    }
  }

}) || _class);
var _default = UserTbService;
exports.default = _default;