import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import ISessionsRepository from '@modules/sessions/repositories/ISessionsRepository';
import { ObjectID } from 'typeorm';

type IResponse = Array<{
  customer_name: string;
  customer_email: string;
  customer_cpf: string;
  customer_phone: string;
  first_channel: string;
  current_channel: string;
  sender_id: string;
  knowledge_base: string;
  externalId: string;
  status: boolean;
  }>;

@injectable()
class ListSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const session = await this.sessionsRepository.listAll();
    return session;
  }
}

export default ListSessionService;
