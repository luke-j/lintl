<template>
    <div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="page-header">
					<h2>Choose the config you want to generate...</h2>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-md-6 col-md-offset-3">
				<button v-on:click="goto('jshint')" type="button" class="btn btn-primary btn-lg btn-block">Generate <strong>JSHint</strong> Configuration</button>
				<small class="center-block text-center text-muted">Aprox. 40 rules</small>
				<hr>
				<button v-on:click="goto('jslint')" type="button" class="btn btn-primary btn-lg btn-block">Generate <strong>JSLint</strong> Configuration</button>
				<small class="center-block text-center text-muted">Aprox. 7 rules</small>
				<hr>
				<button class="btn btn-primary btn-lg btn-block" disabled>Generate <strong>ESLint</strong> Configuration - Coming soon!</button>
				<small class="center-block text-center text-muted">Aprox. 200 rules</small>
			</div>
		</div>
	</div>
</template>
<script type="text/babel">
	import Store from '../store/Store';

	export default {
		props: {
			config: Object,
			title: String
		},
		ready: function () {
			this.title = 'Lintl';
		},
		methods: {
			goto: function (type) {
				Store.clear();
				this.config = {
					environments: [],
					rules: {},
					globals: [],
					counter: 0
				};
				this.$router.go({path: `/${type}/environments`});
			}
		}
	};
</script>