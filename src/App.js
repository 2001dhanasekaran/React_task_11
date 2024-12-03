import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './components/welcome';
import Main from './components/main';
import Cart from './components/cart';
import { useEffect, useState } from 'react';
import img1 from './components/product_imgs/cello_gel.png'
import img2 from './components/product_imgs/camlin-geometry.jpg'
import img3 from './components/product_imgs/faber-marker.avif'
import img4 from './components/product_imgs/kangaro-paperpunch.avif'
import img5 from './components/product_imgs/classmate-note.avif'
import img6 from './components/product_imgs/jk-copier.avif'


function App() {
  const defaultProducts=[
    {
        id:1, image: img1, name:'Cello Butterflow', price:20, quantity:1, cart: false
        },
    {
        id:2, image: img2, name:'Camlin Scholar Geometry box', price:80, quantity:1, cart: false
        },
    {
        id:3, image: img3, name:'Faber-Castell Text Liner', price:120, quantity:1, cart: false
        },
    {
        id:4, image: img4, name:'Kangaro Paper punch', price:130, quantity:1, cart: false
        },
    {
        id:5, image: img5, name:'Classmate A4 size Notebook', price:60, quantity:1, cart: false
        },
    {
        id:6, image: img6, name:'JK- Copier 75 GSM A4', price:360, quantity:1, cart: false
        },
];

const [products, setProducts]=useState(defaultProducts);

useEffect(()=>{
  const savedCart=JSON.parse(localStorage.getItem('cart')) || [];
  if(savedCart.length > 0){
    setProducts((prevProducts)=>
      prevProducts.map((product)=>{
        const cartItems=savedCart.find((item)=>item.id===product.id);
        return cartItems ? {...product, cart:true, quantity: cartItems.quantity} : product;
      })
    );
  }
}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='main_page' element={<Main products={products} setProducts={setProducts}/>}/>
        <Route path='cart_page' element={<Cart products={products} setProducts={setProducts}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
