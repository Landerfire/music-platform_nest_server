import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Track } from './track.model';
{
  /* 
id
track_id
username
text
*/
}

interface CommentCreationAttrs {
  track_id: number;
  username: string;
  text: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор комментария' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 1, description: 'Уникальный идентификатор комментируемого трека' })
  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER })
  track_id: number;

  @ApiProperty({ example: 'VasyaFireLord14', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @ApiProperty({ example: 'Вася одобряет!', description: 'Текст комментария' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @BelongsTo(() => Track)
  track: Track;
}
