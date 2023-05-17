import React, {useState} from 'react';
import './style.css';
import {Link} from 'react-router-dom';

const Category  = ({props}) => {
  const books = [
		{
			"id": "1",
			"name": "book1",
			"author": "nguyen van a",
			"date": "2023-15-15",
			"description": "first book to read",
			"imageUrl": "../../assets/book7.png",
			"price": 200,
			"page": 200
		},
		{

			"id": "2",
			"name": "book1",
			"author": "nguyen van a",
			"date": "2023-15-15",
			"description": "first book to read",
			"imageUrl": "../../assets/book7.png",
			"price": 200,
			"page": 200
		},
	]

	const [bookstate, setBookState] = useState(books);

    return (
        <div className='category'>
            <div className='container'>
                <div className='row'>
                    {
                        bookstate.map((book)=>(
                        true &&
                        (<div className='col-md-4'  key={book.description}>
                          <Link to={`/book/${book.id}`} className='book-link'>
                            <div className='d-flex align-items-center book border py-2 my-3 mx-1 px-4'>                        
                              <div className='col-md-4'>
                                <img src={book.imageUrl} alt='' className="img-fluid"/>
                              </div>
                              <div className='book-info col-md-8'>
                                <h3>{book.name}</h3>
                                <p>{book.price}</p>
                              </div>
                            </div>
                          </Link>
                         </div>
                        )))
                    }         
                </div>
            </div>
        </div>
    )
}

export default Category;
