"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var zenvia = _interopRequireWildcard(require("@zenvia/sdk"));

var _zenvia = _interopRequireDefault(require("../../../config/zenvia"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let SendWhatsService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class SendWhatsService {
  async text({
    msg,
    to,
    channel
  }) {
    const zenviaService = new zenvia.Client(_zenvia.default.ApiToken);
    const whatsapp = zenviaService.getChannel(channel);
    const content = new zenvia.TextContent(msg);
    const response = await whatsapp.sendMessage(_zenvia.default.FromNumber, to, content);
    return response;
  }

  async template({
    templateId,
    fields,
    to,
    channel
  }) {
    const zenviaService = new zenvia.Client(_zenvia.default.ApiToken);
    const whatsapp = zenviaService.getChannel(channel);
    const content = new zenvia.TemplateContent(templateId, fields);
    const response = await whatsapp.sendMessage(_zenvia.default.FromNumber, to, content);
    return response;
  }

}) || _class);
var _default = SendWhatsService;
exports.default = _default;