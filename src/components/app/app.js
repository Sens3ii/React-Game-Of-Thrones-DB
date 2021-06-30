import React, { Component } from "react";

import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import gotService from "../../services/gotService";

export default class App extends Component {
	gotService = new gotService();

	state = {
		showRandomChar: true,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar,
			};
		});
	};

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}
		const char = this.state.showRandomChar ? <RandomChar /> : null;
		return (
			<>
				<div className="container">
					<Header />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<button onClick={this.toggleRandomChar} className="btn btn-dark mb-3">
								Toggle character
							</button>
							{char}
						</div>
					</div>
					<CharacterPage />
					<div className="row">
						<div className="col-md-6">
							<ItemList onCharSelected={this.onCharSelected} getData={this.gotService.getAllBooks()} />
						</div>
						{/* <div className="col-md-6">
						<BookDetails charId={this.state.selectedChar} />
					</div> */}
					</div>
					<div className="row">
						<div className="col-md-6">
							<ItemList onCharSelected={this.onCharSelected} getData={this.gotService.getAllHouses()} />
						</div>
						{/* <div className="col-md-6">
						<BookDetails charId={this.state.selectedChar} />
					</div> */}
					</div>
				</div>
			</>
		);
	}
}
