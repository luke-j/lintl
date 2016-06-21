<style rel="stylesheet/less" lang="less">
	.clipboard-copy {
		width: 180px;
	}
</style>

<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<ol class="breadcrumb">
					<li><a href="#">{{ $route.name }}</a></li>
					<li class="active">results</li>
				</ol>
				<div class="page-header clearfix">
					<h1 class="pull-left">Results</h1>
					<a href="#" v-link="'/'" class="pull-right">Return home</a>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<pre v-highlight="prettyPrint"></pre>
				<button v-if="!touch" class="btn btn-default pull-right clipboard-copy" data-clipboard-text="{{ prettyPrint }}"><i class="fa fa-download"></i> {{ state }}</button>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
import Clipboard from 'clipboard';

export default {
	props: {
		config: Object,
		title: String
	},
	data: function () {
		return {
			prettyPrint: '',
			state: 'Copy to Clipboard',
			touch: !!('ontouchstart' in window || navigator.maxTouchPoints)
		}
	},
	ready: function () {
		this.title = this.$route.name + ' - Results';
		this.format(this.$route.name);

		const clipboard = new Clipboard('.clipboard-copy'),
			reset = () => {
				setTimeout(() => {
					this.state = 'Copy to Clipboard';
				}, 3000);
			};

		clipboard.on('success', () => {
			this.state = 'Copied!';
			reset();
		});

		clipboard.on('error', () => {
			const isMac = navigator.platform.match(/(mac|iphone|ipod|ipad)/i);
			this.state = `Press ${isMac ? '⌘' : 'Ctrl'}-C to copy`;
			reset();
		});
	},
	methods: {
		format: function (type) {
			let arr = [];

			switch (type) {
				case 'jslint':
					for (const rule in this.config.rules) {
						arr.push(`${rule}: ${this.config.rules[rule]}`);
					}

					this.prettyPrint = '/*jslint ';
					this.prettyPrint += this.config.environments.length ? `${this.config.environments.join(': true, ')}: true, ` : '';
					this.prettyPrint += `${arr.join(', ')} */`;
					this.prettyPrint += this.config.globals.length ? `\n/*global ${this.config.globals.join(', ')} */` : '';
					break;
				case 'jshint':
					this.config.rules.predef = this.config.globals;
					this.config.environments.forEach((env) => {
						this.config.rules[env] = true;
					});
					this.prettyPrint = JSON.stringify(this.config.rules, null, 4);
					break;
				default:
					break;
			}

			return;
		}
	}
};
</script>