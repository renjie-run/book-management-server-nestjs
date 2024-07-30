import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('DB_OPTIONS')
  private dbOptions: DbModuleOptions;

  async read() {
    try {
      await access(this.dbOptions.path);
    } catch (e) {
      return [];
    }

    const str = await readFile(this.dbOptions.path, { encoding: 'utf-8' });
    if (!str) {
      return [];
    }
    try {
      return JSON.parse(str);
    } catch (e) {
      return [];
    }
  }

  async write(obj) {
    await writeFile(this.dbOptions.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
