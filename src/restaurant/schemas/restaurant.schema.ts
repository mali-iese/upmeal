import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
export type RestaurantDocument = Restaurant & Document;
@Schema()
export class Restaurant {
    @Prop({required : true, type: SchemaTypes.ObjectId})
    manager: Types.ObjectId;
    @Prop({required : true, unique : true})
    name: string;
    @Prop({required : true}) 
    logo: string;
    @Prop({required: true})
    cover: string;
    @Prop({required: true})
    description: string;
    @Prop({required: false})
    atmosphere: string[]=[];
    @Prop({required: false})
    facilities: string[]=[];
    @Prop()
    spokenLanguages: string[]=[];
    @Prop()
    paymentOptions: string[]=[];
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);