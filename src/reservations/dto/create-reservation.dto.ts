import { IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateReservationDto {
    restaurant:ObjectId ;
    @IsString()
    user: string;
    @IsString()
    time: string;
    @IsString()
    discount: string;
  }
