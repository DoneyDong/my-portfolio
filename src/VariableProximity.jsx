import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import './VariableProximity.css'

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId
    const loop = () => {
      callback()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [callback])
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const updatePosition = (x, y) => {
      if (!containerRef?.current) return
      const rect = containerRef.current.getBoundingClientRect()
      positionRef.current = { x: x - rect.left, y: y - rect.top }
    }
    const handleMouseMove = event => updatePosition(event.clientX, event.clientY)
    const handleTouchMove = event => {
      const touch = event.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])
  return positionRef
}

const VariableProximity = forwardRef(function VariableProximity({
  label,
  fromFontVariationSettings = "'wght' 400, 'opsz' 9",
  toFontVariationSettings = "'wght' 1000, 'opsz' 40",
  containerRef,
  radius = 280,
  falloff = 'exponential',
  className = '',
  ...restProps
}, ref) {
  const letterRefs = useRef([])
  const mousePositionRef = useMousePositionRef(containerRef)
  const lastPositionRef = useRef({ x: null, y: null })
  const parsedSettings = useMemo(() => {
    const parse = value => new Map(value.split(',').map(item => item.trim()).map(item => {
      const [axis, number] = item.split(' ')
      return [axis.replace(/['"]/g, ''), parseFloat(number)]
    }))
    const from = parse(fromFontVariationSettings)
    const to = parse(toFontVariationSettings)
    return Array.from(from.entries()).map(([axis, fromValue]) => ({ axis, fromValue, toValue: to.get(axis) ?? fromValue }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  useAnimationFrame(() => {
    if (!containerRef?.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const { x, y } = mousePositionRef.current
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return
    lastPositionRef.current = { x, y }
    letterRefs.current.forEach(letter => {
      if (!letter) return
      const rect = letter.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2 - containerRect.left
      const centerY = rect.top + rect.height / 2 - containerRect.top
      const distance = Math.hypot(x - centerX, y - centerY)
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
      const amount = falloff === 'gaussian' ? Math.exp(-((distance / (radius / 2)) ** 2) / 2) : falloff === 'exponential' ? norm ** 2 : norm
      const settings = parsedSettings.map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * amount}`).join(', ')
      letter.style.fontVariationSettings = settings
      letter.style.transform = `translateY(${-amount * 5}px) scale(${1 + amount * .055})`
    })
  })

  let index = 0
  return <span ref={ref} className={`variable-proximity ${className}`} {...restProps}>
    {label.split('').map(character => {
      const currentIndex = index++
      return <motion.span key={currentIndex} ref={element => { letterRefs.current[currentIndex] = element }} aria-hidden="true">{character}</motion.span>
    })}
    <span className="sr-only">{label}</span>
  </span>
})

export default VariableProximity
