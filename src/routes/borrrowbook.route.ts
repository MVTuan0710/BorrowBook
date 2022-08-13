import { Router } from 'express';
import BorrowBookController from "@/controllers/borrowbooks.controller";
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBorrowBookDto } from '@dtos/borrowbooks.dto';
class BorrowBookRoute implements Routes {
  public path = '/borrowbooks';
  public router = Router();
  public borrowBookController = new BorrowBookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.borrowBookController.getBorrowBooks);
    this.router.get(`${this.path}`,validationMiddleware(CreateBorrowBookDto, 'body'), this.borrowBookController.borrowBookById);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateBorrowBookDto, 'body', true), this.borrowBookController.returnBook);
  }
}
export default BorrowBookRoute;
