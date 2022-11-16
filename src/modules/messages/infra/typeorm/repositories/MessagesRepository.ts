import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateMessageDTO from '@modules/messages/dtos/ICreateMessageDTO';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

import Message from '@modules/messages/infra/typeorm/schemas/Message';
import IUpdateMessageDTO from '@modules/messages/dtos/IUpdateMessageDTO';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: MongoRepository<Message>;

  constructor() {
    this.ormRepository = getMongoRepository(Message, process.env.CONFIG_MONGO);
  }

  public async create({
    session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
  }: ICreateMessageDTO): Promise<Message> {
    const message = this.ormRepository.create({
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });

    await this.ormRepository.save(message);

    return message;
  }

  public async update({
    id,
    session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
  }: IUpdateMessageDTO): Promise<Message> {
    const message = this.ormRepository.create({
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });

    await this.ormRepository.update(id, message);

    return message;
  }

  public async listAll(): Promise<Message[]> {
    const message = await this.ormRepository.find();
    return message;
  }
}

export default MessagesRepository;