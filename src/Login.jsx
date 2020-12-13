import React, { useState } from 'react'
import Api from './api/apiService'
import { useHistory } from "react-router-dom";
// import { ModalForgotPassword } from './Modals/Forgotpassword'

import { Example } from './Modals/Example'


import { FaEnvelope, FaKey, FaFacebook, FaGoogle, FaTwitter, } from 'react-icons/fa';

const Login = () => {

    // const [show, setShow] = useState(false);
    const closeModalHandler = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false); 
  
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true); 



    const [showForgotPassword,setShowForgotPassword]=useState(false);
    const closeModalHandlerForgotPassword=()=>
    {
        setShowForgotPassword(false);
    }
    const [data, setData] = useState({
        email: '',
        password: '',
    });

   
    const history = useHistory();


    const InputEvent = (event) => {
        const { name, value } = event.target;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        })
    };


    const formSubmit = (e) => {
        e.preventDefault();
        alert(`
        My email id is ${data.email}. My password is ${data.password}.
        `);
        let dataobj = {
            email: data.email,
            password: data.password
        }
        getLoadData(dataobj);
        // let loadResponse = await Api.login(loadId);
        // if(loadResponse){
        //     console.log("sumit");
        // }
    };

    const getLoadData = async (load) => {
        let loadResponse = await Api.login(load);
        if (loadResponse.status) {
            alert("success login")
           // history.push("/");
        }
    };
    return (
        <>
            <div className="loginSection" style={{ position: 'absolute', height: '100%' }}>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In</h3>
                                <div className="d-flex justify-content-end social_icon">                                    
                                    <span><i class="fa fa-facebook-square" style={{ color: '#4066a2', fontSize: '45px' }}></i></span>
                                    <span><i class="fa fa-google-plus-square" style={{ color: '#d54c40', fontSize: '45px' }}></i></span>
                                    <span><i class="fa fa-twitter-square" style={{ color: '#02a6e5', fontSize: '45px' }}></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formSubmit}>
                                    <div className="input-group form-group ">
                                        <div className="input-group-prepend" style={{ display: 'flex' }}>
                                            <span className="input-group-text"><FaEnvelope /></span>
                                        </div>

                                        <input type="email" className="form-control" id="exampleFormControlInput1" name="email" onChange={InputEvent} value={data.email} placeholder="Username" />
                                    </div>
                                    <div className="input-group form-group  ">
                                        <div className="input-group-prepend" style={{ display: 'flex' }}>
                                            <span className="input-group-text"><FaKey /></span>
                                        </div>
                                        <input type="password" className="form-control" id="exampleFormControlInput2" name="password" onChange={InputEvent} value={data.password} placeholder="Password" />
                                    </div>

                                    <div className="row align-items-center remember">
                                        <input type="checkbox" id="readtandc" />Remember Me
					                </div>
                                    <div className="form-group">
                                        <button className="btn float-right login_btn" style={{
                                            color: 'black',
                                            backgroundColor: '#2eb3c7',
                                            width: '100px'
                                        }} type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<a routerLink="/registration">Sign Up</a>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <a style={{ cursor: 'pointer', color: '#053465' }} onClick={() => handleShow(true)}>Forgot your password?</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* <Button variant="primary" onClick={handleShow}> 
              Launch static backdrop modal 
            </Button>  */}


        <Example email={data.email} show={show} handleClose={handleClose} /> 



         {/* {showForgotPassword ? <div onClick={closeModalHandlerForgotPassword} className="back-drop"></div> : null}
            {showForgotPassword ? <ModalForgotPassword showForgotPassword={showForgotPassword} closeForgotPassword={closeModalHandlerForgotPassword} /> : null}  */}
  
            
            
        </>
    )
}

export default Login
