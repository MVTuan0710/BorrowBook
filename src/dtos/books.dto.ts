import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public actor: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public number: number;
  
  @IsString()
  public avaliable_number: number;
  
  @IsDate()
  public publication_date: Date;
}
