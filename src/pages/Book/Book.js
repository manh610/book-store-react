import React, { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router';
import { Button, Form, Input, List, Image, Rate, Carousel} from 'antd';
import { Comment } from '@ant-design/compatible'
import { userService } from '../../service/user'
import { addToCartAPI, createCommentAPI, getBookByIdAPI, getBooksAPI, getCommentByBookAPI, getRateByBookAPI } from '../../apis';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createRateAPI } from '../../apis';
import { Redirect, Link }  from 'react-router-dom'

const { TextArea } = Input;

const Book = () => {

	toast.configure();

	const { id } = useParams();

	const [comments, setComments] = useState([]);
	const [contentComment, setContentComment] = useState('');

	const user = userService.get();
	
	const init = {
		"id": 0,
		"title": "book1",
		"author": "nguyen van a",
		"date": "2023-15-15",
		"description": "first book to read",
		"imageUrl": "./image/book7.png",
		"price": 200,
		"page": 200,
		"category" : {
			id : 0,
			name : ''
		}
	}
	

	const getRcmBook = async (bookTmp) => {
		await getBooksAPI()
			.then(res => {
				let data = res.data.data;
				let tmp = [];
				for ( let i = 0; i < data.length; i++) {
					if ( data[i].category.id==bookTmp.category.id && data[i].id !== bookTmp.id) {
						tmp.push(data[i])
					}
				}
				settRcmBook(tmp)
			})
			.catch(err => console.log(err))
	}

	

	const getDataBookById = async () => {
		const payload = { id: id }
		await getBookByIdAPI(payload)
			.then(res => {
				setBookState(res.data.data)
				getRcmBook(res.data.data);
			})
			.catch(error => console.log(error))
	}

	const [rateBook, setRateBook] = useState(0);
	const [quantityRate, setQuantityRate] = useState(0);
	const [rateUser, setRateUser] = useState(0)

	const getDataRateByBook = async () => {
		const payload = {id: id}
		await getRateByBookAPI(payload)
			.then(res => {
				let data = res.data.data;
				let tmp = 0;
				for ( let i = 0; i < data.length; i++ ){
					tmp += data[i].rate
					if ( user && data[i].user.id==user.id )
						setRateUser(data[i].rate)
				}
				tmp /= data.length;
				setRateBook(tmp)
				setQuantityRate(data.length)
			})
			.catch(err => console.log(err))
	}

	const getDataCommentByBook = async () => {
		const payload = {id: id}
		await getCommentByBookAPI(payload)
			.then(res => {
				let data = res.data.data;
				let tmp = [];
				for (let i = 0; i < data.length; i++) {
					tmp.push({
						avatar: <Image preview={false} style={{marginTop: 4}} width={50} src="./image/user.png" alt={data[i].user.email} />,
						author: data[i].user.email,
						content: <p>{data[i].content}</p>,
					})
				}
				setComments(tmp)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getDataBookById();
		getDataCommentByBook();
		getDataRateByBook();
	}, [])

	const [rcmBook, settRcmBook] = useState([]);

	const [book, setBookState] = useState(init);

	const handleAddComment = async () => {
		const payload = {
			content: contentComment,
			bookId: id,
			userId: user.id
		}
		await createCommentAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					getDataCommentByBook();
				}
			})
			.catch(err => console.log(err))
	}

	const handleSubmit = () => {
		if ( !contentComment ) return;
		if ( user==null ) {
			toast.error('Bạn cần đăng nhập trước khi để lại bình luận', {
				position: toast.POSITION.TOP_CENTER
			});
			return;
		}
		handleAddComment();
		setContentComment('');
	};

	const [linktoCart, setLinkToCart] = useState(false);

	const [amount, setAmount] = useState(1)

	const handleMinus = () => {
		if (amount==1)
			return;
		setAmount(amount => amount-1)
	}
	const handlePlus = () => {
		setAmount(amount => amount+1)
	}

	const addToCart = async () => {
		if ( user==null ) {
			toast.error('Bạn cần đăng nhập trước khi mua hàng', {
				position: toast.POSITION.TOP_CENTER
			});
			return;
		}
		const payload = {
			amount: amount,
			userId: user.id,
			bookId: id
		}
		await addToCartAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ){
					toast.success('Thêm vào giỏ hàng thành công', {
						position: toast.POSITION.TOP_CENTER
					})
					setLinkToCart(true)
				}
			})	
			.catch(err => console.log(err))
	}

	const handleRateBook = async (value) => {
		console.log('rate')
		const payload = {
			rate: value,
			bookId: book.id,
			userId: user.id
		}
		console.log(payload)
		await createRateAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK') {
					console.log(res.data.data)
					getDataRateByBook()
				}
			})
			.catch(err => console.log(err))
	}

	const [linkBook, setLnkBook] = useState(false);
	const [urlLink, setUrlLink] = useState('')

	const linkTo = (url) => {
		setUrlLink(url);
		setLnkBook(true)
		window.location.assign(url);
	}

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
							<p>Tác giả: {book.author}</p>
							<p>Mô tả: {book.description}</p>
							<p>Thể loại: {book.category.name}</p>							
							<p>Ngày phát hành: {new Date(book.date).toLocaleDateString()}</p>
							<p>Số trang: {book.page}</p>
							<p>Giá: {book.price}</p>
							<Rate  style={{marginBottom: 20}} allowHalf disabled value={rateBook} /> { quantityRate > 0 ? <p>{rateBook.toFixed(1)} điểm / {quantityRate} người đánh giá</p>: <p>Chưa có người đánh giá</p> }
							<div className='d-flex'>
								<table className='amount border-class'>
									<tr>
										<td className='minus-plus border-class' onClick={handleMinus} > - </td>
										<td><Input className='input-amount' min={1} onChange={(e) => setAmount(e.target.value)} width={40} value={amount} bordered={false} /></td>
										<td className='minus-plus border-class' onClick={handlePlus}> + </td>
									</tr>
								</table>

								<button onClick={addToCart} className='btn btn-outline-secondary buy'>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
										<path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
									</svg> 
								</button>
							</div>
						</div>    
					</div>
				</div>
				<div className='comment'>
					<Comment
						className='com'
						content={
							<div>
								<Form.Item>
									<TextArea style={{width: '900px'}} rows={3} onChange={(e) => setContentComment(e.target.value)} value={contentComment} />
								</Form.Item>
								<Form.Item>
									<Button onClick={handleSubmit} className='btnAddcom' type='primary'>
										Thêm nhận xét
									</Button>
									<Rate onChange={(value) => handleRateBook(value)} style={{marginBottom: 20, float: 'right'}} value={rateUser} disabled={user==null} />
								</Form.Item>
							</div>
						}
					/>
					<List
						className='list-comment'
						dataSource={comments}
						header="Nhận xét, đánh giá từ khách hàng: "
						itemLayout="horizontal"
						renderItem={(props) => <Comment {...props} />}
					/>
					{rcmBook.length>0 && <h5 style={{margin: '10px 0'}}>Các cuốn sách bạn có thể thích</h5>}
					<Carousel dotPosition='top' autoplay autoplaySpeed={1500}>
						{
							rcmBook.map((book)=>(
							<div key={book.id}>
								<Link onClick={() => linkTo(`/book/${book.id}`)} reloadDocument to={`/book/${book.id}`} replace={true} className='book-link'>
									<div className='d-flex align-items-center border'>                        
										<div className='col-md-4'>
											<img src={book.imageUrl} className="img-fluid"/>
										</div>
										<div className='book-info col-md-4'>
											<h3>{book.title}</h3>
											<p>{book.author}</p>
										</div>
									</div>
								</Link>
							</div>
							))
						}
					</Carousel>
				</div>
				{ linktoCart && <Redirect to='/cart' replace={true} />}
				{ linkBook && <Redirect to={urlLink} replace={true} />}
			</div>
		</section>
	)
}

export default Book;