import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ForgotPasswordModule } from './forgotpassword/forgotpassword.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/upmeal'),
    UsersModule,
    AuthModule,
    ForgotPasswordModule, // Keep this if needed
    RestaurantModule,     // Keep this if needed
    ReservationsModule,   // Keep this if needed
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

