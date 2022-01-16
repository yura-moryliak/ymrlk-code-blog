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

  @Prop(raw({
    url: { type: String },
    prefix: { type: String }
  }))
  accountUrl: Record<string, any>;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop(raw({
    country: { type: String },
    city: { type: String }
  }))
  from: Record<string, any>;

  @Prop({ type: [String], required: true })
  roles: string[];

  @Prop({ type: String, required: true, unique: true })
  uuid: string;

  @Prop()
  refreshToken: string;

  @Prop()
  refreshTokenExpiresIn: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
