import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import './style.css'
import { userService } from '../../service/user';


const Account = () => {

    const user = userService.get();

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
    <section className='account'>
        {/* { user === null ?
            <Link path="/" />: */}
            <div className='container'>
                <div className='row py-5 justify-content-center'>
                    <div className="col-md-12 my-3">
                        <h4>hello {user.fullName}!</h4>
                        <p>{user.email}</p>
                    </div>
                    <div className="col-md-6 my-3">
                        <h4>Owned Books</h4>
                        <p>________________</p>
                        <ul>
                            {
                                bookstate.map((book)=>(
                                    <li><Link to={`/book/${book.id}` } >{book.title}</Link></li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-md-6 my-3">  
                        <h4>Favorite books</h4>
                        <p>________________</p>
                        <ul>
                            {
                                bookstate.map((book)=>( 
                                    <li><Link to={`/book/${book.id}` } >{book.title}</Link></li>
                                ))
                            }
                        </ul>    
                    </div>
                </div>
            </div> 
        {/* }     */}
    </section>
  )
}

export default Account;