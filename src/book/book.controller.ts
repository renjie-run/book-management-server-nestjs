import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list() {
    return '';
  }

  @Get(':id')
  getById() {
    return '';
  }

  @Post('create')
  crate() {
    return '';
  }

  @Put('update')
  update() {
    return '';
  }

  @Delete('delete/:id')
  delete() {
    return '';
  }
}
