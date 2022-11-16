import { Channel } from '@zenvia/sdk';

export default interface ITextRequestDTO {
    msg: string;
    to: string;
    channel: Channel;
}