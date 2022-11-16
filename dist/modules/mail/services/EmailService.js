"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _path = _interopRequireDefault(require("path"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider;
  }

  async execute({
    email,
    name,
    subject,
    variables,
    template
  }) {
    const defaultTemplate = _path.default.resolve(__dirname, '..', 'views', // 'default_template.hbs',
    template || 'default_template.hbs');

    await this.mailProvider.sendMail({
      to: {
        name,
        email
      },
      subject,
      templateData: {
        file: defaultTemplate,
        variables
      }
    });
  }

}) || _class) || _class) || _class) || _class);
var _default = EmailService;
exports.default = _default;