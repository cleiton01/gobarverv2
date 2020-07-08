import {uuid} from 'uuidv4';
import {ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn
} from 'typeorm';

@Entity('notification')
class Notification{

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column()
  recipient_type: string;

  @Column('uuid')
  recipient_id: string;

  @Column()
  sent: boolean;

  @Column()
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
