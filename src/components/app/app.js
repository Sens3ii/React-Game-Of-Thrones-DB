import React, { Component } from "react";

import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import "./app.css";
export default class App extends Component {
	state = {
		showRandomChar: true,
	};
	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar,
			};
		});
	};
	render() {
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
							<ItemList />
						</div>
						<div className="col-md-6">
							<CharDetails />
						</div>
					</div>
				</div>
			</>
		);
	}
}
