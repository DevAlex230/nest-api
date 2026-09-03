import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoryEntity } from '@app/posts/category.entity';

@Entity('posts') // Назва таблиці в БД
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  category_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.posts, {
    nullable: true,
    onDelete: 'SET NULL', // видалення категорії не має вбивати пости
  })
  @JoinColumn({ name: 'category_id' }) // прив'язка до вже існуючої колонки
  // | null — і бо колонка nullable, і бо onDelete: SET NULL
  category: CategoryEntity | null;

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
