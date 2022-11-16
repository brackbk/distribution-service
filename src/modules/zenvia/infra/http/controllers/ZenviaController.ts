import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { generate } from 'generate-password';
import SendWhatsService from '@modules/zenvia/services/SendService';
import ReportService from '@modules/zenvia/services/ReportService';
import AppError from '@shared/errors/AppError';
import CreateSessionService from '@modules/sessions/services/CreateSessionService';
import BotService from '@shared/services/BotService';
import UserTbService from '@shared/services/UserTbService';
import EmailService from '@modules/mail/services/EmailService';
import Cryptr from 'cryptr';
import GetGroupService from '../../../../group/services/GetGroupService';
import UpdateSessionService from '@modules/sessions/services/UpdateSessionService';

export default class ZenviaController {
  public async sendByText(request: Request, response: Response): Promise<Response> {
    const { msg, to, channel } = request.body;

    const sendWhatsZenvia = container.resolve(SendWhatsService);
    try {
      const responseZenvia = sendWhatsZenvia.text({ msg, to, channel });
      return response.json(responseZenvia);
    } catch (err) {
      throw new AppError("Problem to return response from zenvia")
    }
  }

  public async sendByTemplate(request: Request, response: Response): Promise<Response> {
    const { templateId, to, fields, channel } = request.body;

    const sendWhatsZenvia = container.resolve(SendWhatsService);
    try {
      const responseZenvia = sendWhatsZenvia.template({ templateId, to, fields, channel });
      return response.json(responseZenvia);
    } catch (err) {
      throw new AppError("Problem to return response from zenvia")
    }
  }
  public async webHookMsg(request: Request, response: Response): Promise<Response> {
    const { id, timestamp, type, subscriptionId, channel, direction, message } = request.body;

    const createSessionService = container.resolve(CreateSessionService);
    const updateSessionService = container.resolve(UpdateSessionService);
    const emailService = container.resolve(EmailService);
    const userTbService = container.resolve(UserTbService);
    const app_secret = process.env.APP_SECRET as string;
    const cryptr = new Cryptr(app_secret);
    
    let messages: string[] = []

    const session = await createSessionService.executeOrReturn({
      customer_name: message.visitor.name,
      customer_email: "",
      customer_cpf: "",
      customer_phone: message.from,
      first_channel: "zenvia_whatsapp",
      current_channel: "zenvia_whatsapp",
      sender_id: message.to,
      knowledge_base: "",
      externalId: "",
      status: true
    });
    const botService = container.resolve(BotService);
    const groupService = container.resolve(GetGroupService);
    const groupSendLink = await groupService.get();
    let linkReplace = ((groupSendLink?.link || '') as string)
      .replace('https://chat.whatsapp.com/', `${(process.env.BACKEND_SERVICE || '')}whatsapp/enter/`);


    
    const responseBotService = await botService.msg({
      msg: message.contents[0].text,
      session: session.id.toString(),
    })

    const sendWhatsZenvia = container.resolve(SendWhatsService);
    let isEnd = false; 

    // responseBotService?.data.contexts.map(async (data: any) => {
    //   if (data?.parameters?.fields["email.original"]
    //     && data?.parameters?.fields["number.original"]
    //     && data?.parameters?.fields["nome.original"]) {
    //     const passwordGenerator = generate({
    //       length: 10,
    //       numbers: true
    //     });
    //     const email = data?.parameters?.fields["email.original"]["stringValue"];
    //     const length = 11;
    //     await userTbService.create({
    //       email,
    //       name: data?.parameters?.fields["nome.original"]["stringValue"],
    //       password: passwordGenerator,
    //       lastName: data?.parameters?.fields["nome.original"]["stringValue"],
    //       document: " ",
    //       phoneNumber: data?.parameters?.fields["number.original"]["stringValue"],
    //       birthdayDate: '01-01-1979',
    //       type: 'student'
    //     });

    //     emailService.execute({
    //       email,
    //       name: data?.parameters?.fields["nome.original"]["stringValue"],
    //       subject: 'Bem vindo ao TableTalks!',
    //       variables: {
    //         name:data?.parameters?.fields["nome.original"]["stringValue"],
    //         body: 'Obrigado por entrar em nosso grupo, o seus dados de acesso a plataforma são: \n email: ' + email + '\n password: ' + passwordGenerator,
    //       },
    //       template: ''
    //     });

    //   }
    // });

    responseBotService?.data.messages.map((msg)=> {
        msg.text.text.reverse().map(async(text: string) => {
            if(text.includes('{link_group}')) {
              isEnd = true;
              linkReplace = linkReplace.replace('\t','') + '/' + cryptr.encrypt(responseBotService?.data.contexts?.email?.stringValue)
            }
            await sendWhatsZenvia.text({ msg: text.replace('{link_group}', linkReplace), to: session.customer_phone, channel })
        });
    });
    

    if(isEnd){
      updateSessionService.execute({
        ...session,
        status: false,
      });
    }
 
    return response.json({ "success": true });
  }

  public async webHookMsgStatus(request: Request, response: Response): Promise<Response> {
    const { templateId, to, fields, channel } = request.body;
    return response.json()
  }

  public async stats(request: Request, response: Response): Promise<Response> {
    const zenviaReports = container.resolve(ReportService);
    
    return response.json(await zenviaReports.getAll());
  }

}
