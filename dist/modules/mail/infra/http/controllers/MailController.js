"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _EmailService = _interopRequireDefault(require("../../../services/EmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotPasswordController {
  async create(request, response) {
    const {
      email,
      name,
      subject,
      variables,
      template
    } = request.body;

    const sendEmail = _tsyringe.container.resolve(_EmailService.default);

    await sendEmail.execute({
      email,
      name,
      subject,
      variables,
      template
    });
    return response.status(204).json();
  }

}

exports.default = ForgotPasswordController;