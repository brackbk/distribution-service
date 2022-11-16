"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateSessionService = _interopRequireDefault(require("../../../services/CreateSessionService"));

var _UpdateSessionService = _interopRequireDefault(require("../../../services/UpdateSessionService"));

var _ListSessionService = _interopRequireDefault(require("../../../services/ListSessionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
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
    } = request.body;

    const createSession = _tsyringe.container.resolve(_CreateSessionService.default);

    const session = await createSession.execute({
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
    return response.json(session);
  }

  async update(request, response) {
    const {
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
    } = request.body;

    const updateSession = _tsyringe.container.resolve(_UpdateSessionService.default);

    const session = await updateSession.execute({
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
    });
    return response.json(session);
  }

  async listAll(request, response) {
    const session = _tsyringe.container.resolve(_ListSessionService.default);

    const responseSession = await session.execute();
    return response.json(responseSession);
  }

}

exports.default = SessionsController;