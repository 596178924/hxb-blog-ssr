import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollToPlugin
    }
  }
})
