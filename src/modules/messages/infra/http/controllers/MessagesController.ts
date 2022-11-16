import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMessageService from '@modules/messages/services/CreateMessageService';
import UpdateMessageService from '@modules/messages/services/UpdateMessageService';
import ListMessageService from '@modules/messages/services/ListMessageService';

export default class MessagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {   session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status } = request.body;

    const createMessage = container.resolve(CreateMessageService);

    const message = await createMessage.execute({
      session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status
    });

    return response.json(message);
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const { id,session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status } = request.body;

    const updateMessage = container.resolve(UpdateMessageService);

    const message = await updateMessage.execute({ id, session_id,
      from,
      to,
      type,
      body,
      channel,
      externalId,
      status });

    return response.json(message);
  }

  public async listAll(request: Request, response: Response): Promise<Response> {

    const message = container.resolve(ListMessageService);

    const responseMessage = await message.execute();

    return response.json(responseMessage);
  }
}
