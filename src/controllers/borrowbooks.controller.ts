import { NextFunction, Request, Response } from 'express';
import { CreateBorrowBookDto } from '@dtos/borrowbooks.dto';
import { BorrowBook } from '@interfaces/borrowbooks.interface';
import borrowBooksService from '@services/borrowbooks.service';



class BorrowBookController {
  public borrowBooksService = new borrowBooksService();

  
  public getBorrowBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBorrowBooksData: BorrowBook[] = await this.borrowBooksService.findAllBorrowBook();

      res.status(200).json({ data: findAllBorrowBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public borrowBookById= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id_user);
      const bookId = Number(req.params.id_book);
      const _id = Number (req.params.id);
      const borrowBookData: CreateBorrowBookDto = req.body;
      const createBorrowBook :BorrowBook = await this.borrowBooksService.BorrowBookById(bookId,userId,_id,borrowBookData);

      res.status(201).json({ data: createBorrowBook, message: 'created' });  
    } catch (error) {
      next(error);
    }
  };
  public returnBook= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const _id = Number (req.params.id);
      const borrowBookData: CreateBorrowBookDto = req.body;
      const createBorrowBook :BorrowBook = await this.borrowBooksService.returnBorrowBookById(_id,borrowBookData);

      res.status(201).json({ data: createBorrowBook, message: 'created' });  
    } catch (error) {
      next(error);
    }
  };
}

export default BorrowBookController;