import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  session_id: string;

  @Column()
  from: string;

  @Column()
  to: string;


  @Column({ enum:['text', 'file', 'template', 'contacts', 'location'] })
  type: string;

  @Column({ enum:['zenvia_whatsapp', 'zenvia_chat', 'default'] })
  channel: string;

  @Column()
  externalId: string;

  @Column()
  body: string;

  @Column({ enum:['sending', 'success', 'error'] })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Message;
