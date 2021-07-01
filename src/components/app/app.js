import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header";
import RandomChar from "../randomChar";
import { CharacterPage, BookPage, HousePage, BookItem } from "../pages";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import "./app.css";
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
		const char = this.state.showRandomChar ? <RandomChar interval={10000} /> : null;
		return (
			<Router>
				<div className="app">
					<div className="container">
						<Header />
					</div>
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<button onClick={this.toggleRandomChar} className="btn btn-dark mb-3">
									Toggle character
								</button>
								{char}
							</div>
						</div>
						<Route path="/" exact component={() => <h1>Welcome</h1>} />
						<Route path="/characters/" exact component={CharacterPage} />
						<Route path="/books/" exact component={BookPage} />
						<Route path="/houses/" exact component={HousePage} />
						<Route
							path="/books/:id"
							render={({ match, location, history }) => {
								const { id } = match.params;
								return <BookItem bookId={id} />;
							}}
						/>
					</div>
				</div>
			</Router>
		);
	}
}
