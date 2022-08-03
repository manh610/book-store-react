import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import './style.css';
import {getCurrencyAction, retriveAction} from '../../redux/actions/actions';
import { useParams } from 'react-router';

function Book() {

  const dispatch = useDispatch();
  const currency = useSelector(state=> state.currencyroot);
  const bookstate = useSelector(state=>state.booksroot);
  const loggeduser = useSelector(state=>state.loggedInUserroot);

  useEffect(()=>{  
    dispatch(retriveAction());
    dispatch(getCurrencyAction());
  },[])

  const { id } = useParams();

  let styleLove;
  let styleBuy;

  if(loggeduser!=null){
    if(Array.isArray(loggeduser.loved)){
        loggeduser.loved.find( bookId => bookId === id ) != null ? styleLove = {color: "red"}: styleLove = {color : "grey" };
    }
    if(Array.isArray(loggeduser.cart)){
        loggeduser.cart.find( bookId => bookId === id ) != null ? styleBuy = {color: "green"}: styleBuy = {color : "grey" };
    }
  }

  return (
    <section className='one-book'>
        <div className='container'>
              { !bookstate.isloading ?
                bookstate.books.map((book)=>(
                  book.id === id &&
                  ( <div className='row p-5 justify-content-center' key={id}>
                        <div className='col-md-5'>
                          <img src={book.img} alt='' className="img-fluid"/>
                        </div>
                        <div className='col-md-7 info d-flex'>
                            <div className='align-self-center'>
                                <h3>{book.name}</h3>
                                <p>{book.desc}</p>
                                {book.text? 
                                    <p>Type: text </p>:
                                    <p>Type: e-book </p>
                                }                                
                          <p>Price: {book.price.map((price)=>{return (price.currency===currency.current?price.amount:"")})}<span> {currency.current}</span></p>
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
                  ))):
                <p>no divs</p>
              }
        </div>
    </section>
  )
}

export default Book;