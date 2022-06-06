import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './album/album.model';
import { Track } from './track/models/track.model';
import { Comment } from './track/models/comments.model';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.development.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: Number(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      models: [Album, Track, Comment],
      autoLoadModels: true,
    }),
    TrackModule,
    AlbumModule,
  ],
})
export class AppModule {}
