import Group from '../infra/typeorm/schemas/Group';

export default interface IGroupRepository {
  getFirst(): Promise<Group | undefined>;
  listAll():Promise<Group[]>;
}
