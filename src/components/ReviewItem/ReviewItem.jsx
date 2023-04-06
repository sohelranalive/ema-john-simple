import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product, handleRemoveFromCart }) => {

    const { id, img, name, quantity, price } = product


    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-info'>
                <p>{name}</p>
                <p>Price: <span className='text-orange'>${price}</span></p>
                <p>Product Quantity: <span className='text-orange'>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveFromCart(id)} className='btn-delete'>
                <FontAwesomeIcon className='delete-icon' icon={faTrashCan} />
            </button>
        </div>
    );
};

export default ReviewItem;