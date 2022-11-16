import { injectable, inject } from 'tsyringe';

import IGroupRepository from '@modules/group/repositories/IGroupRepository';
import { ObjectID } from 'typeorm';

type IResponse = {
  link: string | RegExp;
  name: string;
  type: string;
  status: boolean;
};

@injectable()
class GetGroupService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async get(): Promise<IResponse | undefined> {
    const group = await this.groupRepository.getFirst();

    return group;
  }
}

export default GetGroupService;
