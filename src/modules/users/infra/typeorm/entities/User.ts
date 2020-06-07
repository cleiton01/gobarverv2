import {uuid} from 'uuidv4';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users_v2')
class User{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
}

export default User;
