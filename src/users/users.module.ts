import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
