import { getModelForClass, prop, index } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { CardTypes, CardValues, CardColors } from '../types'

@ObjectType()
@index({ type: 1, value: 1 }, { unique: true })
export class Card {
  @Field(() => ID)
  id?: string

  @Field()
  @prop({ required: true, enum: CardTypes })
  type: CardTypes

  @Field()
  @prop({ required: true, enum: CardValues })
  value: CardValues

  @Field()
  @prop({ required: true, enum: CardColors })
  color: CardColors

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const CardModel = getModelForClass(Card, { schemaOptions: { timestamps: true } })
