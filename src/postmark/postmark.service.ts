import { coreConfig } from '@/core/configs/core.config';
import { SendEmailDto } from '@/postmark/dtos/send-email.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as postmark from 'postmark';

@Injectable()
export class PostmarkService {
  private client: postmark.ServerClient;

  constructor(
    @Inject(coreConfig.KEY)
    private injectedCoreConfig: ConfigType<typeof coreConfig>,
  ) {
    this.client = new postmark.ServerClient(
      this.injectedCoreConfig.postmark.serverApiToken,
    );
  }

  async sendWelcomeEmail(sendEmailDto: SendEmailDto): Promise<void> {
    const templateModel = {
      name: sendEmailDto.recipient.name,
    };

    const response = await this.client.sendEmailWithTemplate({
      From: this.injectedCoreConfig.postmark.senderEmail,
      To: sendEmailDto.recipient.email,
      TemplateAlias: 'welcome',
      TemplateModel: templateModel,
    });

    console.log(response);
  }
}
