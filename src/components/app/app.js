import React, { Component } from "react";

import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Header />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<RandomChar />
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<ItemList />
						</div>
						<div className="col-md-6">
							<CharDetails />
						</div>
					</div>
				</div>
			</>
		);
	}
}
