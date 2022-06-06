import { Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  create() {}

  @Get()
  getAll() {
      return this.albumService.getAll()
  }
}
