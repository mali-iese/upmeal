import { IsArray, IsString, isString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateRestaurantDto {
    manager: ObjectId;
    @IsString()
    name:string;
    @IsString()
    logo: string;
    @IsString()
    cover: string;
    @IsString()
    description: string;
    @IsArray()@IsString()
    atmosphere: string[]=[];
    @IsArray()@IsString()
    facilities: string[]=[];
    @IsArray()@IsString()
    spokenLanguages: string[]=[];
    @IsArray()@IsString()
    paymentOptions: string[]=[];
  }