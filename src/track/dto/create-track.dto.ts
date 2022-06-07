import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Трек №66', required: true, description: 'Название трека' })
  readonly name: string;

  @ApiProperty({ example: 'Василий Иванович', required: false, description: 'Имя исполнителя' })
  readonly artist?: string;

  @ApiProperty({ example: 'Текст песни', required: false, description: 'Текст трека' })
  readonly text?: string;

  @ApiProperty({
    example: 'picture.jpg',
    required: false,
    description: 'form-data file параметр. В базу добавляется ссылка на название изображения, загружаемого на сервер',
  })
  readonly picture?: string;

  @ApiProperty({
    example: 'audio.mp3',
    required: false,
    description: 'form-data file параметр. В базу добавляется ссылка на название аудио-файла, загружаемого на сервер',
  })
  readonly audio?: string;

  @ApiProperty({ example: 1, required: false, description: 'id альбома. Необязательный параметр.' })
  readonly album_id?: number;
}
