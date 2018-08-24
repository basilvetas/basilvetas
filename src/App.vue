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
  margin-bottom: 10px;
  width: 100%;
}

@media (max-width: 767px) {
  body {

    blockquote {
      font-size: 14px;
    }
  }

  #app {
    h1, .h1 {
     font-size: 1.6rem;
    }

    h2, .h2 {
     font-size: 1.5rem;
    }

    h3, .h3 {
     font-size: 1.4rem;
    }

    h4, .h4 {
     font-size: 1.3rem;
    }

    h5, .h5 {
     font-size: 1.2rem;
    }

    h6, .h6 {
     font-size: 1.1rem;
    }

    font-size: 1rem;
  }
}

pre {
  overflow: auto;
}

</style>
