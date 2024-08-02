import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { DbService } from 'src/db/db.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject()
  private readonly dbService: DbService;

  generateBookID(books: Book[]): number {
    if (books.length === 0) {
      return randomNum();
    }

    const booksIds = books.map((book) => book.id);
    let bookId = randomNum();
    while (booksIds.includes(bookId)) {
      bookId = randomNum();
    }
    return bookId;
  }

  async list(name?: string) {
    let books: Book[] = await this.dbService.read();
    if (name) {
      books = books.filter((book) => book.name.includes(name));
    }
    return books;
  }

  async getById(id: number) {
    const books: Book[] = await this.dbService.read();
    const book: Book = books.find((book) => book.id === id);
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const newBook = new Book();
    newBook.id = this.generateBookID(books);
    newBook.author = createBookDto.author;
    newBook.description = createBookDto.description;
    newBook.cover = createBookDto.cover;
    const updatedBooks = [...books, newBook];
    await this.dbService.write(updatedBooks);
    return newBook;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((book) => book.id === updateBookDto.id);
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    book.name = updateBookDto.name;
    book.author = updateBookDto.author;
    book.description = updateBookDto.description;
    book.cover = updateBookDto.cover;

    await this.dbService.write(books);
    return book;
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex < 0) {
      throw new BadRequestException('Book not found');
    }

    books.splice(bookIndex, 1);

    await this.dbService.write(books);
    return 'success';
  }
}
