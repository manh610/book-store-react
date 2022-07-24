import React from 'react';
import { useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { retriveAction } from '../../redux/actions/actions';
import './style.css'


const Account = () => {

    const user = useSelector(state=>state.loggedInUserroot);

    const dispatch = useDispatch();

    const bookstate = useSelector(state=>state.booksroot);
  
    useEffect(()=>{  
      dispatch(retriveAction());
    },[])

    return (
    <section className='account'>
        { user === null && !bookstate.isloading ?
            <Redirect to="/" replace={true} />:
            <div className='container'>
                <div className='row py-5 justify-content-center'>
                    <div className="col-md-12 my-3">
                        <h4>hello {user.username}!</h4>
                        <p>{user.email}</p>
                    </div>
                    <div className="col-md-6 my-3">
                        <h4>Owned Books</h4>
                        <p>---------------</p>
                        <ul>
                            {user.bought.map((ownedbook)=>(
                                bookstate.books.map((book)=>(book.id===ownedbook && 
                                    <li><Link to={`/book/${book.id}` } >{book.name}</Link></li>
                                ))
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6 my-3">  
                        <h4>Favorite books</h4>
                        <p>---------------</p>
                        <ul>
                            {user.loved.map((ownedbook)=>(
                                bookstate.books.map((book)=>(book.id===ownedbook && 
                                    <li><Link to={`/book/${book.id}` } >{book.name}</Link></li>
                                ))
                            ))}
                        </ul>    
                    </div>
                </div>
            </div> 
        }    
    </section>
  )
}

export default Account;