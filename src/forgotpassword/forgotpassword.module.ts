import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotPasswordController } from './forgotpassword.controller';
import { ForgotPasswordService } from './forgotpassword.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET, // Replace with your actual secret key
    }),
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, MailerService]
})
export class ForgotPasswordModule {}
