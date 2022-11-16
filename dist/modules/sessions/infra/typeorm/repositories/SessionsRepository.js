"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Session = _interopRequireDefault(require("../schemas/Session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Session.default, process.env.CONFIG_MONGO);
  }

  async create({
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
    const session = this.ormRepository.create({
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
    await this.ormRepository.save(session);
    return session;
  }

  async createOrReturn({
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
    const sessionData = await this.ormRepository.findOne({
      customer_phone,
      status: true
    }, {
      order: {
        created_at: -1
      }
    });

    if (!sessionData) {
      const session = this.ormRepository.create({
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
      await this.ormRepository.save(session);
      return session;
    }

    return sessionData;
  }

  async update({
    id,
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
    const session = this.ormRepository.create({
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
    await this.ormRepository.update(id, session);
    return session;
  }

  async listAll() {
    const session = await this.ormRepository.find();
    return session;
  }

}

var _default = SessionsRepository;
exports.default = _default;