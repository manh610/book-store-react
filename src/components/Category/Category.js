import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import {getCurrencyAction, retriveAction} from '../../redux/actions/actions';
import {Link} from 'react-router-dom';

class Category extends React.Component{

  componentDidMount(){
    this.props.retrive();
    this.props.getcurrency();
  }

  render() {
    return (
        <div className='category'>
            <div className='container'>
                <div className='row'>
                    {
                        !this.props.bookstate.isloading ?
                        this.props.bookstate.books.map((book)=>(
                        book.text === this.props.type &&
                        (<div className='col-md-4'  key={book.desc}>
                          <Link to={`/book/${book.id}`} className='book-link'>
                            <div className='d-flex align-items-center book border py-2 my-3 mx-1 px-4'>                        
                              <div className='col-md-4'>
                                <img src={book.img} alt='' className="img-fluid"/>
                              </div>
                              <div className='book-info col-md-8'>
                                <h3>{book.name}</h3>
                                <p>{book.price.map((price)=>{return (price.currency===this.props.currency.current?price.amount:"")})}<span> {this.props.currency.current}</span></p>
                              </div>
                            </div>
                          </Link>
                         </div>
                        ))):
                        <p>no divs</p> 
                    }         
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookstate: state.booksroot,
    currency: state.currencyroot
  };
};

const mapDispatchToProps =(dispatch)=> ({
  retrive: ()=>dispatch(retriveAction()),
  getcurrency: ()=>dispatch(getCurrencyAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
