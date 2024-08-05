import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 50 })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: 0 })
  role: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;
}
