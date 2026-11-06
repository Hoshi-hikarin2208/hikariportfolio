const particles = [
  { x: '4%', delay: '-8s', duration: '27s', size: '11px', shape: 'petal' },
  { x: '11%', delay: '-17s', duration: '34s', size: '15px', shape: 'sparkle' },
  { x: '19%', delay: '-3s', duration: '30s', size: '8px', shape: 'petal' },
  { x: '27%', delay: '-23s', duration: '38s', size: '12px', shape: 'sparkle' },
  { x: '36%', delay: '-13s', duration: '32s', size: '9px', shape: 'petal' },
  { x: '44%', delay: '-29s', duration: '40s', size: '13px', shape: 'sparkle' },
  { x: '53%', delay: '-5s', duration: '29s', size: '10px', shape: 'petal' },
  { x: '61%', delay: '-19s', duration: '36s', size: '16px', shape: 'sparkle' },
  { x: '70%', delay: '-11s', duration: '31s', size: '8px', shape: 'petal' },
  { x: '78%', delay: '-25s', duration: '39s', size: '12px', shape: 'sparkle' },
  { x: '87%', delay: '-7s', duration: '33s', size: '10px', shape: 'petal' },
  { x: '95%', delay: '-21s', duration: '37s', size: '14px', shape: 'sparkle' },
]

export default function AnimeAtmosphere() {
  return (
    <div className="anime-atmosphere" aria-hidden="true">
      <div className="anime-starfield" />
      <div className="anime-atmosphere-glow" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className={`anime-drift ${particle.shape}`}
          style={{
            '--particle-x': particle.x,
            '--particle-delay': particle.delay,
            '--particle-duration': particle.duration,
            '--particle-size': particle.size,
          }}
        >
          {particle.shape === 'sparkle' ? '✧' : ''}
        </span>
      ))}
    </div>
  )
}
