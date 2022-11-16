import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IGroupRepository from '@modules/group/repositories/IGroupRepository';
import { ObjectID } from 'typeorm';

type IResponse = Array<{
  link: string | RegExp;
  name: string;
  type: string;
  status: boolean;
  }>;

@injectable()
class ListGroupService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const group = await this.groupRepository.listAll();
    return group;
  }
}

export default ListGroupService;
