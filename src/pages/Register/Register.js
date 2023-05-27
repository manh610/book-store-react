import React, { useState } from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';
import { registerAPI } from '../../apis';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { userService } from '../../service/user';

const Register = () => {

    toast.configure();

    const [ fullName , setFullName ]= useState('');
    const [ username , setUsername]= useState('');
    const [ password , setPassword ]= useState('');
    const [ confirm , setConfirm ] = useState('')

    const [ registered, setRegisted] = useState(false);

    const SignUp = async () =>{
        const payload = {
            username: username,
            password: password,
            confirmPassword: confirm,
            fullName: fullName
        }
        await registerAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    userService.set(res.data.data);
                    setRegisted(true);
                    localStorage.removeItem("check")
                } else {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <section className='register'>
            <div className='container'>
                <div className='row py-5'>
                    <div className="col-md-6 my-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Name" onChange={e=>setFullName(e.target.value)} />
                    </div>
                    <div className="col-md-6 my-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Username</label> 
                        <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Enter Email" onChange={e=>setUsername(e.target.value)} /> 
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlInput3" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleFormControlInput3" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlInput4" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleFormControlInput4" placeholder="Confirm Password" onChange={e=>setConfirm(e.target.value)} />
                    </div>
                    <div className='col-md-12 d-flex justify-content-center'>
                        <button type="submit" className="btn" onClick={SignUp}>Submit</button>
                    </div>
                    {
                        registered && <Redirect  to="/" replace={true}/>
                    }
                </div>
            </div>
        </section>
    )
}

export default Register;