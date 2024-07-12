import { SendEmailDto } from '@/postmark/dtos/send-email.dto';
import { PostmarkService } from '@/postmark/postmark.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('postmark')
export class PostmarkController {
  constructor(private readonly emailService: PostmarkService) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<string> {
    await this.emailService.sendWelcomeEmail(sendEmailDto);
    return 'Email sent successfully';
  }
}
