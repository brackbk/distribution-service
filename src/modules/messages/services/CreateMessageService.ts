import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

import Message from '../infra/typeorm/schemas/Message';
import { ObjectID } from 'typeorm';

interface IRequest {
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
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) { }

  public async execute({ 
    session_id,
    from,
    to,
    type,
    body,
    channel,
    externalId,
    status }: IRequest): Promise<Message> {
    const message = await this.messagesRepository.create({
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

export default CreateMessageService;
