import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

import Message from '../infra/typeorm/schemas/Message';
import { ObjectID } from 'typeorm';

interface IRequest {
  id: ObjectID;
  session_id: string;
  from: string;
  to: string;
  type: string;
  body: string;
  channel: string;
  externalId: string;
  status: string;
}

@injectable()
class UpdateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) { }

  public async execute({
    id,
    session_id,
    from,
    to,
    type,
    body,
    channel,
    externalId,
    status }: IRequest): Promise<Message> {
    const message = await this.messagesRepository.update({
      id,
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });
    return message;
  }
}

export default UpdateMessageService;
