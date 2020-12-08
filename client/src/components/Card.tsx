import { Card } from '../types/graphql'
import styled from 'styled-components'

interface Props extends Card {
  reveal?: boolean
}

const Main = styled.div`
  height: 180px;
  width: 130px;
  background: #f2f2f2;
  border: 1px solid #d2d2d2;
  background-image: url('https://inspirationhut.net/wp-content/uploads/2014/09/grey-paper-texture.jpg');
  background-repeat: repeat;
  box-sizing: border-box;
  box-shadow: 0px 5px 34px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  .content {
    margin-top: 8px;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .value {
      color: ${({ color }) => color};
      font-size: 40px;
      font-weight: 700;
    }
    .type {
      font-size: 20px;
      fill: ${({ color }) => color};
      color: transparent;
      text-shadow: 0 0 0 ${({ color }) => color};
    }
  }
  .back {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background: repeating-linear-gradient(45deg, transparent, transparent 8px, #2f80ed 8px, #2f80ed 18px);
    margin: 10px;
  }
`

const CardComponent: React.FC<Props> = ({ type, value, color, reveal }) => {
  return (
    <Main color={color}>
      {reveal ? (
        <div className='content'>
          <div className='value'>{value}</div>
          <div className='type'>{type}</div>
        </div>
      ) : (
        <>
          <div className='back' />
        </>
      )}
    </Main>
  )
}

CardComponent.defaultProps = {
  reveal: true,
} as Props

export default CardComponent
