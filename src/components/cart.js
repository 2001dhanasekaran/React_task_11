import { Link } from "react-router-dom";

export default function Cart({products, setProducts}){
    const increaseQty=(id)=>{
        setProducts((prevProducts)=> 
            prevProducts.map((product)=>
                product.id===id ? {...product, quantity: product.quantity+1} : product
            ));
            updateLocalstorage(id,1);
    };

    const decreaseQty=(id)=>{
        setProducts((prevProducts)=> 
            prevProducts.map((product)=>
                product.id===id && product.quantity > 1 ? {...product, quantity: product.quantity-1} : product
            ));
            updateLocalstorage(id,-1);
    };

    const removeItem=(id)=>{
        const updatedProducts=products.map((product)=>
          product.id===id ? {...product, cart: false, quantity:1} : product
        );
    
        setProducts(updatedProducts);

        const savedCart=JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart= savedCart.filter((item)=> item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const updateLocalstorage=(id, change)=>{
        const savedCart=JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart=savedCart.map((item)=>
            item.id===id ?{...item, quantity: Math.max(item.quantity + change, 1)} : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const items=products.filter((product)=>product.cart);
    const totalPrice=items.reduce((total,product)=>total+product.price*product.quantity, 0);

    const placeOrder=()=>{
        alert("Your order placed successfully");
    }
    
    return(
        <div className="container-fluid bg-white">
            <h1 className="my-4 text-center">Your Cart</h1>
            {items.length === 0 ? (<p>Your cart is empty</p>): (items.map((product)=>(
                <div className="d-flex w-100 m-1 align-items-center border row" key={product.id}>
                    <div className="col-md-5">
                        <img src={product.image} alt={product.name} style={{height:'100px', width:'100px'}}/>
                        <h5>{product.name}</h5>
                        <p>Price: ₹ {product.price}</p>
                    </div>
                    <div className="col-md-5">
                        <button className="btn btn-sm btn-secondary mx-1" 
                            onClick={()=>decreaseQty(product.id)} disabled={product.quantity<=1}>   -</button>
                        <span className="mx-2">{product.quantity}</span>
                        <button className="btn btn-sm btn-secondary mx-1" 
                            onClick={()=>increaseQty(product.id)}>+</button>
                        <button className="btn btn-danger" onClick={()=>removeItem(product.id)}>Remove Item</button>
                    </div>
                    <div className="col-md-2">  
                        <p>Total: ₹ {product.price*product.quantity}</p>
                    </div>
                </div>
            )))}
            {items.length > 0 && (
                 <div className="mt-4 d-flex justify-content-end">
                    <h2>Total Amount: ₹ {totalPrice}</h2>
                </div>
            )}
            <div className="text-center">
                <div className="mb-5"><Link to="/main_page">Add more Items</Link></div>
                <button className="btn btn-success btn-lg w-50 mb-2" onClick={placeOrder} disabled={totalPrice===0}>Place Order</button>
            </div>
        </div>
    );
}