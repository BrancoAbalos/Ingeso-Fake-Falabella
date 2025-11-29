import React from 'react'

export default function CartIcon({ size = 20, count = 0 }: { size?: number, count?: number }){
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6h15l-1.5 9h-11L6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20" r="1" fill="currentColor"/>
        <circle cx="18" cy="20" r="1" fill="currentColor"/>
      </svg>
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            minWidth: 18,
            height: 18,
            borderRadius: '50%',
            backgroundColor: '#e63946',
            color: '#fff',
            fontSize: 11,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            padding: '0 4px',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      )}
    </span>
  )
}
