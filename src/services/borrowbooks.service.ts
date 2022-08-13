import { EntityRepository, Repository } from 'typeorm';
import { CreateBorrowBookDto } from '@dtos/borrowbooks.dto';
import { BorrowBookEntity } from '@entities/borrowbooks.entity';
import { BookEntity } from '@entities/books.entity';
import { HttpException } from '@exceptions/HttpException';
import { BorrowBook } from '@interfaces/borrowbooks.interface';
import { isEmpty } from '@utils/util';
import { Book } from '@interfaces/books.interface';
@EntityRepository()
class BorrowBooksService extends Repository<BorrowBookEntity> {
  public async findAllBorrowBook(): Promise<BorrowBook[]> {
    const borrowbooks: BorrowBook[] = await BorrowBookEntity.find();
    return borrowbooks;
  }



  public async BorrowBookById(userId: number,bookId: number,_id:number, borrowBookData: CreateBorrowBookDto ): Promise<BorrowBook> {
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');
    if (isEmpty(bookId)) throw new HttpException(400, 'bookId is empty');
    if (isEmpty(_id)) throw new HttpException(400, 'borrowBookId is empty');

    const checkBookById: Book = await BookEntity.findOne({ where: { id : bookId } });
    if (checkBookById.avaliable_number<=0) throw new HttpException(409, `This book is null`);

    const countUserBorrowBook: number = await BorrowBookEntity.count({where: {id_user: userId, returned_date: "null"}})
    if(countUserBorrowBook ===3) throw new HttpException(409, `User ${userId} can't borrow more book`);
    
    const findIdBorrow: BorrowBook = await BorrowBookEntity.findOne({ where: { id: _id } });
    if (findIdBorrow) throw new HttpException(409, "Id borrow books is exist");

    const createBorrowBook: BorrowBook = await BorrowBookEntity.create({...borrowBookData}).save();
    return createBorrowBook;
  }
  public async returnBorrowBookById(_id:number, borrowBookData: CreateBorrowBookDto ): Promise<any> {
    if (isEmpty(_id)) throw new HttpException(400, 'userId is empty');

    const findBorrowBookData: BorrowBook = await BorrowBookEntity.findOne({where: {id: _id}})
    if(!findBorrowBookData) throw new HttpException(409, `We don't have record about this.`);
    
    await BorrowBookEntity.update(_id,{ ...borrowBookData});
    
    const updateBorrowBook: BorrowBook = await BorrowBookEntity.findOne({ where: { id: _id } });
    return updateBorrowBook;
  }

}
export default BorrowBooksService;
