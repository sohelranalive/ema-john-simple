import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {

    // if cart data stored in database we need to use async await

    // old Method
    // const storedCart = getShoppingCart();

    // const loadedProducts = await fetch('http://localhost:5000/products')
    // const products = await loadedProducts.json();


    // batpari method, never use this
    // const storedCart = getShoppingCart();

    // const loadedProducts = await fetch(`http://localhost:5000/products?page=0&limit=1000`)
    // const products = await loadedProducts.json();


    //new Method
    const storedCart = getShoppingCart();

    const ids = Object.keys(storedCart)
    console.log(ids);
    const loadedProducts = await fetch('http://localhost:5000/productsByIds', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadedProducts.json();

    console.log(products);
    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id)
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    //if we want to return more than one parameter, we can return as a array
    // return [product, savedCart]
    //another way to return more than one parameter
    //return {product, cart: savedCart}

    return savedCart;
}

export default cartProductsLoader;
