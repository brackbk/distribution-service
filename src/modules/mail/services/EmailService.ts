import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
  name:string;
  subject: string;
  variables: {};
  template: string;
}

@injectable()
class EmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

  ) {}

  public async execute({ email, name, subject, variables, template }: IRequest): Promise<void> {
  
    const defaultTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      // 'default_template.hbs',
      template || 'default_template.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name,
        email
      },
      subject,
      templateData: {
        file: defaultTemplate,
        variables,
      },
    });
  }
}

export default EmailService;
