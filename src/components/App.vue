<style lang="less" rel="stylesheet/less">
	@import '../../node_modules/bootstrap/less/bootstrap.less';
	@import '../../node_modules/font-awesome/less/font-awesome.less';
	@import (inline) '../../node_modules/highlight.js/styles/darkula.css';
	@import '../../node_modules/bootswatch/cosmo/variables.less';
	@import '../../node_modules/bootswatch/cosmo/bootswatch.less';

	body {
		padding-top: 70px;
	}

	main {
		min-height: ~"calc(100vh - 180px)";
	}

	h1 {
		font-size: 50px;

		& > small {
			font-size: 45%;
		}
	}

	h1, h4 {
		font-weight: normal;
	}

	footer {
		padding-bottom: 20px;
	}

	.github {
		color: fade(#333333, 60%);
		font-size: 30px;
		transition: color 300ms ease;
		padding: 10px 15px !important;

		& > i {
			margin:0;
		}

		&:hover {
			color: #333333;
		}
	}

	@media all and (max-width:768px) {
		main {
			margin-top:80px;
		}
	}
</style>

<script type="text/babel">
	import FastClick from 'fastclick';
	import Store from '../store/Store';

	export default {
		ready: function () {
			FastClick(document.body);
		},
		watch: {
			config: {
				handler: function (config) {
					Store.save(config);
				},
				deep: true
			}
		},
		data: function () {
			return {
				config: Store.fetch() || {
					environments: [],
					rules: {},
					globals: [],
					counter: 0
				},
				title: 'Lintl'
			}
		}
	};
</script>