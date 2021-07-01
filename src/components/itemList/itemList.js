import React, { Component } from "react";
import "./itemList.css";
import Spinner from "../spinner";
import PropTypes from "prop-types";
export default class ItemList extends Component {
	state = {
		itemList: null,
		error: false,
	};

	componentDidMount() {
		const { getData } = this.props;
		getData
			.then((itemList) => {
				this.setState({ itemList });
			})
			.catch(this.onError);
	}

	onError = (err) => {
		this.setState({ error: true });
	};

	renderItems(arr) {
		return arr.map((item) => {
			const { id } = item;
			const label = this.props.renderItem(item);
			return (
				<li key={id} className="list-group-item" onClick={() => this.props.onItemSelected(id)}>
					{label}
				</li>
			);
		});
	}

	render() {
		const { itemList } = this.state;
		const spinner = !itemList ? <Spinner /> : null;
		const items = itemList ? this.renderItems(itemList) : null;

		return (
			<ul className="item-list list-group mb-3">
				{spinner}
				{items}
			</ul>
		);
	}
}

ItemList.defaultProps = {
	onItemSelected: () => {},
};

ItemList.propTypes = {
	onItemSelected: PropTypes.func,
};
