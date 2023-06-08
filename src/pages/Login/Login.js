import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import './style.css'
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { userService } from '../../service/user';
import { loginAPI } from '../../apis';

const Login = () => {

    toast.configure();

    const [logged , setloggged ] = useState(false);
    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');

    const SignIn = async () =>{
        const payload = {
            username: username,
            password: password
        }

        await loginAPI(payload)
            .then(res => {
                if ( res.data.statusCode == 'OK') {
                    userService.set(res.data.data)
                    setloggged(true)
                    localStorage.removeItem("check")
                } else {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(err => console.log(err))
    }

    return (
    <section className='login'>
        <div className='container'>
            <div className='row py-5'>
                <div className="col-md-6 my-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Username</label>
                    <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Enter Username" onChange={e=>setUsername(e.target.value)} />
                </div>
                <div className="col-md-6 my-3">
                    <label htmlFor="exampleFormControlInput3" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleFormControlInput3" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className='col-md-12 d-flex justify-content-center'>
                    <input type="button" value='Login' className="btn" onClick={SignIn}/>
                </div>
            </div>
        </div>
        {logged &&
            <Redirect to="/" replace={true} />
        }    
    </section>
  )
}

export default Login;