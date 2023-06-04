import React, { useEffect, useState } from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import { getBooksAPI } from '../../apis';

const Exclusive = ({textSearch}) => {

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
		}
	]

	const [bookstate, setBookState] = useState(books);

	const getDataBook = async () => {
		console.log(textSearch)
		await getBooksAPI()
			.then(async res => {
				if ( res.data.statusCode=='OK' ) {
					console.log(res.data.data)
					const textSearchLower = textSearch.toLowerCase();
					const tmp = await res.data.data.filter((book) => {
						const lowerCaseName = book.title.toLowerCase();
						return lowerCaseName.includes(textSearchLower)
					})
					console.log(tmp)
					setBookState(tmp);
				}
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getDataBook()
	}, [])

	useEffect(() => {
		getDataBook()
	},[textSearch])

	return (
		<section className='Exclusive'>
			<div className='container'>
			{/* <div className='title text-center'>
				<h2 className='border'>EXCLUSIVE THIS MONTH</h2>
				<p className='lead'>BOOKS ADDED THIS MONTH</p>
			</div>   */}
				<div className='row p-5 justify-content-center'>
				{
					bookstate.map((book)=>(
					<div className='col-md-4'  key={book.id}>
						<Link to={`/book/${book.id}`} className='book-link'>
						<div className='d-flex align-items-center book border py-2 my-3 mx-1 px-4'>                        
							<div className='col-md-4'>
							<img src={book.imageUrl} className="img-fluid"/>
							</div>
							<div className='book-info col-md-8'>
							<h3>{book.title}</h3>
							<p>{book.author}</p>
							</div>
						</div>
						</Link>
					</div>
					))
				}
				</div>
			</div>
		</section>
  	)
}

export default Exclusive;