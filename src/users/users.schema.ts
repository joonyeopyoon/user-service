import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  collection: 'users',
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'user@email.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'user',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123456',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://camo.githubusercontent.com/db496e048f1032192a24df1731f12705dae1008e0af4131de67fcad861dd67ec/68747470733a2f2f696d67312e6461756d63646e2e6e65742f7468756d622f523132383078302f3f73636f64653d6d746973746f72793226666e616d653d6874747073253341253246253246626c6f672e6b616b616f63646e2e6e6574253246646e253246436f52777825324662747138525454306456342532466c38536856726a4b5344536147474772684e6b75644b253246696d672e6a7067',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

export const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_UserSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});
_UserSchema.set('toObject', { virtuals: true });
_UserSchema.set('toJSON', { virtuals: true });

export const UserSchema = _UserSchema;
