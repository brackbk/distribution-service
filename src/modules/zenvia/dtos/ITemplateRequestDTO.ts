import { Channel } from '@zenvia/sdk';

export default interface ITemplateRequestDTO {
    templateId: string;
    fields: {};
    to: string;
    channel: Channel;
  }