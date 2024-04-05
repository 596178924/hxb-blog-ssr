<template>
  <div class="controls">
    <label for="driver">Show Driving Element?</label>
    <input type="checkbox" name="driver" />
  </div>
  <header>
    <h1>Scroll 👇</h1>
  </header>
  <main>
    <section>
      <p>
        <span contenteditable>Responsive Animated Text Reveals with CSS Scroll-Driven Animations.</span>
      </p>
    </section>
  </main>
  <footer>
    <h2>fin.</h2>
  </footer>
</template>

<script setup lang="ts">
import useGsap from '~/hooks/useGsap'

const { gsap, ScrollTrigger } = useGsap()
const containerDom = ref<HTMLElement>()
onMounted(() => {
  runAnima()
})
function runAnima() {
  if (!CSS.supports('animation-timeline: scroll()') && matchMedia('(prefers-reduced-motion: no-preference)')) {
    gsap.registerPlugin(ScrollTrigger)

    const scrub = 0.5
    const trigger = 'main'

    gsap.set('p > span', {
      '--progress': 0,
      backgroundPositionX: 'calc(-200vmax + (var(--progress) * 200vmax)), calc(-200vmax + (var(--progress) * 200vmax)), 0',
      color: 'transparent'
    })
    gsap.to('p > span', {
      '--progress': 1,
      scrollTrigger: {
        trigger,
        scrub,
        start: 'top top',
        end: 'top top-=75%'
      }
    })
    gsap.to('p > span', {
      color: 'white',
      scrollTrigger: {
        trigger,
        scrub,
        start: 'top top-=75%',
        end: 'bottom bottom'
      }
    })
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Geist Sans';
  src: url('https://assets.codepen.io/605876/GeistVF.ttf') format('truetype');
}

:root {
  --bg: hsl(0 0% 2%);
  --color: hsl(0 0% 100% / 0.1);
  --underline-width: 1lh;
  --underline-block-width: 200vmax;
  --underline-color: hsl(0 0% 50% / 0.15);
  --underline-color-hover: hsl(180 100% 50% / 1);
  --underline-transition: 5s;
  --finish-fill: hsl(0 0% 100%);
  --accent: hsl(0 0% 100%);
  --fill: hsl(0 0% 50%);
}

body {
  background-color: var(--bg);
  color: var(--color);
  font-family: 'Geist Sans', sans-serif;
  font-weight: bold;
  accent-color: red;
  overflow-x: hidden;
  font-weight: 120;
}

:root:has([name='driver']:checked) main {
  outline: 1rem dashed hsl(0 80% 50% / 0.5);
  background: hsl(0 80% 50% / 0.1);
}

header,
footer {
  height: 100vh;
  color: var(--finish-fill);
  display: grid;
  place-items: center;
  font-size: clamp(2rem, 4vw + 1rem, 12rem);
}

h1,
h2 {
  font-weight: 120;
  background: linear-gradient(var(--finish-fill), var(--fill));
  background-clip: text;
  color: transparent;
  /*  text-transform: uppercase;*/
}

.controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 2rem;
  border-radius: 100px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: hsl(0 0% 90%);
  color: hsl(0 0% 10%);
}

p {
  resize: both;
  max-width: 70vw;
  overflow: hidden;
  padding: 10ch;
  margin: 0;
}

p > span {
  outline-color: hsl(10 80% 50%);
  outline-offset: 1ch;
  font-size: clamp(3rem, 4vw + 1rem, 10rem);
  color: var(--color);
  text-decoration: none;
  background-image:
		/* First one is the highlight */ linear-gradient(90deg, transparent calc(100% - 8ch), var(--accent) calc(100% - 8ch)), linear-gradient(90deg, var(--fill), var(--fill)),
    linear-gradient(90deg, var(--underline-color), var(--underline-color));
  background-size:
    var(--underline-block-width) var(--underline-width),
    var(--underline-block-width) var(--underline-width),
    100% var(--underline-width);
  background-repeat: no-repeat;
  background-position-x: 0;
  background-position-y: 100%;
  background-clip: text;
  color: var(--finish-fill);
}

/*p > span {
  background-clip: unset;
  color: transparent;
  background-position-x: -200vmax, -200vmax, 0;
  animation: fill-up 4s infinite linear;
}

@keyframes fill-up {
  to { background-position-x: 0, 0, 0; }
}*/

main {
  height: 200vh;
}

section {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    main {
      view-timeline-name: --section;
    }

    p > span {
      background-position-x: calc(var(--underline-block-width) * -1), calc(var(--underline-block-width) * -1), 0;
      color: transparent;
      animation-name: fill-up, color-in;
      animation-fill-mode: both;
      animation-timing-function: linear;
      animation-timeline: --section;
      animation-range:
        entry 100% cover 50%,
        cover 50% exit 0%;
    }

    @keyframes fill-up {
      to {
        background-position-x: 0, 0, 0;
      }
    }

    @keyframes color-in {
      to {
        color: var(--finish-fill);
      }
    }
  }
}
</style>
