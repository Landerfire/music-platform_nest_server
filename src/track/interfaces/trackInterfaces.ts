import { Comment } from '../models/comments.model';
import { Track } from '../models/track.model';

export interface IOneTrackWithComments {
  track: Track;
  comments: Comment[];
}

export interface IDeletedTrack {
  message: string;
  destroyedRow: Track;
}
