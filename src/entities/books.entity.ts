import { IsNotEmpty,IsPositive,MaxDate,MaxLength,Length } from 'class-validator';
import { Entity, Column,PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '@interfaces/books.interface';
import { Content } from "./content.entity"
@Entity()
export class BookEntity extends Content implements Book {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  author: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(30, {
    message: 'title is too long.',
  })
  title: string;

  
  @Column()
  @IsNotEmpty()
  @Length(30, 255)
  description: string;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  number: number;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  avaliable_number: number;

  @Column()
  @IsNotEmpty()
  @MaxDate(new Date())
  publication_date: Date;
}
