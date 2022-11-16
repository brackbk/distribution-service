"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IMessagesRepository = _interopRequireDefault(require("../repositories/IMessagesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateMessageService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MessagesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMessagesRepository.default === "undefined" ? Object : _IMessagesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateMessageService {
  constructor(messagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  async execute({
    id,
    session_id,
    from,
    to,
    type,
    body,
    channel,
    externalId,
    status
  }) {
    const message = await this.messagesRepository.update({
      id,
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });
    return message;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateMessageService;
exports.default = _default;