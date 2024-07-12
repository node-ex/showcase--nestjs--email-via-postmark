import { Module } from '@nestjs/common';
import { PostmarkController } from './postmark.controller';
import { PostmarkService } from './postmark.service';

@Module({
  controllers: [PostmarkController],
  providers: [PostmarkService],
})
export class PostmarkModule {}
