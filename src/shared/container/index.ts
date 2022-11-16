import { container } from 'tsyringe';

import './providers';

import ISessionsRepository from '@modules/sessions/repositories/ISessionsRepository';
import SessionsRepository from '@modules/sessions/infra/typeorm/repositories/SessionsRepository';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';
import IGroupRepository from '@modules/group/repositories/IGroupRepository';
import GroupRepository from '@modules/group/infra/typeorm/repositories/GroupRepository';

container.registerSingleton<ISessionsRepository>(
  'SessionsRepository',
  SessionsRepository,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);

container.registerSingleton<IGroupRepository>(
  'GroupRepository',
  GroupRepository,
);