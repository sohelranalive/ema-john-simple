import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])


    const { totalProducts } = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0)
    // console.log(totalProducts);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumbers = [];
    // for (let i = 0; i <= totalPages; i++) {
    //     pageNumbers.push(i)
    // }

    const pageNumbers = [...Array(totalPages).keys()]

    const options = [5, 10, 15, 20]

    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }



    const handleAddToCart = (product) => {
        //cart.push(product);
        let newCart = [];
        //const newCart = [...cart, product];
        //if product doesn't exists in the cart, then set quantity = 1;
        // if exist update quantity by 1

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }

        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    //loading all data
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    //loading data based on conditions on pagination

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data)
            })
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        // 1. get the id
        const storedCart = getShoppingCart();

        const ids = Object.keys(storedCart)

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {

                const savedCart = [];

                for (const id in storedCart) {
                    // 2. get the product using id 
                    const addedProduct = cartProducts.find(product => product._id == id)
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
            })

    }, [])



    return (
        <>
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(product => <Product
                            product={product}
                            handleAddToCart={handleAddToCart}
                            key={product._id}
                        >
                        </Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>
                                <span>Review Order</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* Pagination */}
            <div className="pagination">
                <p>CurrentPage: {currentPage}, ItemsPerPage: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? 'selected' : ''}
                    >{number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;