import React, { Component } from 'react'
import {detailProduct, storeProducts} from './data';

const ProductContext = React.createContext();
// Provider(provides all the information for all the application)(we creat the ProductProvider because Provider is not useful
// by itself)
// Consumer(whenever wanting to use the information provided from the provider, we use the consumer)
// Because the ProductContext.Provider will be sitting at the top of the components tree, we want to return all the children.

class ProductProvider extends Component {
  state = {
    products: storeProducts,
    detailProduct: detailProduct
  }

  handleDetail = () => {
    console.log('hello from detail');
  }

  addToCart = () => {
    console.log('hello from addToCart');
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};