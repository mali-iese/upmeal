import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';



@Injectable()
export class RestaurantService {

  constructor(@InjectModel(Restaurant.name) private RestaurantModel: Model<RestaurantDocument>) {}

  async create(CreateRestaurantDto: CreateRestaurantDto) : Promise<RestaurantDocument>  {
    const createdRestaurant= new this.RestaurantModel(CreateRestaurantDto);
    const savedRestaurant = await createdRestaurant.save();
    return savedRestaurant ;
  }

async findAll(): Promise<RestaurantDocument[]> {
    return this.RestaurantModel.find().exec();
  }

async findById(id: string): Promise<RestaurantDocument> {
    return this.RestaurantModel.findById(id).exec();
  }

async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDocument> {
    return this.RestaurantModel.findByIdAndUpdate(id, updateRestaurantDto, {new:true});
  }

async remove(id: string): Promise<RestaurantDocument> {
    return this.RestaurantModel.findByIdAndDelete(id).exec();
  }
}
