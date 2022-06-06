import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Album } from 'src/album/album.model';
import { Comment } from './comments.model';

interface TrackCreationAttr {
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  album_id: number;
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackCreationAttr> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор записи' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Название', description: 'Название трека' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Василий Иванович', description: 'Имя исполнителя' })
  @Column({ type: DataType.STRING }) //* Оставить allowNull: true, пустить проверку, указать неизвестного автора
  artist: string;

  @ApiProperty({ example: 'Текст песни', description: 'Текст песни (-_-)' })
  @Column({ type: DataType.STRING })
  text: string;

  @ApiProperty({ example: 0, default: 0, description: 'Кол-во прослушиваний. По-умолчанию = 0' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 }) //? + {autoIncrement} mb?
  listens: number;

  @ApiProperty({ example: 'picture.jpg', description: 'Ссылка на картинку-обложку для трека' })
  @Column({ type: DataType.STRING })
  picture: string;

  @ApiProperty({ example: 'wav.mp3', description: 'Ссылка на аудиозапись' })
  @Column({ type: DataType.STRING })
  audio: string;

  @ApiProperty({ example: 1, description: 'id альбома, в который включен трек' })
  @ForeignKey(() => Album)
  @Column({ type: DataType.INTEGER })
  album_id: number;

  @BelongsTo(() => Album)
  album: Album;

  @HasMany(() => Comment)
  comments: Comment[];
}
