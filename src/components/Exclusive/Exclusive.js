import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import './style.css';
import {retriveAction} from '../../redux/actions/actions';
import {Link} from 'react-router-dom'

function Exclusive() {

  const dispatch = useDispatch();

  const bookstate = useSelector(state=>state.booksroot);

  useEffect(()=>{  
    dispatch(retriveAction());
  },[])

  return (
    <section className='Exclusive'>
        <div className='container'>
          <div className='title text-center'>
            <h2 className='border'>EXCLUSIVE THIS MONTH</h2>
            <p className='lead'>BOOKS ADDED THIS MONTH</p>
          </div>  
            <div className='row p-5 justify-content-center'>
              { !bookstate.isloading ?
                bookstate.books.map((book)=>(
                  book.new &&
                  (<div className='col-md-4'  key={book.id}>
                    <Link to={`/book/${book.id}`} className='book-link'>
                      <div className='d-flex align-items-center book border py-2 my-3 mx-1 px-4'>                        
                        <div className='col-md-4'>
                          <img src={book.img} alt='' className="img-fluid"/>
                        </div>
                        <div className='book-info col-md-8'>
                          <h3>{book.name}</h3>
                          <p>{book.price[0].amount} {book.price[0].currency}</p>
                        </div>
                      </div>
                    </Link>
                   </div>
                  ))):
                <p>no divs</p>
              }
            </div>
        </div>
    </section>
  )
}

export default Exclusive;