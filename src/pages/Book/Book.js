import React, { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router';

function Book() {
	const { id } = useParams();

	let styleLove;
	let styleBuy;

	const init = {
		"id": 1,
		"title": "book1",
		"author": "nguyen van a",
		"date": "2023-15-15",
		"description": "first book to read",
		"imageUrl": "./image/book7.png",
		"price": 200,
		"page": 200
	}

	

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

	const [book, setBookState] = useState(init);

	return (
		<section className='one-book'>
			<div className='container'>
				<div className='row p-5 justify-content-center' key={id}>
					<div className='col-md-5'>
					<img src={book.imageUrl} alt='' className="img-fluid"/>
					</div>
					<div className='col-md-7 info d-flex'>
						<div className='align-self-center'>
							<h3>{book.title}</h3>
							<p>{book.description}</p>
							<p>Price: 200</p>
							<div className='d-flex'>
								<button style={styleLove} className='btn btn-outline-secondary love me-3'>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
									</svg>
								</button>
								<button style={styleBuy} className='btn btn-outline-secondary buy'>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
										<path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
									</svg> 
								</button>
							</div>
						</div>    
					</div>
				</div>
			</div>
		</section>
	)
}

export default Book;