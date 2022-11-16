import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import ISessionsRepository from '@modules/sessions/repositories/ISessionsRepository';

import Session from '../infra/typeorm/schemas/Session';
import { ObjectID } from 'typeorm';

interface IRequest {
    id: ObjectID;
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
}

@injectable()
class UpdateSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  public async execute({ 
    id,   
    customer_name,
    customer_email,
    customer_cpf,
    customer_phone,
    first_channel,
    current_channel,
    sender_id,
    knowledge_base,
    externalId,
    status }: IRequest): Promise<Session> {
    const session = await this.sessionsRepository.update({
      id,
      customer_name,
      customer_email,
      customer_cpf,
      customer_phone,
      first_channel,
      current_channel,
      sender_id,
      knowledge_base,
      externalId,
      status
    });
    return session;
  }
}

export default UpdateSessionService;
