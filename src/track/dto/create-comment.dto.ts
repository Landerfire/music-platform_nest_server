import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'VasyaFireLord14', required: true, description: 'Имя пользователя' })
  readonly username: string;

  @ApiProperty({ example: 'Этот трек - просто пушка!', required: true, description: 'Текст комментария' })
  readonly text: string;

  @ApiProperty({ example: 1, required: true, description: 'id трека, к которому относится комментарий' })
  readonly track_id: number;
}
