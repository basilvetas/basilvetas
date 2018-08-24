<template>
		<div class="home">
			<Post
				v-for="post in posts"
				v-bind:key="post.id"
				v-bind:post="post"
			></Post>
		</div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash';
import Post from '@/components/Post.vue'
import postJson from '@/json/posts.json'
// import Twitter from '@/components/Twitter.vue'

export default {
	name: 'home',
	components: {
		Post
	},
	data(){
		return{
			posts: _.orderBy(postJson.posts, 'date', 'desc')
		}
	}
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
HOME
-----------------------------------------------------------------------------*/

@media (max-width: 991px) {
  .px-5 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

</style>