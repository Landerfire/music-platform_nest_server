import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './album.model';
import { Track } from '../track/models/track.model';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [SequelizeModule.forFeature([Album, Track])],
})
export class AlbumModule {}
