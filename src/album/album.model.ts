import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Track } from 'src/track/models/track.model';

{
  /*
id
name
author
picture
*/
}

interface AlbumCreationAttrs {
  name: string;
  author: string;
  picture: string;
}

@Table({ tableName: 'albums' })
export class Album extends Model<Album, AlbumCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @Column({ type: DataType.STRING })
  picture: string;

  @HasMany(() => Track)
  tracks: Track[];
}
