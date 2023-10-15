import { Module } from '@nestjs/common';
import { RestaurantService } from './Restaurant.service';
import { RestaurantController } from './Restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './schemas/Restaurant.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Restaurant.name, schema: RestaurantSchema}])
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService]
})
export class RestaurantModule {}
