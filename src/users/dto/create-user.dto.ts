import { IsEmail, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";
import { LOCATION } from "src/shared/constants/Location.enum";
import { ROLES } from "src/shared/constants/roles.enum";
export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    role: ROLES;
    @IsOptional()
    location?: LOCATION;
    @IsString()
    refreshToken?: string;
    @IsOptional()
    likedRestaurant:ObjectId[]= [] ;
  }