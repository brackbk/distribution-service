import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import MailController from '../controllers/MailController';

const mailRouter = Router();
const mailController = new MailController();

mailRouter.post(
  '/sendMail',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string(),
      name: Joi.string(),
      subject: Joi.string(),
      variables: Joi.object(),
      template: Joi.string(),
    },
  }),
  mailController.create,
);


export default mailRouter;
