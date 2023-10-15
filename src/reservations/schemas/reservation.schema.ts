import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
export type ReservationDocument = Reservation & Document;
@Schema()
export class Reservation {
    @Prop({required : true, type: SchemaTypes.ObjectId})
    restaurant: Types.ObjectId;
    @Prop({required : true, type: SchemaTypes.ObjectId})
    user: Types.ObjectId;
    @Prop({required : true})
    time: string;
    @Prop({required : true}) 
    discount: string;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);