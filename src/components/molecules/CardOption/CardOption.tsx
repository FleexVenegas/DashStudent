import React from 'react'
import Cstyle from './CardOption.module.scss'

interface CardOptionProps{
    records?: number
    text?: string
}

const CardOption = ({records = 0, text = ""}:CardOptionProps) => {
  return (
    <div className={Cstyle.CardOption}>
        <span className={Cstyle.span1}>{records}</span>
        <span className={Cstyle.span2}>{text}</span>
    </div>
  )
}

export default CardOption