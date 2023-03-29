import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    const handleAddToCart = (product) => {
        //cart.push(product);
        let newCart = [];
        //const newCart = [...cart, product];
        //if product doesn't exists in the cart, then set quantity = 1;
        // if exist update quantity by 1

        const exists = cart.find(pd=>pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity+1;
            const remaining = cart.filter(pd=>pd.id !== product.id);
            newCart = [...remaining, exists]
        }        
        
        setCart(newCart)
        addToDb(product.id)
    }

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        // 1. get the id
        const storedCart = getShoppingCart();
        const savedCart = [];

        for (const id in storedCart) {
            // 2. get the product using id 
            const addedProduct = products.find(product => product.id == id)
            //3. get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                //4. add the added product to the saved cart
                savedCart.push(addedProduct);
            }

        }
        //5. set the cart
        setCart(savedCart);
    }, [products])



    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        product={product}
                        handleAddToCart={handleAddToCart}
                        key={product.id}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;