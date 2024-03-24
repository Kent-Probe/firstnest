import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HouseSchema = HydratedDocument<House>;

@Schema({
   collection: 'houses',
   timestamps: true,
   versionKey: false,
})
export class House {
   @Prop({ required: true, unique: true, index: true })
   code: string;
   @Prop({ required: true })
   address: string;
   @Prop({ required: true })
   city: string;
   @Prop({ required: true })
   state: string;
   @Prop({ required: true })
   size: number;
   @Prop({ required: true })
   type: string;
   @Prop({ required: true, default: '1' })
   zipcode: string;
   @Prop({ required: true, default: '1' })
   rooms: number;
   @Prop({ required: true, default: '1' })
   bathrooms: number;
   @Prop({ required: true, default: false })
   parking: boolean;
   @Prop({ required: true })
   price: number;
   image: string;
}

export const HouseSchema = SchemaFactory.createForClass(House);
