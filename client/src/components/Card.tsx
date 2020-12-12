import { Card } from '../graphql/generated'
import styled from 'styled-components'

interface Props extends Card {
  reveal?: boolean
}

const Emoji = styled.div<{ _color: string }>`
  text-shadow: 0 0 0 ${({ _color }) => _color};
`

const CardBack = styled.div`
  background: repeating-linear-gradient(45deg, transparent, transparent 8px, #2f80ed 8px, #2f80ed 18px);
`

const CardComponent: React.FC<Props> = ({ type, value, color, reveal }) => {
  return (
    <div className='h-60 w-40 bg-gray-100 rounded-xl shadow-sm'>
      {reveal ? (
        <div className='m-4 w-10 flex flex-col items-center'>
          <div className='text-3xl font-extrabold' style={{ color }}>
            {value}
          </div>
          <Emoji _color={color} className='text-lg text-transparent'>
            {type}
          </Emoji>
        </div>
      ) : (
        <CardBack className='h-56 w-38 m-2 rounded-md' />
      )}
    </div>
  )
}

CardComponent.defaultProps = {
  reveal: true,
} as Props

export default CardComponent
