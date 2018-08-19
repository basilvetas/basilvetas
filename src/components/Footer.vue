<template>
	<footer>
    <b-container>
      <h6>&copy; Copyright {{ new Date().getFullYear() }} Basil Vetas &nbsp;|&nbsp; All rights reserved</h6>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped lang="scss">

$font-stack: Arial, Helvetica, sans-serif;
$black: #000000;
$white: #FFFFFF;
$gray: #EEEEEE;
$dark-blue: #003366;
$nav-height: 60px;
$footer-height: 60px;

/*-----------------------------------------------------------------------------
FOOTER
-----------------------------------------------------------------------------*/

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $footer-height;
  background-color: $dark-blue;
  color: $white;

  h6 {
    margin: 20px;
    font-weight: bold;
  }
}

</style>
