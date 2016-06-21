export default class Store {
	
	static fetch() {
		const saved = localStorage.getItem('lintl');
		return saved && JSON.parse(localStorage.getItem('lintl'));
	}

	static save(config) {
		localStorage.setItem('lintl', JSON.stringify(config));
	}

	static clear() {
		localStorage.clear('lintl');
	}
}