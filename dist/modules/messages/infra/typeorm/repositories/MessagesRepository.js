"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Message = _interopRequireDefault(require("../schemas/Message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessagesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Message.default, process.env.CONFIG_MONGO);
  }

  async create({
    session_id,
    from,
    to,
    type,
    body,
    channel,
    externalId,
    status
  }) {
    const message = this.ormRepository.create({
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });
    await this.ormRepository.save(message);
    return message;
  }

  async update({
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
    const message = this.ormRepository.create({
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });
    await this.ormRepository.update(id, message);
    return message;
  }

  async listAll() {
    const message = await this.ormRepository.find();
    return message;
  }

}

var _default = MessagesRepository;
exports.default = _default;