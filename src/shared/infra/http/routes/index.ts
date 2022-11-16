import { Router } from 'express';

import zenviaRouter from '@modules/zenvia/infra/http/routes/zenvia.routes';
import healthRouter from './health.routes';
import mailRouter from '@modules/mail/infra/http/routes/mail.routes';

const routes = Router();
routes.use('/mail', mailRouter);
routes.use('/zenvia', zenviaRouter);
routes.use(healthRouter);

export default routes;
