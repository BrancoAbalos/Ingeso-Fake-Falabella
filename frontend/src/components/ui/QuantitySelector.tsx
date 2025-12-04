import React, { useEffect, useState } from 'react'

type Props = {
  value?: number
  onChange?: (next: number) => void
  min?: number
  max?: number
}

export default function QuantitySelector({ value = 1, onChange, min = 0, max = 99 }: Props){
  const [internal, setInternal] = useState<number>(value)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    setInternal(value)
  }, [value])

  const triggerPulse = () => {
    setPulse(true)
    window.setTimeout(() => setPulse(false), 160)
  }

  const dec = () => {
    const next = Math.max(min, (internal ?? 1) - 1)
    setInternal(next)
    onChange && onChange(next)
    triggerPulse()
  }

  const inc = () => {
    const next = Math.min(max, (internal ?? 1) + 1)
    setInternal(next)
    onChange && onChange(next)
    triggerPulse()
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let n = parseInt(e.target.value || '0', 10)
    if (Number.isNaN(n)) n = min
    n = Math.max(min, Math.min(max, n))
    setInternal(n)
    onChange && onChange(n)
    triggerPulse()
  }

  return (
    <div className="quantity-selector inline-flex items-center gap-2">
      <button aria-label="disminuir" onClick={dec} className="px-3 py-1 bg-gray-200 rounded-md">-</button>
      <input
        aria-label="cantidad"
        type="number"
        value={internal}
        min={min}
        max={max}
        onChange={onInput}
        className={`w-14 text-center border rounded-md px-1 py-1 transition-transform duration-150 ${pulse ? 'scale-105' : 'scale-100'}`}
      />
      <button aria-label="aumentar" onClick={inc} className="px-3 py-1 bg-gray-200 rounded-md">+</button>
    </div>
  )
}
