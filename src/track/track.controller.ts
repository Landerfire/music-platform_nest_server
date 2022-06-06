import { CreateCommentDto } from './dto/create-comment.dto';
import { TrackService } from './track.service';
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './models/track.model';
import { Comment } from './models/comments.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Аудиозаписи')
@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({ summary: 'Создание трека' })
  @ApiResponse({ status: 200, type: Track })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @UploadedFiles() files: { picture?: Express.Multer.File[]; audio?: Express.Multer.File[] },
    @Body() dto: CreateTrackDto,
  ) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @ApiOperation({ summary: 'Запрос массива всех треков' })
  @ApiResponse({ status: 200, type: [Track] })
  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @ApiOperation({ summary: 'Запрос трека по селектору: id (с возможностью запроса комментариев к треку)' })
  @ApiResponse({ status: 200, type: Track })
  @Get('/:id')
  getOne(@Param('id') id: string, @Query('comments') query: string) {
    if (query == undefined) {
      return this.trackService.getOne(id);
    }
    return this.trackService.getOneWithComments(id);
  }

  @ApiOperation({ summary: 'Удаление трека', description: 'Возвращает запись об удаленном треке' })
  @ApiResponse({ status: 200, type: Track })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }

  @ApiOperation({ summary: 'Добавление комментария к треку' })
  @ApiResponse({ status: 200, type: Comment })
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }
}
