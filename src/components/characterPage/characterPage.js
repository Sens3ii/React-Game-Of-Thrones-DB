import React, { Component } from "react";

import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";

const RowBlock = ({ left, right }) => {
	return (
		<div className="row">
			<div className="col-md-6">{left}</div>
			<div className="col-md-6">{right}</div>
		</div>
	);
};

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

		const itemList = (
			<ItemList
				onCharSelected={this.onCharSelected}
				getData={this.gotService.getAllCharacters()}
				renderItem={(item) => `${item.name} (${item.gender})`}
			/>
		);

		const charDetails = <CharDetails charId={selectedChar} />;

		return <RowBlock left={itemList} right={charDetails} />;
	}
}
