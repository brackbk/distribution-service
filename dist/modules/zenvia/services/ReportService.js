"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var zenvia = _interopRequireWildcard(require("@zenvia/sdk"));

var _dateFns = require("date-fns");

var _zenvia = _interopRequireDefault(require("../../../config/zenvia"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let ReportService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ReportService {
  async getByPeriod(startDate, endDate) {
    const zenviaService = new zenvia.Client(_zenvia.default.ApiToken);
    const reports = zenviaService.getMessagesReportClient();
    return reports.getEntries({
      startDate,
      endDate
    });
  }

  async getAll() {
    let reportsData = [];
    await Promise.all(await Array(10).fill(1).map(async (item, monthStart) => {
      const aditionalGetMonthStart = monthStart === 0 ? 1 : 2;
      const aditionalGetMonthEnd = monthStart === 0 ? 2 : 3;
      const monthStartReal = monthStart + aditionalGetMonthStart;
      const initialDate = `${new Date().getFullYear()}-${monthStartReal < 10 ? `0${monthStartReal}` : monthStartReal}-01`;
      const lastDateWithTwoMonths = (0, _dateFns.format)((0, _dateFns.lastDayOfMonth)(new Date(`${new Date().getFullYear()}-${monthStart + aditionalGetMonthEnd}-01 00:00`)), 'yyyy-MM-dd');

      try {
        const reportDataByPeriod = await this.getByPeriod(initialDate, lastDateWithTwoMonths);
        reportsData = [...reportDataByPeriod];
      } catch (err) {
        console.log(err);
      }
    }));
    const dataMessages = reportsData.filter(report => report.channel === 'whatsapp').reduce((previous, current) => {
      return { ...current,
        directionOutTotal: previous.directionOutTotal + (current.directionOutTotal || 0),
        directionInTotal: previous.directionInTotal + (current.directionInTotal || 0),
        total: previous.directionInTotal + (current.total || 0)
      };
    });
    return {
      total_messages_inbox: dataMessages.total,
      requires_interaction: dataMessages.directionOutTotal,
      successful_interaction: dataMessages.directionInTotal,
      ignored: 0,
      total_messages: 0,
      first_contact: 0,
      second_contact: 0,
      third_contact: 0,
      interactions: {
        sends: Array(5).fill(0),
        interaction_successful: Array(5).fill(0),
        open_rate: Array(5).fill(0)
      }
    };
  }

}) || _class);
var _default = ReportService;
exports.default = _default;