import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      customer_name: Joi.string(),
      customer_email: Joi.string(),
      customer_cpf: Joi.string(),
      customer_phone: Joi.string(),
      first_channel: Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
      current_channel: Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
      sender_id: Joi.string(),
      knowledge_base: Joi.string(),
      externalId: Joi.string(),
      status: Joi.boolean().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.post(
  '/update',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      customer_name: Joi.string(),
      customer_email: Joi.string(),
      customer_cpf: Joi.string(),
      customer_phone: Joi.string(),
      first_channel: Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
      current_channel: Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
      sender_id: Joi.string(),
      knowledge_base: Joi.string(),
      externalId: Joi.string(),
      status: Joi.boolean().required(),
    },
  }),
  sessionsController.update,
);


sessionsRouter.get(
  '/list',
  sessionsController.listAll,
);

export default sessionsRouter;
