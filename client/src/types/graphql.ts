export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  players: Array<Maybe<User>>;
  me?: Maybe<User>;
  cards: Array<Maybe<Card>>;
  userRuns: Array<Run>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  runs: Array<Run>;
  username: Scalars['String'];
  roles: Array<Roles>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Run = {
  __typename?: 'Run';
  id: Scalars['ID'];
  user: User;
  games: Game;
  score: Scalars['Float'];
  status: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Game = {
  __typename?: 'Game';
  id?: Maybe<Scalars['ID']>;
  no: Scalars['Float'];
  active: Scalars['Boolean'];
  income: Scalars['Boolean'];
  win: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


/** roles for users */
export enum Roles {
  Player = 'player',
  Admin = 'admin'
}

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  type: Scalars['String'];
  value: Scalars['String'];
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup?: Maybe<User>;
  signin?: Maybe<User>;
  signout: Scalars['Boolean'];
  initCard: Array<Maybe<Card>>;
  startRun: Run;
  endRun: Run;
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSigninArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEndRunArgs = {
  runId: Scalars['String'];
};
