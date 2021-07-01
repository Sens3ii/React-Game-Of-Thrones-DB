import React, { Component } from "react";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";

export default class HomePage extends Component {
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
			<div className="row">
				<div className="col-lg-6">
					<button onClick={this.toggleRandomChar} className="btn btn-dark mb-3">
						Toggle character
					</button>
					{char}
				</div>
			</div>
		);
	}
}
