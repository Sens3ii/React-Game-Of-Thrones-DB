import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "../header";
import { CharacterPage, BookPage, HousePage, BookItem, HomePage, NotFoundPage } from "../pages";
import ErrorMessage from "../errorMessage";

import "./app.css";
export default class App extends Component {
	state = {
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}
		return (
			<Router>
				<div className="app">
					<div className="container">
						<Header />
					</div>
					<div className="container">
						<Switch>
							<Route
								exact
								path="/"
								render={() => {
									return <Redirect to="/home" />;
								}}
							/>
							<Route path="/home" exact component={HomePage} />
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
							<Route path="*" exact component={NotFoundPage} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
