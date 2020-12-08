import { Response, Request } from 'express'
import { registerEnumType } from 'type-graphql'

export enum RunStatuses {
  active = 'ACTIVE',
  completed = 'COMPLETED',
  cancelled = 'CANCELLED',
}

export enum Actions {
  draw = 'DRAW',
  reveal = 'REVEAL',
  hit = 'HIT',
  stand = 'STAND',
  double = 'DOUBLE_DOWN',
  split = 'SPLIT',
}

export enum CardTypes {
  heart = '♥️',
  diamond = '♦️',
  club = '♣️',
  spade = '♠️',
}

export enum CardColors {
  red = '#F24822',
  black = '#1A1919',
}

export enum CardValues {
  ace = 'A',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten = '10',
  jack = 'J',
  queen = 'Q',
  king = 'K',
}

export enum Roles {
  player = 'PLAYER',
  admin = 'ADMIN',
}

registerEnumType(Roles, { name: 'Roles', description: 'roles for users' })

export interface AppRequest extends Request {
  userId?: string
  tokenVersion?: number
}

export interface AppContext {
  req: AppRequest
  res: Response
}

export interface Token {
  userId: string
  tokenVersion: number
  iat: number
  exp: number
}
