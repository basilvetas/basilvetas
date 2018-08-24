<template>
	<nav>
		<b-container>
			<b-nav class="d-flex">
        <a class="mr-auto p-2 brand" href="https://twitter.com/basilvetas">@basilvetas</a>
        <b-nav-item class="p-2"><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item class="p-2"><router-link to="/about">About</router-link></b-nav-item>
      </b-nav>
		</b-container>
	</nav>
</template>

<script>
export default {
  name: 'Nav',
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
NAV
-----------------------------------------------------------------------------*/

nav {
  background: $dark-blue;
  min-height: $nav-height;
  border: none;

  a {
    font-weight: bold;
    color: $white;
    font-size: 1.2rem;
    &.router-link-exact-active {
      color: $gray;
    }
  }

  a.brand {
    margin: 5px 10px;
    font-size: 1.3rem;
  }

  @media (max-width: 767px) {
    a {
      font-size: 1rem;
    }

    a.brand {
      font-size: 1.1rem;
    }
  }
}

</style>
