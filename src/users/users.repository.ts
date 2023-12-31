import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCurrentDto } from './dto/users.current.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { CommentsSchema } from 'src/comments/comments.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.userModel
      .find()
      .populate('comments', CommentsModel);

    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const user = await this.userModel.findById(id);

    user.imgUrl = fileName;

    const newUser = await user.save();

    return newUser.readOnlyData;
  }

  async findUserByIdWithoutPassword(
    userId: string | Types.ObjectId,
  ): Promise<UserCurrentDto | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async create(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
