import { CARDS } from '../apollo/queries'
import { client } from '../apollo/client'
import { Card } from '../types/graphql'
import CardComponent from '../components/Card'
import styled from 'styled-components'

const CardPageConatiner = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 10px;
  padding: 10px;
`

interface Props {
  cards: Card[]
}

const CardPage = ({ cards }: Props) => {
  return (
    <CardPageConatiner>
      {cards.map((card, index) => (
        <CardComponent key={index} {...card} reveal={index !== 0} />
      ))}
    </CardPageConatiner>
  )
}

export const getStaticProps = async () => {
  const res = await client.request(CARDS)
  console.log(res.cards[0])
  return {
    props: {
      cards: res.cards,
    },
  }
}

export default CardPage
