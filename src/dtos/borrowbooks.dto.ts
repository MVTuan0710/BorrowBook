import { IsDate, IsString,IsNumber } from 'class-validator';

export class CreateBorrowBookDto {
  @IsNumber()
  public id:number;

  @IsNumber()
  public id_user:number;
  
  @IsNumber()
  public id_book:number;

  @IsString()
  public borrowing_date: number;
  
  @IsDate()
  public returning_date: Date;

  @IsDate()
  public returned_date: Date;
}
