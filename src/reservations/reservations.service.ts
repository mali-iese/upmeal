import { HttpStatus, Injectable, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Restaurant } from 'src/restaurant/schemas/restaurant.schema';



@Injectable()
export class ReservationsService {

  constructor(@InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>) {}

  async create(CreateReservationDto: CreateReservationDto) : Promise<ReservationDocument>  {
    const createdReservation= new this.ReservationModel(CreateReservationDto);
    const savedReservation = await createdReservation.save();
    return savedReservation ;
  }

async findAll(id:string): Promise<ReservationDocument[]> {
    return this.ReservationModel.find({restaurant: id}).exec();
  }

async findById(id: string): Promise<ReservationDocument> {
    return this.ReservationModel.findById(id).exec();
  }

async update(id: string, updateReservationDto: UpdateReservationDto): Promise<ReservationDocument> {
    return this.ReservationModel.findByIdAndUpdate(id, updateReservationDto, {new:true});
  }

async remove(id: string): Promise<ReservationDocument> {
    return this.ReservationModel.findByIdAndDelete(id).exec();
  }
}
