import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateSessionDTO from '@modules/sessions/dtos/ICreateSessionDTO';
import ISessionsRepository from '@modules/sessions/repositories/ISessionsRepository';

import Session from '@modules/sessions/infra/typeorm/schemas/Session';
import IUpdateSessionDTO from '@modules/sessions/dtos/IUpdateSessionDTO';

class SessionsRepository implements ISessionsRepository {
  private ormRepository: MongoRepository<Session>;

  constructor() {
    this.ormRepository = getMongoRepository(Session, process.env.CONFIG_MONGO);
  }

  public async create({
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
  }: ICreateSessionDTO): Promise<Session> {
    const session = this.ormRepository.create({
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

    await this.ormRepository.save(session);

    return session;
  }

  public async createOrReturn({
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
  }: ICreateSessionDTO): Promise<Session> {


    const sessionData = await this.ormRepository.findOne({ customer_phone, status: true }, {
      order: {
        created_at: -1
      }
    })
    if (!sessionData){
      const session = this.ormRepository.create({
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


        await this.ormRepository.save(session);
        return session;
    }
    return sessionData;
    
  }

  public async update({
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
  }: IUpdateSessionDTO): Promise<Session> {
    const session = this.ormRepository.create({
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

    await this.ormRepository.update(id, session);

    return session;
  }

  public async listAll(): Promise<Session[]> {
    const session = await this.ormRepository.find();
    return session;
  }
}

export default SessionsRepository;
