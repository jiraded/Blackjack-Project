import { getModelForClass, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Profile {
  @Field(() => ID)
  _id?: string

  @Field()
  @prop({ required: true })
  cards: mongoose.Types.ObjectId[]

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const ProfileModel = getModelForClass(Profile, { schemaOptions: { timestamps: true } })
