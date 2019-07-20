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
		cart: [],
		modalOpen: false,
		modalProduct: detailProduct,
		cartSubTotal: 0,
		cartTax: 0,
		cartTotal: 0,
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

	// utility method that gets the item by id
	getItem = id => {
		const product = this.state.products.find(item => item.id === id);
		return product;
	};

	handleDetail = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return {
				detailProduct: product,
			};
		});
	};

	// create a temporary products array
	addToCart = id => {
		let tempProducts = [...this.state.products];
		// use index instead of id, so that react will not move the card to a different spot when reloading
		const index = tempProducts.indexOf(this.getItem(id));
		const product = tempProducts[index];
		product.inCart = true;
		product.count = 1;
		const price = product.price;
		product.total = price;

		// this is the moment that we add items to the cart
		this.setState(
			() => {
				return {
					products: tempProducts,
					cart: [...this.state.cart, product],
				};
			},
			() => {
				// this is where and when we should update totals/subtotals
				// console.log(this.state);
				this.addTotals();
			}
		);
	};

	openModal = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return {
				modalProduct: product,
				modalOpen: true,
			};
		});
	};

	closeModal = () => {
		this.setState(() => {
			return { modalOpen: false };
		});
	};

	increment = id => {
		let tempCart = [...this.state.cart];

		// look for the specific product that was selected
		const selectedProduct = tempCart.find(item => item.id === id);

		// look for the index, of the item in teh tempCart
		const index = tempCart.indexOf(selectedProduct);

		// assign the product to a product variable
		const product = tempCart[index];

		// now we want the value, without changing the index for that specific product
		// we also want to change the quantity
		product.count = product.count + 1;
		// use this so that we always will have the correct totals
		product.total = product.count * product.price;

		this.setState(
			() => {
				return {
					cart: [...tempCart],
				};
			},
			() => {
				this.addTotals();
			}
		);
	};

	decrement = id => {
		let tempCart = [...this.state.cart];
		const selectedProduct = tempCart.find(item => item.id === id);
		const index = tempCart.indexOf(selectedProduct);
		const product = tempCart[index];

		product.count = product.count - 1;

		// we ned to account for total being 0, which will be empty cart
		if (product.count === 0) {
			this.removeItem(id);
		} else {
			product.total = product.count * product.price;
			this.setState(
				() => {
					return {
						cart: [...tempCart],
					};
				},
				() => {
					this.addTotals();
				}
			);
		}
	};

	removeItem = id => {
		let tempProducts = [...this.state.products];
		let tempCart = [...this.state.cart];

		// whatever items are in the cart should be returned to cart, minus the one item with the id not included
		tempCart = tempCart.filter(item => item.id !== id);

		const index = tempProducts.indexOf(this.getItem(id));
		let removedProduct = tempProducts[index];

		// set up these values
		removedProduct.inCart = false;
		removedProduct.count = 0;
		removedProduct.total = 0;

		this.setState(
			() => {
				return {
					cart: [...tempCart],
					products: [...tempProducts],
				};
			},
			() => {
				this.addTotals();
			}
		);
	};

	clearCart = () => {
		this.setState(
			() => {
				return {
					cart: [],
				};
			},
			() => {
				this.setProducts();
				this.addTotals();
			}
		);
	};

	addTotals = () => {
		let subTotal = 0;
		// get all the total values in the cart, using map
		this.state.cart.map(item => (subTotal += item.total));

		// now set up the other values, like tax
		const tempTax = subTotal * 0.1;
		// we want 2 decimals... otherwise ugly result
		// we need to parse, so that it changes the returned string to a decimal, using fixed
		const tax = parseFloat(tempTax.toFixed(2));

		// now set up total
		const total = subTotal + tax;

		this.setState(() => {
			return {
				cartSubTotal: subTotal,
				cartTax: tax,
				cartTotal: total,
			};
		});
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
					openModal: this.openModal,
					closeModal: this.closeModal,
					increment: this.increment,
					decrement: this.decrement,
					removeItem: this.removeItem,
					clearCart: this.clearCart,
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
