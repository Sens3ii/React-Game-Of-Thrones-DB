import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundBlock = styled.div`
	color: #fff;
`;

export default class NotFoundPage extends Component {
	render() {
		return (
			<NotFoundBlock className="d-flex flex-row align-items-center mt-5 pt-3">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 text-center">
							<span className="display-1 d-block">404</span>
							<div className="mb-4 lead">The page you are looking for not found</div>
							<Link to="/home" className="btn btn-dark">
								Home
							</Link>
						</div>
					</div>
				</div>
			</NotFoundBlock>
		);
	}
}
