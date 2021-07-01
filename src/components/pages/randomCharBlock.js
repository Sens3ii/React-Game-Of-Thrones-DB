import React, { Component } from "react";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";

export default class RandomCharBlock extends Component {
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
			<div className="row justify-content-center">
				<div className="col-md-8 text-center">
					<button onClick={this.toggleRandomChar} className="btn btn-dark mb-3">
						My Random Character
					</button>
					{char}
				</div>
			</div>
		);
	}
}
