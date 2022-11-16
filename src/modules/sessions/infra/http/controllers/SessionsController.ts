import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/sessions/services/CreateSessionService';
import UpdateSessionService from '@modules/sessions/services/UpdateSessionService';
import ListSessionService from '@modules/sessions/services/ListSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_name,
      customer_email,
      customer_cpf,
      customer_phone,
      first_channel,
      current_channel,
      sender_id,
      knowledge_base,
      externalId,
      status } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const session = await createSession.execute({
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

    return response.json(session);
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const { id, customer_name,
      customer_email,
      customer_cpf,
      customer_phone,
      first_channel,
      current_channel,
      sender_id,
      knowledge_base,
      externalId,
      status } = request.body;

    const updateSession = container.resolve(UpdateSessionService);

    const session = await updateSession.execute({ id, customer_name,
      customer_email,
      customer_cpf,
      customer_phone,
      first_channel,
      current_channel,
      sender_id,
      knowledge_base,
      externalId,
      status });

    return response.json(session);
  }

  public async listAll(request: Request, response: Response): Promise<Response> {

    const session = container.resolve(ListSessionService);

    const responseSession = await session.execute();

    return response.json(responseSession);
  }
}
