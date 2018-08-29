<template>
	<b-container class="pt-5 px-5">
		<b-row class="px-5">
			<b-col class="px-5">
				<div v-if="ready">
					<!-- Title -->
					<a :href="`/post/${postContent.path}`"><span v-html="postContent.title"></span></a>

					<!-- Image -->
					<img :src="`images/headers/${postContent.image}`"/>

					<!-- Dynamic Content -->
					<div>
						<v-runtime-template :template="postContent.body"/>
					</div>

					<div class="subtext">
						<!-- Date -->
						<span>Posted: <a :href="`/post/${postContent.path}`">{{postContent.date | moment("MMMM Do YYYY") }}</a></span>

						<!-- Sources -->
						<div v-if="postContent.sources">
							Sources:
							<span v-for="(source, index) in postContent.sources" :key="index">
								<a :href="source.link" target="_blank">{{source.title}}</a><span v-if="index != postContent.sources.length - 1">, </span>
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

					<div v-if="$route.name != 'home'">
						<Disqus shortname="basilvetas" :identifier="postContent.path" :url="`https://basilvetas.com/post/${postContent.path}`"></Disqus>
					</div>

				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template"
import Disqus from '@/components/Disqus.vue'
import showdown from 'showdown';

export default {
	name: 'Post',
	props: ['post'],
	data: function() {
		return {
			ready: this.ready,
			postContent: this.postContent,
			// added to fix error: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties
			prediction: '',
			confidence: '',
			url: '',
		}
	},
	created: function() {
		this.ready = false
		this.$http.get(process.env.BASE_URL + 'posts/' + this.post.path + '.md').then(response => { // success
			var converter = new showdown.Converter({tables: true})
			var snippets = response.body.split("\n\n")
			var title = converter.makeHtml(snippets.shift())

			// runtime templates need to have a single root element for rendering
			var body = "<div>" + converter.makeHtml(snippets.join("\n\n")) + "</div>"

			// for syntax highlighting in code blocks
			body = body.replace(/<pre>/g, '<pre v-highlightjs>')

			// add bootstrap tags to tables for styling
			body = body.replace(/<table>/g, '<table class="table table-responsive-md table-sm table-striped table-bordered">')

			// note posts.md use ../ to display images in Github which is hacky but
			// works since they are at top level. Might need to drop the ../ here in
			// the future for production if this breaks later on

			this.postContent = {
				title: title,
				date: this.post.date || null,
				body: body,
				path: this.post.path,
				tags: this.post.tags,
				image: this.post.image || null,
				sources: this.post.sources || null
			};

			this.ready = true

		}, err => { // error
			console.log(err)
		});
	},
	components: {
		VRuntimeTemplate,
		Disqus
	}
};
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

@media (max-width: 991px) {
  .px-5 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

</style>
