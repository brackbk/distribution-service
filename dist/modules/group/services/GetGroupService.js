"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IGroupRepository = _interopRequireDefault(require("../repositories/IGroupRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GetGroupService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GroupRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IGroupRepository.default === "undefined" ? Object : _IGroupRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetGroupService {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async get() {
    const group = await this.groupRepository.getFirst();
    return group;
  }

}) || _class) || _class) || _class) || _class);
var _default = GetGroupService;
exports.default = _default;