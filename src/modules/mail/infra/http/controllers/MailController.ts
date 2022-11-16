import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EmailService from '@modules/mail/services/EmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email,
      name,
      subject,
      variables,
      template } = request.body;

    const sendEmail = container.resolve(
        EmailService,
    );

    await sendEmail.execute({
      email,
      name,
      subject,
      variables,
      template
    });

    return response.status(204).json();
  }
}
