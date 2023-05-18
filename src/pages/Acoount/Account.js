import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import './style.css'
import { userService } from '../../service/user';


const Account = () => {

    const user = userService.get();

    return (
    <section className='account'>
            <div className='container'>
                <div className='row py-5 justify-content-center'>
                    <div className="col-md-12 my-3">
                        <h4>hello {user.fullName}!</h4>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div> 
    </section>
  )
}

export default Account;