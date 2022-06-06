import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  async create() {}

  async getOne() {}

  async getAll() {
    return 'GET ALL ALBUMS';
  }

  async update() {}

  async delete() {}
}
