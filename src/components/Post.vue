<template>
	<b-container>
		<div v-if="ready">
			<!-- Title -->
			<a :href="`/post/${postContent.path}`"><h1>{{postContent.title}}</h1></a>

			<!-- Image -->
			<img :src="`images/${postContent.image}`"/>

			<!-- Content -->
			<div v-html="postContent.body"></div>

			<div class="subtext">
				<!-- Date -->
				<span>Posted: <a :href="`/post/${postContent.path}`">{{postContent.date}}</a></span>
				<!-- | formatDate -->

				<!-- Sources -->
				<div v-if="postContent.sources">
					Sources:
					<span v-for="(source, index) in postContent.sources" :key="index">
						<a :href="source.link" target="_blank">{{source.author}}</a><span v-if="index != postContent.sources.length - 1">, </span>
					</span>
				</div>

				<!-- Tags -->
				<span v-if="postContent.tags">
					Tags:
					<span v-for="(tag, index) in postContent.tags" :key="index">
						<a href>{{tag}}</a><span v-if="index != postContent.tags.length - 1">, </span>
					</span>
				</span>
			</div>
		</div>
	</b-container>
</template>

<script>
import _ from 'lodash';

function htmlDecode(text){
	var el = document.createElement('div');
	el.innerHTML = text;
	return el.childNodes.length === 0 ? "" : el.childNodes[0].nodeValue;
}

export default {
	name: 'Post',
	props: ['post'],
	data: function() {
		return {
			ready: this.ready,
			postContent: this.postContent
		}
	},
	created: function() {
		this.ready = false
		this.$http.get(process.env.BASE_URL + 'posts/' + this.post.path + '.txt').then(response => { // success
			var title = '';
			var body = '';

			// format post contents
			_.each(response.body.split("\n\n"), function(snippet, index) {

				snippet = snippet.trim();
				if(index == 0) {
					title = snippet;
				}
				else {
					body += snippet;
				}
			});

			this.postContent = {
				title: title,
				date: this.post.date || null,
				body: htmlDecode(body),
				path: this.post.path,
				tags: this.post.tags,
				image: this.post.image || null,
				sources: this.post.sources || null
			};

			this.ready = true

		}, err => { // error
			console.log(err)
		});
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
POST
-----------------------------------------------------------------------------*/

.subtext {
  margin: 20px 0 80px 0;
  font-style: italic;
}

</style>
