import React, { Component } from "react";

import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage";
import "./app.css";
import ErrorMessage from "../errorMessage";

export default class App extends Component {
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
							<button onClick={this.toggleRandomChar} className="btn btn-secondary my-2">
								Toggle character
							</button>
							{char}
						</div>
					</div>
					<CharacterPage />
				</div>
			</>
		);
	}
}
