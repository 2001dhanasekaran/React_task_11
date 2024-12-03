import './style.css';
import { useNavigate } from "react-router-dom";

export default function Welcome(){
    const navigate=useNavigate();

    function redirect(){
        navigate('/main_page');
    }
    return(
        <div className="welcome container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1>Welcome to Shopping cart</h1>
            <h3>Click the button to continue shopping</h3>
            <button className="btn btn-success mt-5" onClick={redirect}>Let's Shop something</button>
        </div>
    );
}