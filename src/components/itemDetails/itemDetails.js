import React, { Component } from "react";
import styled from "styled-components";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const ItemDetailsBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}
`;

const Field = ({ item, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export { Field };

export default class ItemDetails extends Component {
	state = {
		item: null,
		error: false,
		loading: true,
	};

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.setState({ loading: true });
			this.updateItem();
		}
	}

	onItemLoaded = () => {
		this.setState({ error: false, loading: false });
	};

	onError = () => {
		this.setState({ error: true, loading: false });
	};

	updateItem() {
		const { itemId, getData } = this.props;
		if (!itemId) {
			return;
		}
		getData(itemId)
			.then((item) => {
				this.setState({ item });
			})
			.then(this.onItemLoaded)
			.catch(this.onError);
	}

	render() {
		if (!this.state.item) {
			return (
				<ItemDetailsBlock className="rounded mb-3">
					<h4>Select an item from the list</h4>
				</ItemDetailsBlock>
			);
		}
		const { item, error, loading } = this.state;

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <Content item={item} children={this.props.children} /> : null;
		return (
			<ItemDetailsBlock className="rounded mb-3">
				{errorMessage}
				{spinner}
				{content}
			</ItemDetailsBlock>
		);
	}
}

const Content = ({ item, children }) => {
	const { name } = item;
	return (
		<>
			<h4>{name}</h4>
			<ul className="list-group list-group-flush">
				{React.Children.map(children, (child) => {
					return React.cloneElement(child, { item });
				})}
			</ul>
		</>
	);
};
