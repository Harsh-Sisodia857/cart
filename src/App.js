import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import db from './firebase';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading : true
    }
  }

  componentDidMount() { 
    db.collection('products')
      .onSnapshot((snapshot) => {
      
       const products = snapshot.docs.map((doc) => {    
         const data = doc.data();
         data['id'] = doc.id;
         return data;
       })
       this.setState({
         products,
         loading : false
       })
    })
   }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);


    const docRef = db.collection('products').doc(products[index].id)
    docRef.update({
      qty : products[index].qty + 1
    }).then(() => {
      console.log("Update Successfully");
    }).catch((error)=>{
      console.log("ERROR : ",error);
    })
  }
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = db.collection('products').doc(products[index].id)
    docRef.update({
      qty: products[index].qty - 1
    }).then(() => {
      console.log("Update Successfully");
    }).catch((error) => {
      console.log("ERROR : ", error);
    })
  }

  handleDeleteProduct = (id) => {

    const docRef = db.collection('products').doc(id);
    docRef.delete().then(() => {
      console.log("Deleted Successfully");
    }).catch((error) => {
      console.log("ERROR : ", error);
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  addProduct = () => {
    db.collection('products').add({
      img: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
      price: 999,
      qty: 30,
      title : "Mouse"
    }).then((docRef) => {
        console.log("Product has been added :",docRef)
    }).catch((error) => {
      console.error("ERROR : ", error);
      })
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })

    return cartTotal;
  }
  render () {
    const { products,loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct}> Add Product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1 className='text-center'>Loading Products...</h1>}
        {!loading && <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div>}
      </div>
    );
  }
}

export default App;
