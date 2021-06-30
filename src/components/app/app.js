import React, { Component } from "react";

import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import "./app.css";
import ErrorMessage from "../errorMessage";

export default class App extends Component {
	state = {
		showRandomChar: true,
		selectedChar: null,
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

	onCharSelected = (id) => {
		this.setState({ selectedChar: id });
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
							<button onClick={this.toggleRandomChar} className="btn btn-secondary my-2">
								Toggle character
							</button>
							{char}
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<ItemList onCharSelected={this.onCharSelected} />
						</div>
						<div className="col-md-6">
							<CharDetails charId={this.state.selectedChar} />
						</div>
					</div>
				</div>
			</>
		);
	}
}
