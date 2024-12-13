import React from 'react'

const Button = ({ buttonText, buttonClassName }) => {

  return <button className={`custom-btn ${buttonClassName}`}>{buttonText}</button>
}

export default Button
