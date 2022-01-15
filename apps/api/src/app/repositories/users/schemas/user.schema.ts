import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  userName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  shortBio: string;

  @Prop(raw({
    name: { type: String },
    path: { type: String }
  }))
  avatar: Record<string, any>;

  @Prop()
  accountUrl: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop(raw({
    country: { type: String },
    city: { type: String }
  }))
  from: Record<string, any>;

  @Prop([String])
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
