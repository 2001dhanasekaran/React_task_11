import { FaShoppingCart } from 'react-icons/fa';
import logo from './product_imgs/logo.jpg';
import { useNavigate } from 'react-router-dom';

export default function Main({products,setProducts}){
    const navigate=useNavigate();

    function redirect(){
        navigate('/cart_page');
    }
    
    const addToCart=(id)=>{
        const updatedProducts=products.map((product)=>
        product.id===id ? {...product, cart: true, quantity: product.cart ? product.quantity + 1 : 1} : product);
        
        setProducts(updatedProducts);

        const updatedCart=updatedProducts.filter((product)=>product.cart).map((product)=>({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: product.quantity
        }));
         
        localStorage.setItem('cart', JSON.stringify(updatedCart));

    };
    const itemscount=products.filter((product)=> product.cart).length;

    return(
        <div className='container-fluid'>
            <nav className='navbar bg-light fixed-top shadow'>
                <div className='d-flex w-100 justify-content-center align-items-center'>
                    <img src={logo} height='60px' width='100px' alt='logo' />
                    <input type='text' style={{height:'40px'}} className='form-control mx-5 w-75' aria-label='Search' placeholder='Search the products here'/>
                    <button className='btn position-relative' onClick={redirect}><FaShoppingCart />{itemscount > 0 &&(
                        <span className='position-absolute top-0 start-50 badge rounded-pill bg-danger'>{itemscount}</span>)}</button>
                </div>
            </nav>
            <div className='row m-5 p-5'>
                {products.map((product)=>(
                    <div className='col-md-4 mb-4' style={{height:"400px", width:"350px"}}  key={product.id}>
                        <div className='card h-100'>
                            <img src={product.image} className='card-img-top' 
                                alt={product.name} style={{height:'250px', objectFit:'cover'}}
                            />
                            <div className='card-body'>
                                <h5 className='card-title'>{product.name}</h5>
                                <p className='card-text'>Price: ₹ {product.price}</p>
                                <button className='btn btn-primary' type='button' 
                                    onClick={()=> addToCart(product.id)}>Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}