import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'Hello getAllComments';
  }

  async createComments(id: string, comments: CommentsCreateDto) {
    console.log(`${id}, ${JSON.stringify(comments)}`);
    return 'Hello createComments';
  }

  async plusLike(id: string) {
    return 'Hello plusLike';
  }
}
