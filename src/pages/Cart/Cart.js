import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { retriveAction } from '../../redux/actions/actions';
import empty from '../../assets/empty_cart.svg';
import './style.css';
import { Link } from 'react-router-dom';

function Cart() {

    const loggeduser = useSelector(state=>state.loggedInUserroot);

    const dispatch = useDispatch();

    const bookstate = useSelector(state=>state.booksroot);
  
    useEffect(()=>{  
      dispatch(retriveAction());
    },[])

    return (
        <section className='cart-section'>
            {
                loggeduser != null && !bookstate.isloading ?
                <div className='container'>
                    <div className='row'>
                        {loggeduser.cart.map((bookId)=>(
                            bookstate.books.map((book)=>(
                                bookId === book.id &&
                                <div className='cart-books d-flex align-items-center' key={bookId}>
                                    <div className='col-md-2'>
                                        <img src={book.img} alt='' className='img-fluid'/>
                                    </div>
                                    <div className='col-md-8'>
                                        <h3>{book.name}</h3>
                                        <p>{book.desc}</p>
                                    </div>
                                    <div className='col-md-2 position-relative'>
                                        <button className='btn btn-danger position-absolute bottom-0 end-0 mb-3'>x</button>
                                        <p className='text-success position-absolute top-0 end-0'>{book.price[0].amount}{book.price[0].currency}</p>
                                    </div>
                                </div>
                            ))
                        ))}
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