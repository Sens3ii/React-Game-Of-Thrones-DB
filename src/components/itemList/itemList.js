import React, { Component } from "react";
import "./itemList.css";
import gotService from "../../services/gotService";
import Spinner from "../spinner";

export default class ItemList extends Component {
	gotService = new gotService();
	state = {
		charList: null,
		error: false,
	};
	componentDidMount() {
		this.gotService
			.getAllCharacters()
			.then((charList) => {
				this.setState({ charList });
			})
			.catch(this.onError);
	}
	onError = (err) => {
		this.setState({ error: true });
	};

	renderItems(arr) {
		return arr.map((item) => {
			const { id, name } = item;
			return (
				<li key={id} className="list-group-item" onClick={() => this.props.onCharSelected(id)}>
					{name}
				</li>
			);
		});
	}

	render() {
		const { charList } = this.state;
		const spinner = !charList ? <Spinner /> : null;
		const items = charList ? this.renderItems(charList) : null;

		return (
			<ul className="item-list list-group">
				{spinner}
				{items}
			</ul>
		);
	}
}
