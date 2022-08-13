import { Entity, Column,BaseEntity,PrimaryGeneratedColumn } from "typeorm"
import { BorrowBook } from '@interfaces/borrowbooks.interface';
import { IsNotEmpty,IsOptional } from 'class-validator';

@Entity()
export class BorrowBookEntity extends BaseEntity implements BorrowBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    id_user: number;

    @Column()
    @IsNotEmpty()
    id_book: number;
    

    @Column()
    @IsNotEmpty()
    borrowing_date: Date;

    @Column()
    @IsNotEmpty()
    returning_date: Date;

    @Column()
    @IsNotEmpty()
    @IsOptional()
    returned_date: Date;
}