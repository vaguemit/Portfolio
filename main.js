import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// --- Lenis Smooth Scroll ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  ScrollTrigger.update()
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot')
const cursorOutline = document.querySelector('.cursor-outline')

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX
  const posY = e.clientY

  // Simple dot follow
  cursorDot.style.left = `${posX}px`
  cursorDot.style.top = `${posY}px`

  // Laggy outline follow
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" })
})

// Hover effects for cursor
const hoverables = document.querySelectorAll('a, button, .project-image')
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)'
    cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
  })
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)'
    cursorOutline.style.backgroundColor = 'transparent'
  })
})


// --- Hero Animations ---
const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

tl.from('.reveal-text', {
  y: 100,
  stagger: 0.2,
  duration: 1.2,
  delay: 0.5
})
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1
  }, '-=0.5')
  .to('.hero-location', {
    opacity: 1,
    y: 0,
    duration: 1
  }, '-=0.8')


// --- Scroll Animations ---

// Experience Items
const expItems = document.querySelectorAll('.experience-item')
expItems.forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
})

// Projects
const projects = document.querySelectorAll('.project-item')
projects.forEach((project, i) => {
  gsap.from(project, {
    scrollTrigger: {
      trigger: project,
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 1,
    },
    y: 100,
    opacity: 0.5
  })
})

// About Text Reveal
gsap.from('.about-text', {
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 70%',
  },
  y: 50,
  opacity: 0,
  duration: 1.5,
  ease: 'power3.out'
})

// --- Canvas Background (Placeholder for now) ---
const canvas = document.getElementById('hero-canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Simple star field for now
const stars = []
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    alpha: Math.random()
  })
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'

  stars.forEach(star => {
    ctx.globalAlpha = star.alpha
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fill()

    // simple movement
    star.y -= 0.5
    if (star.y < 0) star.y = canvas.height
  })

  requestAnimationFrame(animateCanvas)
}
animateCanvas()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
