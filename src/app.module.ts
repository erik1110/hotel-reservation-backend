import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
