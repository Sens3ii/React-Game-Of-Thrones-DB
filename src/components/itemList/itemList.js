import React, { useState, useEffect } from "react";
import "./itemList.css";
import Spinner from "../spinner";

function ItemList({ getData, onItemSelected, renderItem }) {
	const [itemList, updateList] = useState([]);

	useEffect(() => {
		getData.then((data) => updateList(data));
	}, []);

	function renderItems(arr) {
		return arr.map((item) => {
			const { id } = item;
			const label = renderItem(item);
			return (
				<li key={id} className="list-group-item" onClick={() => onItemSelected(id)}>
					{label}
				</li>
			);
		});
	}

	const items = itemList ? renderItems(itemList) : <Spinner />;

	return <ul className="item-list list-group mb-3">{items}</ul>;
}

export default ItemList;
