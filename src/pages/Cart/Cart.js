import React, { useEffect, useState } from 'react';
import empty from '../../assets/empty_cart.svg';
import './style.css';
import { Link } from 'react-router-dom';

function Cart() {

    const loggeduser = useState(false);

    const books = [
		{
			"id": 1,
			"title": "book1",
			"author": "nguyen van a",
			"date": "2023-15-15",
			"description": "first book to read",
			"imageUrl": "./image/book7.png",
			"price": 200,
			"page": 200
		},
		{

			"id": 2,
			"title": "book1",
			"author": "nguyen van a",
			"date": "2023-15-15",
			"description": "first book to read",
			"imageUrl": "./image/book9.png",
			"price": 200,
			"page": 200
		},
    	{

			"id": 3,
			"title": "book1",
			"author": "nguyen van a",
			"date": "2023-15-15",
			"description": "first book to read",
			"imageUrl": "./image/book12.png",
			"price": 200,
			"page": 200
		},
    	{
			"id": 4,
			"title": "book1",
			"author": "nguyen van a",
			"date": "2023-15-15",
			"description": "first book to read",
			"imageUrl": "./image/book7.png",
			"price": 200,
			"page": 200
		},
	]

	const [bookstate, setBookState] = useState(books);

    return (
        <section className='cart-section'>
            {
                bookstate.length > 0 ?
                <div className='container'>
                    <div className='row'>
                        {
                            bookstate.map((book)=>(
                                <div className='cart-books d-flex align-items-center' key={book.id}>
                                    <div className='col-md-2'>
                                        <img src={book.imageUrl} alt='' className='img-fluid'/>
                                    </div>
                                    <div className='col-md-8'>
                                        <h3>{book.title}</h3>
                                        <p>{book.description}</p>
                                    </div>
                                    <div className='col-md-2 position-relative'>
                                        <button className='btn btn-danger position-absolute bottom-0 end-0 mb-3'>x</button>
                                        <p className='text-success position-absolute top-0 end-0'>{book.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                :
                <div className='empty-cart col-12'>
                    <img src={empty} alt='' />
                    <br/>
                    <Link to='/' className='btn'>return to Home Page</Link>
                </div>
            }
        </section>
    )
}

export default Cart;