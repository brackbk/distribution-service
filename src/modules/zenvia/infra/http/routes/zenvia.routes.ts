import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ZenviaController from '../controllers/ZenviaController';

const zenviaRouter = Router();
const zenviaController = new ZenviaController();

zenviaRouter.post(
  '/sendByText',
  celebrate({
    [Segments.BODY]: {
      msg: Joi.string().required(),
      to: Joi.string().required(),
      channel: Joi.string().required(),
    },
  }),
  zenviaController.sendByText,
);


zenviaRouter.post(
  '/sendByTemplate',
  celebrate({
    [Segments.BODY]: {
      templateId: Joi.string().required(),
      fields: Joi.object().required(),
      to: Joi.string().required(),
      channel: Joi.string().required(),
    },
  }),
  zenviaController.sendByTemplate,
);

zenviaRouter.post(
  '/webHookMsg',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      timestamp: Joi.string().required(),
      type: Joi.string().required(),
      subscriptionId: Joi.string().required(),
      channel: Joi.string().required(),
      direction: Joi.string().valid('IN').required(),
      message: Joi.object().required(),
    },
  }),
  zenviaController.webHookMsg,
);

zenviaRouter.get(
  '/stats',
  zenviaController.stats,
);

export default zenviaRouter;
