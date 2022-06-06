import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Трек №66', required: true, description: 'Название трека' })
  readonly name: string;

  @ApiProperty({ example: 'Василий Иванович', description: 'Имя исполнителя' })
  readonly artist?: string;

  @ApiProperty({ example: 'Текст песни', description: 'Текст трека' })
  readonly text?: string;

  @ApiProperty({ example: 1, description: 'id альбома. Необязательный параметр.' })
  readonly album_id?: number;
}
