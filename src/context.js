import React, { Component } from "react";
import { detailProduct, storeProducts } from "./data";

//Provider
//Consumer

const ProductContext = React.createContext();
// Provider(provides all the information for all the application)(we creat the ProductProvider because Provider is not useful
// by itself)
// Consumer(whenever wanting to use the information provided from the provider, we use the consumer)
// Because the ProductContext.Provider will be sitting at the top of the components tree, we want to return all the children.

class ProductProvider extends Component {
	state = {
		products: [],
		detailProduct: detailProduct,
	};

	// lastly, make the method run on on load
	componentDidMount() {
		this.setProducts();
	}

	//first, write this method to get nested data for 'this.state.products' array.
	setProducts = () => {
		let tempProducts = [];
		storeProducts.forEach(item => {
			// IMPORTANT: second, notice that we are copying the values here, not simply referencing like before
			const singleItem = { ...item };
			tempProducts = [...tempProducts, singleItem];
		});

		this.setState(() => {
			return { products: tempProducts };
		});
	};

	handleDetail = () => {
		console.log("hello from detail");
	};

	addToCart = id => {
		console.log("id", id);
	};

	// test difference between actual data and referenced data; JS uses references for objects stored in variables or arrays.
	// JS passes these objects as references.
	// storeProducts items are objects and they are referenced by the storeProducts array(the state one).
	// This means that we are not viewing correct data. That is why we want to avoid reference. We want actual data.
	// We actually want fresh data to use, rather than referenced values. We also want the original values saved.
	// tester = () => {
	//   console.log("State products: ", this.state.products[0].inCart);
	//   console.log("Data products: ", storeProducts[0].inCart);

	//   const tempProducts = [...this.state.products];
	//   tempProducts[0].inCart = true;

	//   this.setState(
	//     () => {
	//       return { products: tempProducts };
	//     },
	//     () => {
	//       //nondelayed values
	//       console.log("State products: ", this.state.products[0].inCart);
	//       console.log("Data products: ", storeProducts[0].inCart);
	//     }
	//   );
	// };

	render() {
		return (
			<ProductContext.Provider
				value={{
					...this.state,
					handleDetail: this.handleDetail,
					addToCart: this.addToCart,
				}}
			>
				{/* <button onClick={this.tester}>test me</button> */}
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
