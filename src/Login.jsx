import React, { useState } from 'react'
import Api from './api/apiService'
import { useHistory } from "react-router-dom";
// import { ModalForgotPassword } from './Modals/Forgotpassword'
import stylesLogin from "./Login.module.css";

import { Example } from './Modals/Example'
import { VerifyOTP } from './Modals/VerifyOTP'
import { Passwordsetup } from './Modals/Passwordsetup'

import { FaEnvelope, FaKey, FaFacebook, FaGoogle, FaTwitter, } from 'react-icons/fa';

const Login = () => {

     // const [show, setShow] = useState(false);
     const closeModalHandler = () => {
        setShow(false);
    }
    const [inputForVerifyOTP1, setinputForVerifyOTP1] = useState({
            userEmail: '',
            OTPAPIValue: '',
            regMobileNo:'',
        });

        
    const [isActivateAccountRequired, setisActivateAccountRequired] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //openVerifyOTPPopup
    const [showVerifyOTPPopup, setShowVerifyOTPPopup] = useState(false);
    const closeVerifyOTPPopup = () => setShowVerifyOTPPopup(false);
    const openVerifyOTPPopup = () => setShowVerifyOTPPopup(true);

    //openPasswordSetupPopup

    const [showPasswordSetupPopup, setshowPasswordSetupPopup] = useState(false);
    const closePasswordSetupPopup = () => setshowPasswordSetupPopup(false);
    const openPasswordSetupPopup = () => setshowPasswordSetupPopup(true);


    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const closeModalHandlerForgotPassword = () => {
        setShowForgotPassword(false);
    }
    const [data, setData] = useState({
        email: '',
        password: '',
    });


    const history = useHistory();

    const redirectTo =  (path) => {
            history.push(path);
    }


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
    };

    const getLoadData = async (load) => {
        let loadResponse = await Api.login(load);
        if (loadResponse.status) {
            alert("success login");
            redirectTo('/doctorlist')
        }
    };

    function forgotPasswordSet(data) {
        setinputForVerifyOTP1({
            userEmail: data
          });
      setTimeout(() => {
        handleClose();
        GenerateOTP();
      }, 300);
    
    }



    function GenerateOTP() {
        if (inputForVerifyOTP1.userEmail == '' || inputForVerifyOTP1.userEmail == undefined) {
            alert("Please Enter Email Id to forgot password");
            return;
        }
        let dataobj = {
            "email": inputForVerifyOTP1.userEmail
        }
        GenerateOTPAPICall(dataobj);
    }

    const GenerateOTPAPICall = async (load) => {
        let loadResponse = await Api.GenerateOTP(load);
        if (loadResponse.status) {
            alert("success OTP")
            setinputForVerifyOTP1(prev => ({
                ...prev, OTPAPIValue: loadResponse.data.response.OTP,
                regMobileNo: loadResponse.data.response.regMobileNo
            }))
            openVerifyOTPPopup();
        }
    };

    function  verifyOTPSet(email) {
        console.log("valuevaluevalue", email);
        setinputForVerifyOTP1(prev => ({
            ...prev, userEmail: email
        }))
        closeVerifyOTPPopup();
        openPasswordSetupPopup();
      }

    return (
        <>
            <div  className={stylesLogin["loginSection"]} style={{ position: 'absolute', height: '100%' }}>
                <div className={stylesLogin["container"]} >
                    <div className="d-flex justify-content-center h-100">
                        <div className={stylesLogin["card"]}>
                            <div  className="card-header">
                                <h3 style={{color:'#fff'}}>Sign In</h3>
                                <div className={stylesLogin["social_icon"]} style={{ justifyContent: 'flex-end!important',display: 'flex'}}>                                    
                                    <span><i class="fa fa-facebook-square" style={{ color: '#4066a2', fontSize: '45px' }}></i></span>
                                    <span><i class="fa fa-google-plus-square" style={{ color: '#d54c40', fontSize: '45px' }}></i></span>
                                    <span><i class="fa fa-twitter-square" style={{ color: '#02a6e5', fontSize: '45px' }}></i></span>
                                </div>
                            </div>
                            <div  className="card-body">
                                <form onSubmit={formSubmit}>
                                    <div className="input-group form-group ">
                                        <div className={stylesLogin["input-group-prepend"]}>
                                            <span className="input-group-text"><i class="fa fa-user"></i></span>
                                        </div>

                                        <input type="email" className="form-control" id="exampleFormControlInput1" name="email" onChange={InputEvent} value={data.email} placeholder="Email Address" />
                                    </div>
                                    <div className="input-group form-group  ">
                                    <div className={stylesLogin["input-group-prepend"]}>
                                            <span className="input-group-text"><i class="fa fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" id="exampleFormControlInput2" name="password" onChange={InputEvent} value={data.password} placeholder="Password" />
                                    </div>

                                    <div className="row align-items-center remember" style={{color:'#fff'}}>
                                        <input type="checkbox" id="readtandc" style={{width: '20px',height: '20px',marginLeft: '15px',marginRight: '5px'}} />Remember Me
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
                            <div  className="card-footer">
                                <div className="d-flex justify-content-center" style={{color:'#fff'}}>
                                    Don't have an account?<a routerLink="/registration" style={{color: '#007bff',textDecoration:'none',backgroundColor:'transparent'}}>Sign Up</a>
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


<Example forgotPasswordSet={forgotPasswordSet}  email={data.email} show={show} handleClose={handleClose}  /> 


<VerifyOTP showVerifyOTPPopup={showVerifyOTPPopup}  inputForVerifyOTP={inputForVerifyOTP1} closeVerifyOTPPopup={closeVerifyOTPPopup} verifyOTPSet={verifyOTPSet}></VerifyOTP> 


<Passwordsetup userEmail={inputForVerifyOTP1.userEmail} isActivateAccountRequired={isActivateAccountRequired} showPasswordSetupPopup={showPasswordSetupPopup}  closePasswordSetupPopup={closePasswordSetupPopup} verifyOTPSet={verifyOTPSet}></Passwordsetup> 


         {/* {showForgotPassword ? <div onClick={closeModalHandlerForgotPassword} className="back-drop"></div> : null}
            {showForgotPassword ? <ModalForgotPassword showForgotPassword={showForgotPassword} closeForgotPassword={closeModalHandlerForgotPassword} /> : null}  */}
  
            
            
        </>
    )
}

export default Login
