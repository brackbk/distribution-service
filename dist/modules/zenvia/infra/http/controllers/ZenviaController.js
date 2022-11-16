"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendService = _interopRequireDefault(require("../../../services/SendService"));

var _ReportService = _interopRequireDefault(require("../../../services/ReportService"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _CreateSessionService = _interopRequireDefault(require("../../../../sessions/services/CreateSessionService"));

var _BotService = _interopRequireDefault(require("../../../../../shared/services/BotService"));

var _UserTbService = _interopRequireDefault(require("../../../../../shared/services/UserTbService"));

var _EmailService = _interopRequireDefault(require("../../../../mail/services/EmailService"));

var _cryptr = _interopRequireDefault(require("cryptr"));

var _GetGroupService = _interopRequireDefault(require("../../../../group/services/GetGroupService"));

var _UpdateSessionService = _interopRequireDefault(require("../../../../sessions/services/UpdateSessionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ZenviaController {
  async sendByText(request, response) {
    const {
      msg,
      to,
      channel
    } = request.body;

    const sendWhatsZenvia = _tsyringe.container.resolve(_SendService.default);

    try {
      const responseZenvia = sendWhatsZenvia.text({
        msg,
        to,
        channel
      });
      return response.json(responseZenvia);
    } catch (err) {
      throw new _AppError.default("Problem to return response from zenvia");
    }
  }

  async sendByTemplate(request, response) {
    const {
      templateId,
      to,
      fields,
      channel
    } = request.body;

    const sendWhatsZenvia = _tsyringe.container.resolve(_SendService.default);

    try {
      const responseZenvia = sendWhatsZenvia.template({
        templateId,
        to,
        fields,
        channel
      });
      return response.json(responseZenvia);
    } catch (err) {
      throw new _AppError.default("Problem to return response from zenvia");
    }
  }

  async webHookMsg(request, response) {
    const {
      id,
      timestamp,
      type,
      subscriptionId,
      channel,
      direction,
      message
    } = request.body;

    const createSessionService = _tsyringe.container.resolve(_CreateSessionService.default);

    const updateSessionService = _tsyringe.container.resolve(_UpdateSessionService.default);

    const emailService = _tsyringe.container.resolve(_EmailService.default);

    const userTbService = _tsyringe.container.resolve(_UserTbService.default);

    const app_secret = process.env.APP_SECRET;
    const cryptr = new _cryptr.default(app_secret);
    let messages = [];
    const session = await createSessionService.executeOrReturn({
      customer_name: message.visitor.name,
      customer_email: "",
      customer_cpf: "",
      customer_phone: message.from,
      first_channel: "zenvia_whatsapp",
      current_channel: "zenvia_whatsapp",
      sender_id: message.to,
      knowledge_base: "",
      externalId: "",
      status: true
    });

    const botService = _tsyringe.container.resolve(_BotService.default);

    const groupService = _tsyringe.container.resolve(_GetGroupService.default);

    const groupSendLink = await groupService.get();
    let linkReplace = ((groupSendLink === null || groupSendLink === void 0 ? void 0 : groupSendLink.link) || '').replace('https://chat.whatsapp.com/', `${process.env.BACKEND_SERVICE || ''}whatsapp/enter/`);
    const responseBotService = await botService.msg({
      msg: message.contents[0].text,
      session: session.id.toString()
    });

    const sendWhatsZenvia = _tsyringe.container.resolve(_SendService.default);

    let isEnd = false; // responseBotService?.data.contexts.map(async (data: any) => {
    //   if (data?.parameters?.fields["email.original"]
    //     && data?.parameters?.fields["number.original"]
    //     && data?.parameters?.fields["nome.original"]) {
    //     const passwordGenerator = generate({
    //       length: 10,
    //       numbers: true
    //     });
    //     const email = data?.parameters?.fields["email.original"]["stringValue"];
    //     const length = 11;
    //     await userTbService.create({
    //       email,
    //       name: data?.parameters?.fields["nome.original"]["stringValue"],
    //       password: passwordGenerator,
    //       lastName: data?.parameters?.fields["nome.original"]["stringValue"],
    //       document: " ",
    //       phoneNumber: data?.parameters?.fields["number.original"]["stringValue"],
    //       birthdayDate: '01-01-1979',
    //       type: 'student'
    //     });
    //     emailService.execute({
    //       email,
    //       name: data?.parameters?.fields["nome.original"]["stringValue"],
    //       subject: 'Bem vindo ao TableTalks!',
    //       variables: {
    //         name:data?.parameters?.fields["nome.original"]["stringValue"],
    //         body: 'Obrigado por entrar em nosso grupo, o seus dados de acesso a plataforma são: \n email: ' + email + '\n password: ' + passwordGenerator,
    //       },
    //       template: ''
    //     });
    //   }
    // });

    responseBotService === null || responseBotService === void 0 ? void 0 : responseBotService.data.messages.map(msg => {
      msg.text.text.reverse().map(async text => {
        if (text.includes('{link_group}')) {
          var _responseBotService$d, _responseBotService$d2;

          isEnd = true;
          linkReplace = linkReplace.replace('\t', '') + '/' + cryptr.encrypt(responseBotService === null || responseBotService === void 0 ? void 0 : (_responseBotService$d = responseBotService.data.contexts) === null || _responseBotService$d === void 0 ? void 0 : (_responseBotService$d2 = _responseBotService$d.email) === null || _responseBotService$d2 === void 0 ? void 0 : _responseBotService$d2.stringValue);
        }

        await sendWhatsZenvia.text({
          msg: text.replace('{link_group}', linkReplace),
          to: session.customer_phone,
          channel
        });
      });
    });

    if (isEnd) {
      updateSessionService.execute({ ...session,
        status: false
      });
    }

    return response.json({
      "success": true
    });
  }

  async webHookMsgStatus(request, response) {
    const {
      templateId,
      to,
      fields,
      channel
    } = request.body;
    return response.json();
  }

  async stats(request, response) {
    const zenviaReports = _tsyringe.container.resolve(_ReportService.default);

    return response.json(await zenviaReports.getAll());
  }

}

exports.default = ZenviaController;