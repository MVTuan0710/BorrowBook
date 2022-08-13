import { IsNotEmpty,IsUppercase,MinLength } from 'class-validator';
import { Entity, Column, Unique,PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { Content } from "./content.entity"

@Entity()
export class UserEntity extends Content implements User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  @IsUppercase()
  @MinLength(10, {
    message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password: string;
  
  
  @Column()
  @IsNotEmpty()
  @Unique(['number_phone'])
  number_phone: number;

}
