import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import * as zenvia from '@zenvia/sdk';

import ZenviaConfig from '@config/zenvia'
import ITextRequestDTO from '../dtos/ITextRequestDTO';
import ITemplateRequestDTO from '../dtos/ITemplateRequestDTO';

@injectable()
class SendWhatsService {

  public async text({msg, to, channel}:ITextRequestDTO): Promise<zenvia.IMessage | undefined> {

    const zenviaService = new zenvia.Client(ZenviaConfig.ApiToken);
    const whatsapp = zenviaService.getChannel(channel);
    const content = new zenvia.TextContent(msg);
    const response = await whatsapp.sendMessage(ZenviaConfig.FromNumber, to, content);
      
    return response;
  }


  public async template({templateId, fields, to, channel}:ITemplateRequestDTO): Promise<zenvia.IMessage | undefined> {

    const zenviaService = new zenvia.Client(ZenviaConfig.ApiToken);
    const whatsapp = zenviaService.getChannel(channel);
    const content = new zenvia.TemplateContent(templateId,fields)
    const response = await whatsapp.sendMessage(ZenviaConfig.FromNumber, to, content);
      
    return response;
  }
}

export default SendWhatsService;
