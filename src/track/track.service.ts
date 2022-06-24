import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comments.model';
import { Track } from './models/track.model';
import { IDeletedTrack, IOneTrackWithComments } from './interfaces/trackInterfaces';
import { FileService, FileType } from 'src/file/file.service';
import { Op } from 'sequelize';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackModel: typeof Track,
    @InjectModel(Comment) private commentModel: typeof Comment,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture: Express.Multer.File, audio: Express.Multer.File): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    if (!dto.artist || dto.artist === '') {
      dto = { ...dto, artist: 'Незивестный исполнитель' };
    }

    return await this.trackModel.create({ ...dto, listens: 0, picture: picturePath, audio: audioPath });
  }

  async getAll(limit = 10, offset = 0): Promise<Track[]> {
    return await this.trackModel.findAll({ limit, offset });
  }

  async search(query: string): Promise<Track[]> {
    const regexp = new RegExp(query, 'i');
    const tracks = await this.trackModel.findAll();
    return await tracks.filter(({ name }) => name.match(regexp));
  }

  async getOne(id: string): Promise<Track> {
    return await this.trackModel.findOne({ where: { id } });
  }

  async getOneWithComments(id: string): Promise<IOneTrackWithComments> {
    const track = await this.trackModel.findOne({ where: { id } });
    const comments = await this.commentModel.findAll({ where: { track_id: id } });
    return { track, comments };
  }

  async delete(id: string): Promise<IDeletedTrack> {
    const track = await this.trackModel.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(`item with id = ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const comments = await this.commentModel.findAll({ where: { track_id: id } });
    if (comments.length > 0) {
      await this.commentModel.destroy({ where: { track_id: id } });
    }
    await track.destroy();
    return { message: 'row destroyed with all comments', destroyedRow: track };
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findOne({ where: { id: dto.track_id } });
    if (!track) {
      throw new HttpException(`track with id = ${dto.track_id} not found`, HttpStatus.NOT_FOUND);
    }
    const comment = await this.commentModel.create(dto);
    return comment;
  }

  async listen(id: string): Promise<void> {
    const track = await this.trackModel.findOne({ where: { id } });
    track.listens += 1;
    track.save();
  }
}
