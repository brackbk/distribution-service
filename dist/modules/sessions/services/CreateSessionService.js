"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISessionsRepository = _interopRequireDefault(require("../repositories/ISessionsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateSessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SessionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISessionsRepository.default === "undefined" ? Object : _ISessionsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSessionService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async execute({
    customer_name,
    customer_email,
    customer_cpf,
    customer_phone,
    first_channel,
    current_channel,
    sender_id,
    knowledge_base,
    externalId,
    status
  }) {
    const message = await this.sessionsRepository.create({
      customer_name,
      customer_email,
      customer_cpf,
      customer_phone,
      first_channel,
      current_channel,
      sender_id,
      knowledge_base,
      externalId,
      status
    });
    return message;
  }

  async executeOrReturn({
    customer_name,
    customer_email,
    customer_cpf,
    customer_phone,
    first_channel,
    current_channel,
    sender_id,
    knowledge_base,
    externalId,
    status
  }) {
    const message = await this.sessionsRepository.createOrReturn({
      customer_name,
      customer_email,
      customer_cpf,
      customer_phone,
      first_channel,
      current_channel,
      sender_id,
      knowledge_base,
      externalId,
      status
    });
    return message;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateSessionService;
exports.default = _default;