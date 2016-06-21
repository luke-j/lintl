<style rel="stylesheet/less" lang="less">
	code {
		min-height: 80px;
	}

	pre {
		color: red;
		font-size: 12px;
		font-family: Menlo, 'Andale Mono', Consolas, Monaco, monospace;
		line-height: 18px;
		opacity: 0;

		&.option {
			cursor: pointer;
			transition: all 300ms ease;

			& + div {
				transition: all 300ms ease;
				opacity: 0;
				position: absolute;
				top: ~"calc(50% - 20px)";
				left: 0;
				right: 0;
				cursor: pointer;
				pointer-events: none;
				padding: 0;
				text-align: center;

				& i {
					&:before {
						font-size: 25px;
					}
				}
			}
		}

		&.option:hover {
			opacity: .2;

			& + div {
				opacity: 1;
			}
		}
	}

	.skip {
		display: block;
		margin-top: 40px;
	}

	.permalink {
		opacity: 0;
		position: absolute;
		left: -10px;
		top: 95px;
		font-size: 24px;

		&:hover {
			opacity: 1;
		}
	}

	h1:hover {
		& + .permalink {
			opacity: 1;
		}
	}

	textarea {
		resize: vertical;

		&.result {
			height: 300px;
		}
	}

	.hljs {
		opacity: 1;
		padding: 9.5px;
	}
</style>

<template>
    <div class="container">
		<div class="row">
			<div class="col-xs-12">
				<ol class="breadcrumb">
					<li><a href="{{ / }}">{{ $route.name }}</a></li>
					<li><a href="{{ / }}">rules</a></li>
					<li class="active">{{ rule.name }}</li>
				</ol>
				<div class="page-header">
					<h1>{{ rule.name }} <small><a href="{{ rule.link }}" target="_blank"><i class="fa fa-external-link" title="Link to source"></i></a></small></h1>
					<a href="/static/{{ $route.name }}/{{ rule.name }}" class="permalink hidden-xs" target="_blank" v-if="!static"><i class="fa fa-hashtag" title="Permalink to this page"></i></a>
					<a href="#" v-if="!static && config.counter === 0" v-link="'/' + $route.name + '/globals'"><i class="fa fa-chevron-left"></i> Return to globals</a>
					<a v-if="!static && config.counter > 0" v-on:click="back" href="#"><i class="fa fa-chevron-left"></i> go back</a>
					<small v-if="!static" class="center-block text-right text-muted pull-right">{{ config.counter+1 }} of {{ rules.length }}</small>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<p class="lead">{{ rule.description }}</p>
				<hr>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6" v-for="option in rule.options">
				<h4>{{ option.description }} <span v-if="option.recommended" class="label label-info">Recommended</span></h4>
				<pre v-highlight="option.example.join('\n')" v-on:click="choose(true, rule.name, option.value)" v-bind:class="{ 'option': !static }"></pre>
				<div v-if="!static">
					<h3><i class="fa fa-check"></i>Choose this option</h3>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-s-2 col-s-offset-5">
				<a href="#" class="text-center skip" href="#" role="button" v-on:click="choose(false)" v-if="!static">Don't include this option</a>
			</div>
			<div class="col-xs-12">
				<hr>
			</div>
			<div class="col-sm-6">
				<h4>Disable this option with:</h4>
				<pre v-highlight="rule.disable"></pre>
			</div>
		</div>
		<div class="row" v-if="!static">
			<div class="col-xs-12">
				<hr>
				<small class="center-block text-right text-muted">{{ config.counter + 1 }} of {{ rules.length }}</small>
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
				rules: [],
				rule: {
					name: '',
					link: '',
					description: '',
					disable: '',
					options: []
				},
				static: false
			}
		},
		route: {
			activate: function () {
				return this.$http({url: `/definitions/${this.$route.name}/rules.json`, method: 'GET'}).then((response) => {
					this.rules = response.data.rules;
					this.static = this.$route.static;
					this.setProperties();
				});
			}
		},
		methods: {
			choose: function (setValue, name, value) {
				if (!this.static) {
					if (setValue) {
						this.config.rules[name] = value;
					}
					this.config.counter++;
					this.setProperties();
					this.gotoRule();
				}
			},
			back: function () {
				if (!this.static) {
					this.config.counter--;
					this.setProperties();
					this.gotoRule();
				}
			},
			setProperties: function () {
				if (this.config.counter + 1 <= this.rules.length) {
					for (const prop in this.rule) {
						if (this.rule.hasOwnProperty(prop)) {
							this.rule[prop] = this.rules[this.config.counter][prop];
						}
					}
					this.title = this.$route.name + ' - ' + this.rule.name;
				}
			},
			gotoRule: function () {
				if (this.config.counter + 1 > this.rules.length) {
					this.$router.go({path: `/${this.$route.name}/result`});
				} else {
					this.$router.go({path: `/${this.$route.name}/${this.rules[this.config.counter].name}`});
				}
			}
		}
	};
</script>