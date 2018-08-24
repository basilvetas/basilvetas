<template>
	<b-container class="pt-5 px-5">
		<b-row class="px-5">
			<b-col class="px-5">
				<div v-if="ready">
					<!-- Title -->
					<div v-html="about.title"></div>

					<!-- Content -->
					<div v-html="about.body"></div>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import showdown from 'showdown';

export default {
	name: 'About',
	data: function() {
		return {
			ready: this.ready
		}
	},
	created: function() {
		this.ready = false
		this.$http.get(process.env.BASE_URL + 'posts/about.md').then(response => { // success
			var converter = new showdown.Converter()
			var snippets = response.body.split("\n\n")
			var title = converter.makeHtml(snippets.shift())
			var body = converter.makeHtml(snippets.join("\n\n"))

			this.about = {
				title: title,
				body: body
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
ABOUT
-----------------------------------------------------------------------------*/

@media (max-width: 991px) {
  .px-5 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

</style>
