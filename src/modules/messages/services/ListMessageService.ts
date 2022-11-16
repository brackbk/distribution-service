import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import { ObjectID } from 'typeorm';

type IResponse = Array<{
  session_id: string;
  from: string;
  to: string;
  type: string;
  body: string;
  channel: string;
  externalId: string;
  status: string;
  }>;

@injectable()
class ListMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const message = await this.messagesRepository.listAll();
    return message;
  }
}

export default ListMessageService;
