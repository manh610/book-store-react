import React, { useState } from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';


const Register = () => {

    const [ newname , setName ]= useState('');
    const [ newpassword , setPassword ]= useState('');
    const [ confirm , setConfirm ] = useState('')
    const [ registered , setRegistered ] = useState(false);

    const SignUp = () =>{

        if(newpassword===confirm){

            const payload = {
                name:newname,
                password:newpassword,
                loved:[],
                bought:[],
                cart:[]
            };
        
            console.log(payload);
            alert('registered successfully');
            alert('logged in succefully');  
            setRegistered(true);
            return null
        }else{
            alert("passwords does't match");
            return null
        }
    }

    return (
    <section className='register'>
        <div className='container'>
            <div className='row py-5'>
                <div className="col-md-6 my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Name" onChange={e=>setName(e.target.value)} />
                </div>
                <div className="col-md-6 my-3">
                    {/* <label htmlFor="exampleFormControlInput2" className="form-label">Email</label> */}
                    {/* <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} /> */}
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