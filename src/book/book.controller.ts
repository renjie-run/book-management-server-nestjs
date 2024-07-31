import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list(): Promise<Book[]> {
    return this.bookService.list();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Book> {
    return this.bookService.getById(id);
  }

  @Post('create')
  crate(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Put('update')
  update(@Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number): Promise<string> {
    return this.bookService.delete(id);
  }
}
