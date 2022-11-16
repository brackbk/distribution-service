import { ObjectID } from 'typeorm';
import ICreateSessionDTO from '../dtos/ICreateSessionDTO';
import IUpdateSessionDTO from '../dtos/IUpdateSessionDTO';
import Session from '../infra/typeorm/schemas/Session';

export default interface ISessionsRepository {
  create(data: ICreateSessionDTO): Promise<Session>;
  createOrReturn(data: ICreateSessionDTO): Promise<Session>;
  update(data: IUpdateSessionDTO): Promise<Session>;
  listAll():Promise<Session[]>;
}
