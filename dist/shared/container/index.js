"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _SessionsRepository = _interopRequireDefault(require("../../modules/sessions/infra/typeorm/repositories/SessionsRepository"));

var _MessagesRepository = _interopRequireDefault(require("../../modules/messages/infra/typeorm/repositories/MessagesRepository"));

var _GroupRepository = _interopRequireDefault(require("../../modules/group/infra/typeorm/repositories/GroupRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('SessionsRepository', _SessionsRepository.default);

_tsyringe.container.registerSingleton('MessagesRepository', _MessagesRepository.default);

_tsyringe.container.registerSingleton('GroupRepository', _GroupRepository.default);