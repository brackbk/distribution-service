import { getMongoRepository, MongoRepository } from 'typeorm';

import IGroupRepository from '@modules/group/repositories/IGroupRepository';
import Group from '../schemas/Group';

class GroupRepository implements IGroupRepository {
  private ormRepository: MongoRepository<Group>;

  constructor() {
    this.ormRepository = getMongoRepository(Group, process.env.CONFIG_MONGO);
  }

  public async getFirst(): Promise<Group | undefined> {
    const group = await this.ormRepository
      .findOne({ where: {
        $or: [
          {
            $and: [{ "status": true }, { "type": "1" }, { "user_active": { $lt: 256 } }]
          },
          {
            $and: [{ "status": true }, { "type": "1" }, { "user_active": null }]
          }
        ]
        }
    });
    
    return group;
  }

  public async listAll(): Promise<Group[]> {
    const group = await this.ormRepository.find({ status: true });
    return group;
  }
}

export default GroupRepository;
