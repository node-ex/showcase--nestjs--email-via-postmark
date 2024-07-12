import { Type } from 'class-transformer';
import { IsEmail, IsString, ValidateNested } from 'class-validator';

export class RecipientInfoDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}

export class SendEmailDto {
  @ValidateNested()
  @Type(() => RecipientInfoDto)
  recipient!: RecipientInfoDto;
}
