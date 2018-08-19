<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="../assets/logo.png"> -->
<!-- 		<HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<Post
			v-for="post in posts"
			v-bind:key="post.id"
			v-bind:post="post"
		></Post>
	</div>

  <!-- https://stackoverflow.com/questions/45565349/how-to-acces-external-json-file-objects-in-vue-js-app -->

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import _ from 'lodash';
import Post from '@/components/Post.vue'
import postJson from '@/json/posts.json'
// import Twitter from '@/components/Twitter.vue'
// import Disqus from '@/components/Disqus.vue'

export default {
	name: 'home',
	components: {
		// HelloWorld,
		Post
	},
	data(){
		return{
			posts: _.orderBy(postJson.posts, 'date', 'desc')
		}
	}
}
</script>
