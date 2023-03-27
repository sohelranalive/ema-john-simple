import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    
    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart)
    }

    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product=><Product 
                        product={product}
                        handleAddToCart ={handleAddToCart}
                        key={product.id}
                        >
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <h3>Order Summary</h3>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;