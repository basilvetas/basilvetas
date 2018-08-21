<template>
  <div id="app">
    <Nav/>
    <router-view/>
    <!-- <Footer/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
// import gaConfig from '@/json/ga-config.json'
// import fbConfig from '@/json/fb-config.json'

export default {
  components: {
    Nav,
    Footer
  }
}
</script>

<style lang="scss">

$font-stack: Arial, Helvetica, sans-serif;
$black: #000000;
$white: #FFFFFF;
$gray: #EEEEEE;
$dark-blue: #003366;
$nav-height: 60px;
$footer-height: 60px;

/*-----------------------------------------------------------------------------
BASE
-----------------------------------------------------------------------------*/

/* For sticky footer */
html {
  position: relative;
  min-height: 100%;
}
body {
  word-wrap: break-word;
  margin-bottom: $footer-height; // uncomment if footer is included
}

#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.2rem;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

@media (max-width: 767px) {
  body {
    font-size: 14px;

    blockquote {
      font-size: 14px;
    }
  }

  h1 {
   font-size: 28px;
  }
}

pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

</style>
