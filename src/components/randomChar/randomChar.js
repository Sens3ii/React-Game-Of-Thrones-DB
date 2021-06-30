import React, { Component } from "react";
// import "./randomChar.css";
import styled from "styled-components";
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomCharBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}
`;

export default class RandomChar extends Component {
	componentDidMount() {
		this.updateChar();
		this.randCharInterval = setInterval(this.updateChar, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.randCharInterval);
	}
	gotService = new gotService();
	state = {
		char: {},
		loading: true,
		error: false,
	};

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	};

	onError = (err) => {
		this.setState({ error: true, loading: false });
	};

	updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25);
		// const id = 2222222;
		this.gotService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};

	render() {
		const { char, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <Content char={char} /> : null;
		return (
			<RandomCharBlock className="rounded">
				{errorMessage}
				{spinner}
				{content}
			</RandomCharBlock>
		);
	}
}

const Content = ({ char }) => {
	const { name, gender, born, died, culture } = char;
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	);
};
