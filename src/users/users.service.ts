import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ROLES } from 'src/shared/constants/roles.enum';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) : Promise<UserDocument>  {
    const createdUser= new this.userModel(createUserDto);
    const savedUser = await createdUser.save();
    return savedUser ;
  }

async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }
async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
  }

async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async likeRestaurant(userId: string, restaurantId: ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
  
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    // Check if the restaurantId is already in the likedRestaurants array
    if (user.likedRestaurant.includes(restaurantId)) {
      throw new BadRequestException('Restaurant already liked');
    }
  
    // Add the restaurantId to the likedRestaurants array
    user.likedRestaurant.push(restaurantId);
  
    // Save the user document
    return user.save();
  }
  
}

