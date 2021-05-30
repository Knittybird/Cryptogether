import React from 'react'
import './ColorNum.css'

interface ColorNumProps {
  value: string|number,
  prefix?: string,
  suffix?: string
}

function ColorNum(props: ColorNumProps) {

  const positive = (props.value >= 0)
  return (
    <span className={positive ? "positive" : "negative"}>
      {props.prefix ? props.prefix : ''}
      {props.value}
      {props.suffix ? props.suffix : ''}
    </span>
  )
}

export default ColorNum