import CartItem from "./CartItem";
import React from "react";

export default function CartList({ value }) {
	const { cart } = value;
	// console.log(value, cart);

	return (
		<div className="container-fluid">
			{cart.map(item => {
				return <CartItem key={item.id} item={item} value={value} />;
			})}
		</div>
	);
}
