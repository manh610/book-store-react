import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import './style.css'
import { userService } from '../../service/user';
import { getBillByUserAPI, removeFromCartAPI } from '../../apis';
import { Modal } from 'antd'

const Account = () => {

    const user = userService.get();

    const getDataBill = async () => {
		if (user==null)
			return;
		const payload = { id: user.id }
		await getBillByUserAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					let data = res.data.data;
                    let tmp = []
                    for ( let i = 0; i < data.length; i++) {
                        for ( let j = 0; j < data[i].bookbills.length; j++ ) {
                            tmp.push({
                                ...data[i].bookbills[j],
                                createAt: data[i].createAt
                            })
                        }
                    }
					setBookState(tmp)
				}
			})
			.catch(err => console.log(err))
	}

	const remove = async () => {
		const payload = {id: idRemove}
		await removeFromCartAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ){
					getDataBill()
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
		remove()
    }

    useEffect(() => {
		getDataBill()
	}, [])

    const [bookstate, setBookState] = useState([]);

    return (
    <section className='account'>
            <div className='container'>
                <div className='row py-5 justify-content-center top'>
                    <div className="col-md-12 my-3">
                        <h4 className='hello'>hello {user.username} ({user.email}) !</h4>
                        <p className='title'>Danh sách các sản phẩm đã đặt mua</p>
                    </div>
                </div>
                <div className='row'>
                    {
                        bookstate.map((bookCart)=>(
                            <div className='cart-books d-flex align-items-center' key={bookCart.book.id}>
                                <div className='col-md-2'>
                                    <Link to={`/book/${bookCart.book.id}`} className='book-link'>
                                        <img src={bookCart.book.imageUrl} alt='' className='img-fluid'/>
                                    </Link>
                                </div>
                                <div className='col-md-2'>
                                    <h3>{bookCart.book.title}</h3>
                                    <p>{bookCart.book.author}</p>
                                </div>
                                <div className='col-md-2'>
                                    <h4>{(new Date(bookCart.createAt)).toLocaleDateString()}</h4> 
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
                <Modal 
                    title="Bạn có chắc chắn muốn xóa không" 
                    open={open} 
                    onOk={handleOk} 
                    onCancel={handleClose}>
                </Modal>
            </div>
    </section>
  )
}

export default Account;