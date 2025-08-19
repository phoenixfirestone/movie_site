import React from 'react'

const CandleStick = ({candle : {date , value}}) => {
  return (
    <div className="movie-card">
    <p className='text-white'>{value}</p>
    </div>
  )
}

export default CandleStick