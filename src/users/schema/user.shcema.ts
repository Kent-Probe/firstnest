import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
   collection: 'users',
   timestamps: true,
   versionKey: false,
})
export class User {
   @Prop({ required: true, unique: true, index: true })
   id: number;

   @Prop({ required: true })
   name: string;

   @Prop()
   lastname: string;

   @Prop({ required: true, unique: true, index: true })
   email: string;

   @Prop({ required: true, minlength: 3 })
   password: string;

   @Prop({ required: true, default: 'user' })
   rol: string;

   @Prop({ required: false, default: 'none' })
   avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
