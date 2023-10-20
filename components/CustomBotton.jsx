'use client';

import React from 'react'

const CustomBotton = ({title, containerStyles, handleClick}) => {
   
  return (
    <button
    disabled={false}
    type={"button"}
    className={`custom-btn ${containerStyles}`}
    onClick={() => {}}
    >
        <span className={`flex-1`}>
            {title}
        </span>
    </button>
  )
}

export default CustomBotton