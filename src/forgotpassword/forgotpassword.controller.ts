import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { ForgotPasswordService } from './forgotpassword.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('forgotpassword')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('requestforemail')
  async sendPasswordResetEmail(@Body() body: { email: string }): Promise<void> {
    // Request to send a password reset email
    await this.forgotPasswordService.sendPasswordResetEmail(body.email);
    // Return a success response or appropriate message
  }

  @Get('reset-password/:token')
  async checkResetTokenValidity(@Param('token') token: string): Promise<void> {
    
    // Check the validity of the reset token
    // This step can be used to determine if the token is valid or expired
    // You can return a response indicating token validity or an error message
    await this.forgotPasswordService.validateResetToken(token);
  }

  @Patch('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    // Reset the user's password with the provided token and new password
    await this.forgotPasswordService.resetPassword(
      resetPasswordDto.email,
      token,
      resetPasswordDto.newPassword,
    );
    // Return a success response or appropriate message
  }
}
