import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from '@dtos/books.dto';
import { BookEntity } from '@entities/books.entity';
import { HttpException } from '@exceptions/HttpException';
import { Book } from '@interfaces/books.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class BookService extends Repository<BookEntity> {
  public async findAllBook(): Promise<Book[]> {
    const books: Book[] = await BookEntity.find();
    return books;
  }

  public async findBookById(_id: number): Promise<Book> {
    if (isEmpty(_id)) throw new HttpException(400, 'BookId is empty');

    const findBook: Book = await BookEntity.findOne({ where: { id: _id } });
    if (!findBook) throw new HttpException(409, `User doesn't exist`);

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, `bookData is empty`);

    const findBook: Book = await BookEntity.findOne({ where: { id: bookData.id } });
    if (findBook) throw new HttpException(409, `This book ${bookData.id} already exists`);

    const createBookData: Book = await BookEntity.create({ ...bookData }).save();

    return createBookData;
  }

  public async updateBook(_id: number, bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: Book = await BookEntity.findOne({ where: { id: _id } });
    if (!findBook) throw new HttpException(409, "User doesn't exist");

    await BookEntity.update(_id, { ...bookData });

    const updateBook: Book = await BookEntity.findOne({ where: { id: _id } });
    return updateBook;
  }

  public async deleteBook(_id: number): Promise<Book> {
    if (isEmpty(_id)) throw new HttpException(400, 'UserId is empty');

    const findBook: Book = await BookEntity.findOne({ where: { id: _id } });
    if (!findBook) throw new HttpException(409, "User doesn't exist");

    await BookEntity.delete({ id: _id });
    return findBook;
  }
}
export default BookService;
