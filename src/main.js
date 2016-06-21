import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import hljs from 'highlight.js';
import Rule from './components/Rule.vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Environments from './components/Environments.vue';
import Globals from './components/Globals.vue';
import Results from './components/Results.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	hashbang: false,
	transitionOnLoad: true,
	history: true
});

router.map({
	'/': {
		component: Home
	},
	'/static/eslint/:rule': {
		name: 'eslint',
		static: true,
		component: Rule
	},
	'/eslint': {
		name: 'eslint',
		component: Rule
	},
	'/eslint/environments': {
		name: 'eslint',
		component: Environments
	},
	'/eslint/globals': {
		name: 'eslint',
		component: Globals
	},
	'/eslint/:rule': {
		name: 'eslint',
		component: Rule
	},
	'/eslint/result': {
		name: 'eslint',
		component: Results
	},
	'/static/jslint/:rule': {
		name: 'jslint',
		static: true,
		component: Rule
	},
	'/jslint': {
		name: 'jslint',
		component: Rule
	},
	'/jslint/environments': {
		name: 'jslint',
		component: Environments
	},
	'/jslint/globals': {
		name: 'jslint',
		component: Globals
	},
	'/jslint/:rule': {
		name: 'jslint',
		component: Rule
	},
	'/jslint/result': {
		name: 'jslint',
		component: Results
	},
	'/static/jshint/:rule': {
		name: 'jshint',
		static: true,
		component: Rule
	},
	'/jshint': {
		name: 'jshint',
		component: Rule
	},
	'/jshint/environments': {
		name: 'jshint',
		component: Environments
	},
	'/jshint/globals': {
		name: 'jshint',
		component: Globals
	},
	'/jshint/:rule': {
		name: 'jshint',
		component: Rule
	},
	'/jshint/result': {
		name: 'jshint',
		component: Results
	}
});

Vue.directive('highlight', function (value) {
	const obj = hljs.highlight('javascript', value);

	this.el.classList.add('hljs');
	this.el.innerHTML = obj.value;
});

router.start(App, '#app');