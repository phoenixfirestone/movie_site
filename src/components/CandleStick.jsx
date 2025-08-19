import React from 'react'

const CandleStick = ({candle}) => {
  return (
    <div>
    <p key={candle.date} className='text-white'>{candle.value}</p>
    </div>
  )
}

export default CandleStick