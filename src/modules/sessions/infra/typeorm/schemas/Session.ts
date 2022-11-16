import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sessions')
class Session {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  customer_name: string;

  @Column()
  customer_email: string;

  @Column()
  customer_cpf: string;

  @Column()
  customer_phone: string;

  @Column({ enum:['zenvia_whatsapp', 'zenvia_chat', 'default'] })
  first_channel: string;

  @Column({ enum:['zenvia_whatsapp', 'zenvia_chat', 'default'] })
  current_channel: string;

  @Column()
  sender_id: string;

  @Column()
  knowledge_base: string;

  @Column()
  externalId: string;
  
  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Session;
