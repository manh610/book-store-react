import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import './style.css'


const Login = () => {


    const users = useState({});

    const [logged , setloggged ] = useState(false);
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    const SignIn = () =>{
        
        const payload = users.find( user => user.email === email && user.password === password );

        if(payload){
            console.log('e7na gwa');
            console.log(payload , 'askjdhshdsahhsakhasdkhdhkadkhdsakhsdahkdsakh');
            alert('success login page');
            setloggged(true);
            return null;
        }else{
            alert('failed login page')
            return null;
        }
    }

    return (
    <section className='login'>
        <div className='container'>
            <div className='row py-5'>
                <div className="col-md-6 my-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
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