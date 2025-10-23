import React from 'react'

export default function SettingsIcon({ size = 20 }: { size?: number }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" fill="currentColor" />
      <path d="M19.4 13.3c.04-.4.06-.8.06-1.2s-.02-.8-.06-1.2l2.1-1.6a.5.5 0 0 0 .12-.66l-2-3.5a.5.5 0 0 0-.61-.22l-2.5 1a7.1 7.1 0 0 0-2-1.2l-.38-2.7A.5.5 0 0 0 13 1h-4a.5.5 0 0 0-.5.42l-.38 2.7a7.1 7.1 0 0 0-2 1.2l-2.5-1a.5.5 0 0 0-.61.22l-2 3.5c-.14.25-.08.56.12.66l2.1 1.6c-.04.4-.06.8-.06 1.2s.02.8.06 1.2L1.6 14.9a.5.5 0 0 0-.12.66l2 3.5c.14.25.44.34.68.22l2.5-1c.62.5 1.3.92 2 1.2l.38 2.7a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.7c.7-.28 1.38-.7 2-1.2l2.5 1c.24.12.54.03.68-.22l2-3.5a.5.5 0 0 0-.12-.66l-2.1-1.6z" fill="currentColor"/>
    </svg>
  )
}
