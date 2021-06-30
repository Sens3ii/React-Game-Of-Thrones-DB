import React, { Component } from "react";
import styled from "styled-components";
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
const CharDetailsBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}
`;
const SelectError = styled.span`
	color: #fff;
	text-align: center;
	font-size: 26px;
`;

export default class CharDetails extends Component {
	gotService = new gotService();
	state = {
		char: null,
		error: false,
		loading: true,
	};

	componentDidMount() {
		this.updateChar();
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = () => {
		this.setState({ loading: false });
	};

	onError = (err) => {
		this.setState({ error: true, loading: false });
	};
	updateChar() {
		const { charId } = this.props;
		if (!charId) {
			return;
		}
		this.setState({ loading: true });
		this.gotService
			.getCharacter(charId)
			.then((character) => {
				this.setState({ char: character });
			})
			.then(this.onCharLoaded)
			.catch(this.onError);
	}
	render() {
		const { char, error, loading } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <Content char={char} /> : null;
		return (
			<CharDetailsBlock className="rounded">
				{errorMessage}
				{spinner}
				{content}
			</CharDetailsBlock>
		);
	}
}

const Content = ({ char }) => {
	const { name, gender, born, died, culture } = char;
	return (
		<>
			<h4>{name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender</span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born</span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died</span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture</span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	);
};
