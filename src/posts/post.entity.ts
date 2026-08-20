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

  // text, а не varchar(255) — довгі URL не мають падати з помилкою БД
  @Column({ type: 'text', nullable: true })
  preview_img: string;

  @Column({ type: 'text', nullable: true })
  main_img: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;
}
