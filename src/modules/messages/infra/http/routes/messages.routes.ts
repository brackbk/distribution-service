import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      session_id: Joi.string(),
      from: Joi.string(),
      to: Joi.string(),
      type: Joi.string().valid('text', 'file', 'template', 'contacts', 'location').required(),
      channel: Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
      body: Joi.string(),
      externalId: Joi.string(),
      status: Joi.boolean().required(),
    },
  }),
  messagesController.create,
);

messagesRouter.post(
  '/update',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      session_id: Joi.string(),
      from: Joi.string(),
      to: Joi.string(),
      type: Joi.string().valid('text', 'file', 'template', 'contacts', 'location').required(),
      channel: Joi.string().valid('zenvia_whatsapp', 'zenvia_chat', 'default').required(),
      body: Joi.string(),
      externalId: Joi.string(),
      status: Joi.string().valid('sending', 'success', 'error').required(),
    },
  }),
  messagesController.update,
);


messagesRouter.get(
  '/list',
  messagesController.listAll,
);

export default messagesRouter;
