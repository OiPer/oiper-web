'use client'

import { useEffect, useRef, useState } from 'react'

const phrases = [
  { top: 'Type at the speed', bottom: 'of speech.', bottomAccent: 'speech.' },
  { top: 'Your voice turns', topAccent: 'voice', bottom: 'into text.' },
  { top: 'Talk faster than', bottom: 'you can type.', bottomAccent: 'type.' },
  { top: 'Speak it and watch', topAccent: 'Speak', bottom: 'it appear.' },
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function ScrambleText({
  text,
  accent,
  className,
}: {
  text: string
  accent?: string
  className: string
}) {
  const [display, setDisplay] = useState(text)
  const previousText = useRef(text)
  const rafRef = useRef(0)

  useEffect(() => {
    const from = previousText.current
    previousText.current = text

    if (from === text) return

    const length = Math.max(from.length, text.length)
    const queue = Array.from({ length }, (_, i) => {
      const start = Math.floor(Math.random() * 14)
      return {
        from: from[i] ?? '',
        to: text[i] ?? '',
        start,
        end: start + 8 + Math.floor(Math.random() * 12),
        char: '',
      }
    })

    let frame = 0

    function update() {
      let output = ''
      let complete = 0

      for (const item of queue) {
        if (item.to === ' ') {
          output += ' '
          complete += 1
        } else if (frame >= item.end) {
          output += item.to
          complete += 1
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.12) {
            item.char = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          output += item.char
        } else {
          output += item.from
        }
      }

      setDisplay(output)

      if (complete === queue.length) return

      frame += 1
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)

    return () => cancelAnimationFrame(rafRef.current)
  }, [text])

  const accentStart = accent ? text.indexOf(accent) : -1

  if (accentStart < 0) {
    return <span className={className}>{display}</span>
  }

  const accentEnd = accentStart + accent!.length

  return (
    <span className={className}>
      {display.slice(0, accentStart)}
      <span className="text-white/40">
        {display.slice(accentStart, accentEnd)}
      </span>
      {display.slice(accentEnd)}
    </span>
  )
}

export function AnimatedHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const phrase = phrases[index]

  return (
    <h1 className="text-[3.25rem] leading-[1.05] font-semibold tracking-[-0.04em] text-white sm:text-[5.25rem]">
      <ScrambleText
        text={phrase.top}
        accent={phrase.topAccent}
        className="block whitespace-nowrap"
      />
      <ScrambleText
        text={phrase.bottom}
        accent={phrase.bottomAccent}
        className="block whitespace-nowrap"
      />
    </h1>
  )
}
