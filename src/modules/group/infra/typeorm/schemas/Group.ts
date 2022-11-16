import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('group')
class Group {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  link: string | RegExp;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({default: true})
  status: boolean;

  @Column({default: 0})
  user_active: number | object;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Group;
