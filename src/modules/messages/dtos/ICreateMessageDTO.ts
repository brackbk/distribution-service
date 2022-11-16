import { ObjectID } from "typeorm";

export default interface ICreateMessageDTO {
  session_id: string;
  from: string;
  to: string;
  type: string;
  body: string;
  channel: string;
  externalId: string;
  status: string;
}
