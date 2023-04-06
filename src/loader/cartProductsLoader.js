import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json();

    //if cart data stored in database we need to use async await

    const storedCart = getShoppingCart();
    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id)
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
