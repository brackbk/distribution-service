import { ObjectID } from 'typeorm';
import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import IUpdateMessageDTO from '../dtos/IUpdateMessageDTO';
import Message from '../infra/typeorm/schemas/Message';

export default interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
  update(data: IUpdateMessageDTO): Promise<Message>;
  listAll():Promise<Message[]>;
}
