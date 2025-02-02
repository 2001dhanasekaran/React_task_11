import { FaShoppingCart } from 'react-icons/fa';
import logo from './product_imgs/logo.jpg';
import { useNavigate } from 'react-router-dom';

export default function Main({ products, setProducts }) {
    const navigate = useNavigate();

    function redirect() {
        navigate('/cart_page');
    }

    const addToCart = (id) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, cart: true, quantity: product.cart ? product.quantity + 1 : 1 } : product
        );

        setProducts(updatedProducts);

        const updatedCart = updatedProducts.filter((product) => product.cart).map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: product.quantity
        }));

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const itemscount = products.filter((product) => product.cart).length;

    return (
        <div className='container-fluid'>
            <nav className='navbar bg-light fixed-top shadow'>
                <div className='container-fluid d-flex justify-content-between align-items-center'>
                    <img src={logo} height='50' width='80' alt='logo' className='img-fluid' />
                    <input type='text' className='form-control mx-3 w-50' placeholder='Search products...' />
                    <button className='btn position-relative' onClick={redirect}>
                        <FaShoppingCart size={24} />
                        {itemscount > 0 && (
                            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                {itemscount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <div className='container mt-5 pt-5'>
                <div className='row g-4 justify-content-center'>
                    {products.map((product) => (
                        <div className='col-12 col-sm-6 col-md-4' key={product.id}>
                            <div className='card h-100'>
                                <img src={product.image} className='card-img-top' alt={product.name} style={{ height: '250px', objectFit: 'cover' }} />
                                <div className='card-body text-center'>
                                    <h5 className='card-title'>{product.name}</h5>
                                    <p className='card-text'>Price: ₹ {product.price}</p>
                                    <button className='btn btn-primary w-100' type='button' onClick={() => addToCart(product.id)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}