import {uuid} from 'uuidv4';
import {Entity, Column, PrimaryGeneratedColumn,Generated} from 'typeorm';
import generate from '@babel/generator';

@Entity('user_token')
class UserToken{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
}

export default UserToken;
