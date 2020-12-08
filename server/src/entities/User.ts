import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { Roles } from '../types'
import { Run } from './Run'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => [Run])
  runs?: Run[]

  @Field()
  @prop({ required: true, trim: true, unique: true, lowercase: true })
  username: string

  @prop({ required: true, trim: true })
  password: string

  @prop({ required: true, default: 0 })
  tokenVersion: number

  @Field(() => [Roles])
  @prop({ type: String, required: true, enum: Roles, default: [Roles.player] })
  roles?: Roles[]

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } })
