import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts') // Назва таблиці в БД
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;
}
