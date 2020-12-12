import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { RunStatuses } from '../types'
import { User } from './User'
import { Game } from './Game'

@ObjectType()
export class Run {
  @Field(() => ID)
  _id?: string

  @prop({ required: true, default: 0 })
  userId: mongoose.Types.ObjectId

  @Field(() => User || null)
  user?: User

  @Field(() => Game)
  games?: Game[]

  @Field()
  @prop({ default: 0 })
  score?: number

  @Field()
  @prop({ enum: RunStatuses, default: RunStatuses.active })
  status?: RunStatuses

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const RunModel = getModelForClass(Run, { schemaOptions: { timestamps: true } })
