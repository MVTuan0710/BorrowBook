import { Column, BaseEntity } from "typeorm"
import { IsNotEmpty } from 'class-validator';


export abstract class Content extends BaseEntity{
    
   
    @Column()
    @IsNotEmpty()
    name: string;
}