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
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
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

	_transformCharacter(character) {
		return {
			name: character.name,
			gender: character.gender,
			born: character.born,
			died: character.died,
			culture: character.culture,
		};
	}

	_transformHouse(house) {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ansectralWeapons: house.ansectralWeapons,
		};
	}

	_transformBook(book) {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publiser: book.publiser,
			released: book.released,
		};
	}
}
