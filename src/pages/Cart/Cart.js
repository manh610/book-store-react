import React, { useEffect, useState } from 'react';
import empty from '../../assets/empty_cart.svg';
import './style.css';
import { Link, Redirect } from 'react-router-dom';
import { userService } from '../../service/user';
import { createBillAPI, getBookByUserAPI, removeFromCartAPI } from '../../apis';
import { Modal, Button } from 'antd';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Cart() {

	toast.configure()

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

	const handleBuyBook = async () => {
		const tmp = [];
		for ( let i = 0; i < bookstate.length; i++)
			tmp.push(bookstate[i].id)
		const payload = {
			userId: userService.get().id,
			bookBills: tmp
		}
		await createBillAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					toast.success('Đặt mua hàng thành công', {
						position: toast.POSITION.TOP_CENTER
					})
					setLinkToAccount(true)
				}
			})
	}

	const [linktoAccount, setLinkToAccount] = useState(false);

	const [open, setOpen] = useState(false);
	const [openConfirmBuy, setOpenCf] = useState(false);

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

	const handleOpenBuy = () => {
		setOpenCf(true)
	}

	const handleCloseBuy = () => {
		setOpenCf(false)
	}

	const handleOkBuy = () => {
		handleBuyBook();
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
										<h4>{bookCart.book.price}</h4> 
									</div>
									<div className='col-md-1'>
										X 
									</div>
									<div className='col-md-1'>
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
					<Button onClick={handleOpenBuy} className='buy'>Mua hàng</Button>
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

			<Modal 
                title="Bạn có chắc chắn muốn đặt mua các sản phẩm trong giỏ hàng" 
                open={openConfirmBuy} 
                onOk={handleOkBuy} 
                onCancel={handleCloseBuy}>
            </Modal>
			{ linktoAccount && <Redirect to='/account' replace={true} />}
        </section>
    )
}

export default Cart;