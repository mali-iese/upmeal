import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { LOCATION } from 'src/shared/constants/Location.enum';
import { ROLES } from 'src/shared/constants/roles.enum';
export type UserDocument = User & Document;
@Schema()
export class User {
  static save(): UserDocument | PromiseLike<UserDocument> {
    throw new Error('Method not implemented.');
  }
    @Prop({required : true})
    name: string;
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({required: false})
    location: LOCATION;
    @Prop({required: false,default:ROLES.CUSTOMER})
    role: ROLES;
    @Prop()
    refreshToken: string;
    @Prop()

    likedRestaurant: ObjectId[]=[];
    static likedRestaurant: any;
    @Prop()
    resetPasswordToken: string;
    @Prop()
    resetPasswordExpires: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);