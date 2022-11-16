"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Group = _interopRequireDefault(require("../schemas/Group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GroupRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Group.default, process.env.CONFIG_MONGO);
  }

  async getFirst() {
    const group = await this.ormRepository.findOne({
      where: {
        $or: [{
          $and: [{
            "status": true
          }, {
            "type": "1"
          }, {
            "user_active": {
              $lt: 256
            }
          }]
        }, {
          $and: [{
            "status": true
          }, {
            "type": "1"
          }, {
            "user_active": null
          }]
        }]
      }
    });
    return group;
  }

  async listAll() {
    const group = await this.ormRepository.find({
      status: true
    });
    return group;
  }

}

var _default = GroupRepository;
exports.default = _default;