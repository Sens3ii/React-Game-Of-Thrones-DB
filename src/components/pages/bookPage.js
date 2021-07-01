import React, { Component } from "react";

import gotService from "../../services/gotService";

import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock";

export default class BookPage extends Component {
	gotService = new gotService();

	state = {
		selectedBook: 100,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({ selectedBook: id });
	};

	render() {
		const { selectedBook, error } = this.state;
		if (error) {
			return <ErrorMessage />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllBooks()}
				renderItem={(item) => `${item.name} (${item.numberOfPages})`}
			/>
		);

		const itemDetails = (
			<ItemDetails itemId={selectedBook} getData={this.gotService.getBook}>
				<Field field="numberOfPages" label="Pages" />
				<Field field="publisher" label="Publisher" />
				<Field field="country" label="Country" />
			</ItemDetails>
		);

		return <RowBlock left={itemList} right={itemDetails} />;
	}
}
