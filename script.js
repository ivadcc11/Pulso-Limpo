// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  nav.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    nav.classList.remove("active")
  })
})

// Header scroll effect
const header = document.getElementById("header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.background = `rgba(255, 255, 255, ${Math.min(currentScroll / 500, 0.98)})`
    header.style.boxShadow = `0 4px ${Math.min(currentScroll / 10, 20)}px rgba(0, 0, 0, 0.15)`
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  }

  lastScroll = currentScroll

  const hero = document.querySelector(".hero")

  if (hero && currentScroll < window.innerHeight) {
    hero.style.transform = `translateY(${currentScroll * 0.5}px)`
  }

  const sections = document.querySelectorAll(".about-section, .testimonials-section, .contact-section")
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight

    if (scrollPercent > 0 && scrollPercent < 1) {
      section.style.transform = `translateY(${scrollPercent * -20}px)`
    }
  })
})

// Form submission
const recoveryForm = document.getElementById("recoveryForm")
const formSuccess = document.getElementById("formSuccess")

recoveryForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(recoveryForm)
  const data = Object.fromEntries(formData)

  console.log("[v0] Form submitted with data:", data)

  // Here you would typically send the data to a server
  // For now, we'll just show the success message

  // Hide form and show success message
  recoveryForm.style.display = "none"
  formSuccess.classList.add("show")

  // Scroll to success message
  formSuccess.scrollIntoView({ behavior: "smooth", block: "center" })

  // Optional: Reset form after 5 seconds and show it again
  setTimeout(() => {
    recoveryForm.reset()
    recoveryForm.style.display = "block"
    formSuccess.classList.remove("show")
  }, 5000)
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".testimonial-card, .feature-item, .contact-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

const scrollRevealElements = document.querySelectorAll(
  ".section-header, .form, .about-content, .about-image, .testimonial-card, .feature-item, .contact-item, .contact-cta",
)

const scrollRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const animations = [
            "scroll-reveal",
            "scroll-reveal-left",
            "scroll-reveal-right",
            "scroll-reveal-zoom",
            "scroll-reveal-rotate",
          ]
          const randomAnimation = animations[Math.floor(Math.random() * animations.length)]

          entry.target.classList.add(randomAnimation, "revealed")
        }, index * 100)
        scrollRevealObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

scrollRevealElements.forEach((el) => {
  scrollRevealObserver.observe(el)
})

function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = Math.floor(target)
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

const cards = document.querySelectorAll(".testimonial-card, .feature-item, .contact-item")

cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
  })

  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = ""
  })
})

// Floating animation to form labels
const formLabels = document.querySelectorAll(".form-label")
formLabels.forEach((label, index) => {
  label.style.animation = `float 3s ease-in-out infinite ${index * 0.2}s`
})

// Staggered fade-in for testimonial cards
const testimonialCards = document.querySelectorAll(".testimonial-card")
testimonialCards.forEach((card, index) => {
  card.style.opacity = "0"
  card.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`
})

// Hover sound effect simulation (visual feedback)
const interactiveElements = document.querySelectorAll(".btn, .nav-link, .contact-item, .feature-item")
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  })
})

const progressBar = document.createElement("div")
progressBar.style.position = "fixed"
progressBar.style.top = "0"
progressBar.style.left = "0"
progressBar.style.height = "4px"
progressBar.style.background = "linear-gradient(90deg, var(--color-accent), var(--color-primary))"
progressBar.style.zIndex = "9999"
progressBar.style.transition = "width 0.1s ease"
document.body.appendChild(progressBar)

window.addEventListener("scroll", () => {
  const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  progressBar.style.width = scrollPercent + "%"
})

  

const heroTitle = document.querySelector(".hero-title")
if (heroTitle) {
  const text = heroTitle.textContent
  heroTitle.textContent = ""
  heroTitle.style.borderRight = "3px solid var(--color-white)"
  heroTitle.style.whiteSpace = "nowrap"
  heroTitle.style.overflow = "hidden"

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 50)
    } else {
      heroTitle.style.borderRight = "none"
      heroTitle.style.whiteSpace = "normal"
    }
  }

  setTimeout(typeWriter, 1000)
}

// Magnetic effect to buttons
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = ""
  })

  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255, 255, 255, 0.5)"
    ripple.style.transform = "scale(0)"
    ripple.style.animation = "ripple 0.6s ease-out"
    ripple.style.pointerEvents = "none"

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes particles {
    to { opacity: 0; transform: translate(-50%, -50%) scale(2); }
  }
`
document.head.appendChild(style)

// Images opacity transition on load
const images = document.querySelectorAll("img")

images.forEach((img) => {
  img.style.opacity = "0"
  img.style.transition = "opacity 0.6s ease"

  img.addEventListener("load", function () {
    this.style.opacity = "1"
  })

  if (img.complete) {
    img.style.opacity = "1"
  }
})
