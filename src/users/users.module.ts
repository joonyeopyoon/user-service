import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),

    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: User.name, schema: UserSchema },
    ]),

    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
