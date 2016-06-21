<template>
	<div class="container">
					<div class="row">
						<div class="col-xs-12">
							<ol class="breadcrumb">
								  <li><a href="#">{{ $route.name }}</a></li>
								  <li class="active">global variables</li>
							</ol>
							<div class="page-header">
								<h1>Global Variables</h1>
								<a href="#" v-link="'/' + $route.name + '/environments'"><i class="fa fa-chevron-left"></i> Return to environments</a>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<p class="lead">List the global variables you want to define</p>
							<hr>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<div class="form-group">
								<textarea v-model="globals" v-on:blur="setGlobals" class="form-control" placeholder="global-one, global-two, global-three..."></textarea>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<a href="#" v-on:click="continue" class="btn btn-primary pull-right">Continue...</a>
						</div>
					</div>
				</div>
</template>

<script type="text/babel">
	export default {
		props: {
			config: Object,
			title: String
		},
		data: function () {
			return {
				globals: this.config.globals.join(', ')
			}
		},
		ready: function () {
			this.title = this.$route.name + ' - Globals';
		},
		methods: {
			setGlobals: function () {
				this.globals.split(',').forEach((val) => {
					this.config.globals.indexOf(val.trim()) === -1 && this.config.globals.push(val.trim());
			});
			},
			continue: function() {
				this.$router.go({path: `/${this.$route.name}`});
			}
		}
	};
</script>