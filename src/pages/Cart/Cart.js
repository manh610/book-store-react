import React, { useEffect, useState } from 'react';
import empty from '../../assets/empty_cart.svg';
import './style.css';
import { Link } from 'react-router-dom';
import { userService } from '../../service/user';
import { getBookByUserAPI, removeFromCartAPI } from '../../apis';
import { Modal } from 'antd'

function Cart() {

    // const books = [
	// 	{
	// 		"id": 1,
	// 		"title": "book1",
	// 		"author": "nguyen van a",
	// 		"date": "2023-15-15",
	// 		"description": "first book to read",
	// 		"imageUrl": "./image/book7.png",
	// 		"price": 200,
	// 		"page": 200,
	// 		"amount" : 1
	// 	},
	// 	{

	// 		"id": 2,
	// 		"title": "book1",
	// 		"author": "nguyen van a",
	// 		"date": "2023-15-15",
	// 		"description": "first book to read",
	// 		"imageUrl": "./image/book9.png",
	// 		"price": 200,
	// 		"page": 200,
	// 		"amount" : 2
	// 	},
    // 	{

	// 		"id": 3,
	// 		"title": "book1",
	// 		"author": "nguyen van a",
	// 		"date": "2023-15-15",
	// 		"description": "first book to read",
	// 		"imageUrl": "./image/book12.png",
	// 		"price": 200,
	// 		"page": 200,
	// 		"amount" : 1
	// 	},
    // 	{
	// 		"id": 4,
	// 		"title": "book1",
	// 		"author": "nguyen van a",
	// 		"date": "2023-15-15",
	// 		"description": "first book to read",
	// 		"imageUrl": "./image/book7.png",
	// 		"price": 200,
	// 		"page": 200,
	// 		"amount" : 1
	// 	},
	// ]

	const user = userService.get();

	const getDataCart = async () => {
		if (user==null)
			return;
		const payload = { id: user.id }
		await getBookByUserAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					let data = res.data.data;
					setBookState(data)
				}
			})
			.catch(err => console.log(err))
	}

	const removeFromCart = async () => {
		const payload = {id: idRemove}
		await removeFromCartAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ){
					getDataCart()
				}
			})
		handleClose();
	}
	const [open, setOpen] = useState(false);

	const [idRemove, setIdRemove] = useState()

	const handleOpen = (id) => {
        console.log('open modal')
		setIdRemove(id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
		removeFromCart()
    }

	useEffect(() => {
		getDataCart()
	}, [])

	const [bookstate, setBookState] = useState([]);

    return (
        <section className='cart-section'>
            {
                bookstate.length > 0 ?
                <div className='container'>
                    <div className='row'>
                        {
                            bookstate.map((bookCart)=>(
								<div className='cart-books d-flex align-items-center' key={bookCart.book.id}>
									<div className='col-md-2'>
										<Link to={`/book/${bookCart.book.id}`} className='book-link'>
											<img src={bookCart.book.imageUrl} alt='' className='img-fluid'/>
										</Link>
									</div>
									<div className='col-md-3'>
										<h3>{bookCart.book.title}</h3>
										<p>{bookCart.book.author}</p>
									</div>
									<div className='col-md-1'>
										X 
									</div>
									<div className='col-md-3'>
										<h4>{bookCart.amount}</h4>
									</div>
									<div className='col-md-1'>
										<h4 className='price text-success position-absolute'>{bookCart.book.price * bookCart.amount}</h4>
									</div>
									<div onClick={() => handleOpen(bookCart.id)} className='col-md-2 position-relative'>
										<button className='btn btn-danger position-absolute end-0 mb-3 btn-remove'>x</button>
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
			<Modal 
                title="Bạn có chắc chắn muốn xóa không" 
                open={open} 
                onOk={handleOk} 
                onCancel={handleClose}>
            </Modal>
        </section>
    )
}

export default Cart;