import mongoose from 'mongoose'
import { getModelForClass, prop, index } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { Card } from './Card'
import { Run } from './Run'

@ObjectType()
@index({ runId: 1, no: 1 }, { unique: true })
export class Game {
  @Field(() => ID, { nullable: true })
  id: string

  @prop({ required: true })
  runId: mongoose.Types.ObjectId

  // @Field()
  // run: Run

  @prop({ required: true })
  deckId: mongoose.Types.ObjectId

  @Field()
  @prop({ required: true })
  no: number

  @Field()
  @prop({ default: true })
  active: boolean

  @Field()
  @prop({ default: 0 })
  income: boolean

  // @Field(() => Card)
  // @prop({ default: [] })
  // dealerCards: Card[]

  // @Field(() => Card)
  // @prop({ default: [] })
  // playerCards: Card[][]

  @Field()
  @prop({ default: null })
  win: boolean

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const GameModel = getModelForClass(Game, { schemaOptions: { timestamps: true } })
