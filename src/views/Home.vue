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
