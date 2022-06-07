import { FileService } from './../file/file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';
import { Track } from './models/track.model';
import { Album } from '../album/album.model';
import { Comment } from './models/comments.model';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FileService],
  imports: [SequelizeModule.forFeature([Track, Album, Comment])],
})
export class TrackModule {}
