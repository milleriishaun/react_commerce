import React, { Component } from "react";

import Product from "./Product";
import { ProductConsumer } from "../context";
import Title from "./Title";

export default class ProductList extends Component {
	render() {
		// console.log(this.state.products);
		return (
			<React.Fragment>
				<div className="py-5">
					<div className="container">
						<Title name="our " title="products" />
						<div className="row">
							<ProductConsumer>
								{value => {
									//   console.log("value: ",value)
									return value.products.map(product => {
										return <Product key={product.id} product={product} />;
									});
								}}
							</ProductConsumer>
						</div>
					</div>
				</div>
			</React.Fragment>
			// <Product />
		);
	}
}
