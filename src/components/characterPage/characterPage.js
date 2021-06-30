import React, { Component } from "react";

import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";

export default class CharacterPage extends Component {
	gotService = new gotService();

	state = {
		selectedChar: 20,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onCharSelected = (id) => {
		this.setState({ selectedChar: id });
	};

	render() {
		const { selectedChar, error } = this.state;
		if (error) {
			return <ErrorMessage />;
		}

		return (
			<div className="row">
				<div className="col-md-6">
					<ItemList onCharSelected={this.onCharSelected} getData={this.gotService.getAllCharacters()} />
				</div>
				<div className="col-md-6">
					<CharDetails charId={selectedChar} />
				</div>
			</div>
		);
	}
}
