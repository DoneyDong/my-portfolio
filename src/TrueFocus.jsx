import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import './TrueFocus.css'

export default function TrueFocus({
  sentence = 'True Focus', separator = ' ', manualMode = false, blurAmount = 3.5,
  borderColor = '#111111', glowColor = 'rgba(17, 17, 17, .22)', animationDuration = .2, pauseBetweenAnimations = 1,
}) {
  const words = sentence.split(separator)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState(null)
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    if (manualMode) return undefined
    const interval = setInterval(() => setCurrentIndex(previous => (previous + 1) % words.length), (animationDuration + pauseBetweenAnimations) * 1000)
    return () => clearInterval(interval)
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length])

  useEffect(() => {
    if (currentIndex === null || !wordRefs.current[currentIndex] || !containerRef.current) return
    const parentRect = containerRef.current.getBoundingClientRect()
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect()
    setFocusRect({ x: activeRect.left - parentRect.left, y: activeRect.top - parentRect.top, width: activeRect.width, height: activeRect.height })
  }, [currentIndex, words.length])

  const activate = index => {
    if (!manualMode) return
    setLastActiveIndex(index)
    setCurrentIndex(index)
  }

  return <span className="focus-container" ref={containerRef}>
    {words.map((word, index) => <span key={`${word}-${index}`} ref={element => { wordRefs.current[index] = element }} className="focus-word" style={{ filter: currentIndex === index ? 'blur(0)' : `blur(${blurAmount}px)`, '--border-color': borderColor, '--glow-color': glowColor, transition: `filter ${animationDuration}s ease` }} onMouseEnter={() => activate(index)} onMouseLeave={() => manualMode && setCurrentIndex(lastActiveIndex)}>{word}</span>)}
    <motion.span className="focus-frame" animate={{ x: focusRect.x, y: focusRect.y, width: focusRect.width, height: focusRect.height, opacity: currentIndex >= 0 ? 1 : 0 }} transition={{ duration: animationDuration }} style={{ '--border-color': borderColor, '--glow-color': glowColor }}><i className="corner top-left" /><i className="corner top-right" /><i className="corner bottom-left" /><i className="corner bottom-right" /></motion.span>
  </span>
}
