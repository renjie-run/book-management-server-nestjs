import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { getUploadDir, storage } from './file-storage';

const SUPPORT_EXTS = ['.jpg', '.jpeg', '.png', '.gif'];

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list(@Query('name') name?: string): Promise<Book[]> {
    return this.bookService.list(name);
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

  @Post('upload-cover')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      dest: getUploadDir(),
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (SUPPORT_EXTS.includes(extname)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(`Only support ${SUPPORT_EXTS.join(', ')}`),
            false,
          );
        }
      },
    }),
  )
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('image is required');
    }
    return file ? file.path : '';
  }
}
