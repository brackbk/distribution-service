import { ObjectID } from "typeorm";

export default interface IUpdateSessionDTO {
    id: ObjectID;
    customer_name: string;
    customer_email: string;
    customer_cpf: string;
    customer_phone: string;
    first_channel: string;
    current_channel: string;
    sender_id: string;
    knowledge_base: string;
    externalId: string;
    status: boolean;
  }
  