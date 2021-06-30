export default class GotService {
	constructor() {
		this._apiBase = "https://www.anapioficeandfire.com/api";
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}
		return await res.json();
	};

	async getAllBooks() {
		const res = await this.getResource(`/books/`);
		return res.map(this._transformBook);
	}
	async getBook(id) {
		const res = await this.getResource(`/books/${id}/`);
		return this._transformBook(res);
	}

	async getAllCharacters() {
		const res = await this.getResource(`/characters?page=5&pageSize=5`);
		console.log(res);
		return res.map((item) => this._transformCharacter(item));
	}

	async getCharacter(id) {
		const res = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(res);
	}

	async getAllHouses() {
		const res = await this.getResource(`/houses/`);
		return res.map(this._transformHouse);
	}

	async getHouse(id) {
		const res = await this.getResource(`/houses/${id}/`);
		return this._transformHouse(res);
	}

	isKnown(data) {
		console.log(data);
		if (data) {
			return data;
		} else {
			return "Unknown";
		}
	}

	_transformCharacter(character) {
		return {
			name: this.isKnown(character.name),
			gender: this.isKnown(character.gender),
			born: this.isKnown(character.born),
			died: this.isKnown(character.died),
			culture: this.isKnown(character.culture),
		};
	}

	_transformHouse(house) {
		return {
			name: this.isKnown(house.name),
			region: this.isKnown(house.region),
			words: this.isKnown(house.words),
			titles: this.isKnown(house.titles),
			overlord: this.isKnown(house.overlord),
			ansectralWeapons: this.isKnown(house.ansectralWeapons),
		};
	}

	_transformBook(book) {
		return {
			name: this.isKnown(book.name),
			numberOfPages: this.isKnown(book.numberOfPages),
			publiser: this.isKnown(book.publiser),
			released: this.isKnown(book.released),
		};
	}
}
