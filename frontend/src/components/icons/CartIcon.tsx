import React from 'react'

export default function CartIcon({ size = 20 }: { size?: number }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6 6h15l-1.5 9h-11L6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="20" r="1" fill="currentColor"/>
      <circle cx="18" cy="20" r="1" fill="currentColor"/>
    </svg>
  )
}
