"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateMessageService = _interopRequireDefault(require("../../../services/CreateMessageService"));

var _UpdateMessageService = _interopRequireDefault(require("../../../services/UpdateMessageService"));

var _ListMessageService = _interopRequireDefault(require("../../../services/ListMessageService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessagesController {
  async create(request, response) {
    const {
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    } = request.body;

    const createMessage = _tsyringe.container.resolve(_CreateMessageService.default);

    const message = await createMessage.execute({
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });
    return response.json(message);
  }

  async update(request, response) {
    const {
      id,
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    } = request.body;

    const updateMessage = _tsyringe.container.resolve(_UpdateMessageService.default);

    const message = await updateMessage.execute({
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
    return response.json(message);
  }

  async listAll(request, response) {
    const message = _tsyringe.container.resolve(_ListMessageService.default);

    const responseMessage = await message.execute();
    return response.json(responseMessage);
  }

}

exports.default = MessagesController;