import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import {UpdateUserDto} from 'src/users/dto/update-user.dto'
import { MailerService } from './mailer.service';
import * as argon2 from 'argon2';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPasswordResetToken(userId: string): Promise<string> {
    const tokenPayload = { sub: userId };
    return  this.jwtService.sign(tokenPayload, { expiresIn: '1h' })
    
  }
  async validateResetToken(resetToken:string): Promise<void> {
        // Verify that the reset token is valid
        try {
          this.jwtService.verify(resetToken);
        } catch (error) {
          throw new BadRequestException('Invalid or expired token');
        }
  }

  async resetPassword(email: string, resetToken: string, newPassword: string): Promise<void> {
    // Find the user by email
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Update the user's password with the new password (hashed securely)
    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;
  
    // Clear the reset token and expiration
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
  
    // Save the updated user
    await user.save(); // Save the user document
  }
  

  async expireResetToken(email: string): Promise<void> {
    // Find the user by email and expire the reset token
    const user = await this.userModel.findOne({ email });
    if (user) {
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.createPasswordResetToken(user._id);

    // Send the reset token via email using the mailer service
    await this.mailerService.sendPasswordResetEmail(email, resetToken);
  }
}
