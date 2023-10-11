import { User } from '../users.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '65250ce17148ea30ebdb9d2c',
    description: 'id',
  })
  id: string;
}
