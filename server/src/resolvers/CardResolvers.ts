import { Mutation, Query, Resolver } from 'type-graphql'
import { Card, CardModel } from '../entities/Card'
import { CardTypes, CardValues, CardColors } from '../types'

@Resolver()
export class CardResolvers {
  @Query(() => [Card], { nullable: 'items' })
  async cards(): Promise<Card[]> {
    try {
      const cards = await CardModel.find().sort({ type: 1, value: 1 })
      return cards
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => [Card], { nullable: 'items' })
  async initCard(): Promise<Card[]> {
    try {
      const cards: Card[] = []
      Object.values(CardTypes).forEach((type) => {
        const color = [CardTypes.heart, CardTypes.diamond].includes(type) ? CardColors.red : CardColors.black
        Object.values(CardValues).forEach((value) => {
          const card = { type, value, color }
          cards.push(card)
        })
      })
      await CardModel.remove()
      const insertedCards = await CardModel.create(cards)
      return insertedCards || []
    } catch (error) {
      throw error
    }
  }
}
