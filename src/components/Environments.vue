<template>
    <div class="container">
		<div class="row">
			<div class="col-xs-12">
				<ol class="breadcrumb">
					<li><a href="#">{{ $route.name }}</a></li>
					<li class="active">environments</li>
				</ol>
				<div class="page-header">
					<h1>Environments <small><a href="{{ link }}" target="_blank"><i class="fa fa-external-link" title="Link to source"></i></a></small></h1>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<p class="lead">Choose the environments you're working in</p>
				<hr>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4">
				<div class="form-group">
					<div class="checkbox" v-for="env in environments">
						<label v-if="$index <= 9">
							<input v-bind:checked="isChecked(env)" v-model="checked" value="{{ env }}" type="checkbox" name="env[]"> {{ env }}
						</label>
					</div>
				</div>
			</div>
			<div class="col-xs-4">
				<div class="form-group">
					<div class="checkbox" v-for="env in environments">
						<label v-if="$index > 9 && $index <= 19">
							<input v-bind:checked="isChecked(env)" v-model="checked" value="{{ env }}" type="checkbox" name="env[]"> {{ env }}
						</label>
					</div>
				</div>
			</div>
			<div class="col-xs-4">
				<div class="form-group">
					<div class="checkbox" v-for="env in environments">
						<label v-if="$index > 19">
							<input v-bind:checked="isChecked(env)" v-model="checked" value="{{ env }}" type="checkbox" name="env[]"> {{ env }}
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<a href="#" v-on:click="setEnv" class="btn btn-primary pull-right">Continue...</a>
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
                environments: [],
                checked: [],
                link: ''
            }
        },
		ready: function () {
			this.title = this.$route.name + ' - Environments';
		},
        route: {
            activate: function() {
                return this.$http({url: `/definitions/${this.$route.name}/environments.json`, method: 'GET'}).then((response) => {
                    this.environments = response.data.environments;
                    this.link = response.data.link;
                });
            }
        },
        methods: {
            isChecked: function(val) {
                return this.config.environments.indexOf(val) > -1;
            },
            setEnv: function() {
                this.config.environments = this.checked;
                this.$router.go({path: `/${this.$route.name}/globals`});
            }
        }
    };
</script>