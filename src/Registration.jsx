import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import stylesReg from "./Registration.module.css";
import { useHistory } from "react-router-dom";

import RegistrationImg from '../src/images/Registration.jpg';

const Registration = () => {

  const [errorMessage, seterrorMessage] = useState('');
  const [phoneNumberPattern, setphoneNumberPattern] = useState('^\\d{10}$');
  const [submitted, setsubmitted] = useState(false);
  const [code, setcode] = useState('');
  //var code='';
  const [isInvalidCaptcha, setisInvalidCaptcha] = useState(false);
  const [isVisibleSendOTPbutton, setisVisibleSendOTPbutton] = useState(false);
  const [inActiveEmailID, setinActiveEmailID] = useState('');
  const [phoneNoCountryCode, setphoneNoCountryCode] = useState('+91');
  const [OTPFromRegistrationForm, setOTPFromRegistrationForm] = useState('');
  const [OTPFromAPI, setOTPFromAPI] = useState('');
  const [isRegMobileNoVerified, setisRegMobileNoVerified] = useState(false);
  const [isInvalidMobileError, setisInvalidMobileError] = useState(true);
  const [isverifyOTPbtnClicked, setisverifyOTPbtnClicked] = useState(false);
  const[captchaTextBoxValue,setcaptchaTextBoxValue]=useState('');
  const  [userInfo, setuserInfo]  =useState({
    email:'',
    name:'',
    passwordvalue:'',
    password:'',
    role:0,
    phoneno: '',   
    gender:'',
    invalid:false
  });
  const[controlValidationError,setcontrolValidationError]=useState({
    fields: {},
    errors: {}
});
  const  [tempForm, settempForm]  =useState({
    OTPFromRegistrationForm:'',
    name:'',
    password:'',
    role:0,
    phoneno: '',   
    gender:'',
  });

  const history = useHistory();
  useEffect(() => {
    createCaptcha();
}, []);


const InputEvent = (event) => {
  const { name, value } = event.target;
  setuserInfo((preVal) => {
      return {
          ...preVal,
          [name]: value,
      }
  })
};

const OTPFromRegistrationFormChange = (event) => {
      setOTPFromRegistrationForm(event.target.value);
};

  function handleValidation() {
    let fields = userInfo;
    let errors = {};
    let formIsValid = true;
    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }


    else if (!fields["role"]) {
      formIsValid = false;
      errors["role"] = "Role is required field";
    }

    else if (!fields["phoneno"]) {
      formIsValid = false;
      errors["phoneno"] = "phoneno is required field";
    }

    //Email
    else if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    else if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    setcontrolValidationError({ errors: errors });
    return formIsValid;
  }

  const redirectTo = (path) => {
    history.push(path);
  }

  const signUpUser = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      setisInvalidCaptcha(false);
      createCaptcha();
      return;
    }
    setsubmitted(true);
    setisInvalidCaptcha(false);
    if (!validateCaptcha()) {
      setisInvalidCaptcha(true);
      return;
    }
    setisInvalidMobileError(false);
    if (!isRegMobileNoVerified) {
      setisInvalidMobileError(true);
      return;
    }
    if (!handleValidation()) {
      setisInvalidCaptcha(false);
      createCaptcha();
      return;
    }
    let dataobj = {
      email: userInfo.email.toLowerCase(),
      name: userInfo.name,
      password: userInfo.password,
      role: Number(userInfo.role),
      phoneno: Number(userInfo.phoneno),
      gender: Number(userInfo.gender),
    }
    Registration(dataobj);
  };

  const Registration = async (load) => {
    let loadResponse = await Api.registration(load);
    if (loadResponse.status) {
      alert("Registration Successfully");
      redirectTo('/login')
    }
  };
  function getMessage(formcontrol, formControlName, fieldDisplayName) {
    return "verified";
    // return this.utilityservice.getErrorMessage(formcontrol, formControlName, fieldDisplayName);
  }

  function verifyRegMobOTP() {
    setisverifyOTPbtnClicked(true);
    if (OTPFromRegistrationForm == OTPFromAPI) {
      setisRegMobileNoVerified(true);
    } else {
      setisRegMobileNoVerified(false);
    }
  }

  function sendOTP(number) {
    GenerateOTP(number)
  }

  function GenerateOTP(number) {

    let dataobj = {
      "phone": number
    }
    GenerateOTPToPhone(dataobj);
  }

  const GenerateOTPToPhone = async (load) => {
    let loadResponse = await Api.GenerateOTPToPhone(load);
    if (loadResponse.status) {
      setOTPFromAPI(loadResponse.data.response.OTP);
    }
  };

  function loginUser(email, password) {
    let dataobj = {
      email: email,
      password: password
    }
    loginUserApiCall(dataobj);
  };
  const loginUserApiCall = async (load) => {
    let loadResponse = await Api.login(load);
    if (loadResponse.status) {
      if (loadResponse.data.token && loadResponse.data.token != "" && loadResponse.data.token != null) {
        let datainput = {};
        // this.utilityservice.navigateToSpecificPage(data.user.role);
        // this.utilityservice.onLoginSuccessfully.next();
      }
    }
  };

  function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    // code = captcha.join("");
    setcode(captcha.join(""));
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }

  function validateCaptcha() {
    //event.preventDefault();   //need to see this
    //  let docelement = document.getElementById("cpatchaTextBox") as HTMLInputElement
    if (captchaTextBoxValue == code) {
      return true;
    } else {
      this.createCaptcha();
      return false;
    }
  }
    return (
        <>
        <div     style={{ backgroundColor: 'rgb(167 194 203)' }}>
          <section className="testimonial" id="testimonial">
            <div className="container">
              <div className="row ">
                <div className="col-md-4 text-white text-center"  style={{ backgroundColor: '#5e828e7d',paddingBottom: '0rem' }}>
                  <div className=" ">
                    <div className="card-body">
                      <img src={RegistrationImg}   style={{maxWidth:'100%',height:'auto'}}/>
                      <div style={{ cursor: 'pointer', fontWeight: '600', fontSize: '20px' }}>Already Have An Account?</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8  border" style={{ marginBottom: '9%' }}>
                  <h4 className="pb-4">Please fill with your details</h4>
                  <div className="contact-form"  >
                    <form onSubmit={signUpUser}>
                      <div className="form-group">
                        <label className="control-label col-sm-2" for="name">First Name:</label>
                        <div className="col-sm-10">
                          <input className="form-control" id="name" type="text" onChange={InputEvent} value={userInfo.name} name="name"
                            placeholder="Name" />
                          <div>
                            <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto' }}>
                              {controlValidationError.errors["name"]}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-2" for="lname">Email:</label>
                        <div className="col-sm-10">
                          <input className="form-control" id="email" type="email" onChange={InputEvent} value={userInfo.email} name="email"
                            placeholder="Email Address" />
                          <div>

                            <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto' }}>
                              {controlValidationError.errors["email"]}
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginBottom: '15px' }}>
                        <div className="col" style={{ marginLeft: '15px' }}>
                          <label className="control-label col-sm-2" for="gender" style={{ paddingLeft: '2px' }}>Sex:</label>
                          <select value={userInfo.gender} onChange={InputEvent} className="form-control" name="gender">
                            <option value="1"> Male</option>
                            <option value="2"> Female</option>
                          </select>
                        </div>
                        <div className="col" style={{ marginRight: '18%' }}>
                          <label className="control-label col-sm-2" for="role" style={{ paddingLeft: '2px' }}>Role:</label>
                          <select value={userInfo.role} className="form-control" onChange={InputEvent} name="role">
                            <option value="0"> Patient</option>
                            <option value="1"> Doctor</option>
                            <option value="2"> Nurse</option>
                            <option value="3"> Physio</option>
                            <option value="4"> Pharmacist</option>
                            <option value="5"> Lab Technician</option>
                          </select>
                          <div>
                            {/* <div  style={{color:'red',fontSize: '14px',fontFamily: 'auto'}}>
                    Role is Required Field.
                  </div> */}
                            <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto' }}>
                              {controlValidationError.errors["role"]}
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginBottom: '15px' }}>
                        <div className="col" style={{ marginLeft: '15px' }}>
                          <label for="lname" style={{ paddingLeft: '2px' }}>Phone Number:</label>
                          <div style={{ width: '100%', float: 'left' }}>
                            <div style={{ width: '30%', float: 'left' }}>
                              <select className="form-control">
                                <option value="+91" selected> +91</option>
                              </select>
                            </div>
                            <div style={{ width: '70%', float: 'left' }}>
                              <input className="form-control" id="tel" type="tel" maxlength="10" onChange={InputEvent} value={userInfo.phoneno} name="phoneno"
                                placeholder="Phone Number" />
                            </div>
                          </div>

                          <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto' }}>
                            {controlValidationError.errors["phoneno"]}
                          </div>
                          {/* {submitted?   <div>
                  <div style={{color:'red',fontize:'14px',fontFamily:'auto'}}>
                    {{getMessage(userInfo.phoneno,'phoneno','Phoe No')}}</div>
                </div>:null} */}
                        </div>

                        <div class="col" style={{ marginRight: '18%', marginTop: '4%' }}>
                          {userInfo.phoneno.length == 10 ?
                            <div>
                              {isRegMobileNoVerified == false ? <form>
                                {!OTPFromAPI ? <input
                                  style={{ width: '34%', float: 'left', height: '36px', marginTop: '3px', borderRadius: '4px', fontSize: '14px', background: '#22a2b8' }}
                                  type="button" class="btn-primary" value="Send OTP" onClick={() => sendOTP(userInfo.phoneno)} /> : null}

                                {OTPFromAPI ?
                                  <input
                                    style={{ width: '32%', float: 'right', height: '35px', borderRadius: '0px', background: '#22a2b8', fontSize: '14px', marginTop: '1%' }}
                                    type="button" class="btn-primary" value="Verify OTP" onClick={() => verifyRegMobOTP()} /> : null}
                                {OTPFromAPI ? <input style={{ width: '61%', float: 'left', marginTop: '1%', marginLeft: '2%' }} type="text"
                                  class="form-control" maxlength="6" placeholder="Enter OTP" onChange={OTPFromRegistrationFormChange} value={OTPFromRegistrationForm} /> : null}

                              </form> : null}
                              {isRegMobileNoVerified ?
                                <div style={{ marginLeft: '-23%', marginTop: '4%' }}>
                                  <a><i class="fa fa-check-circle" aria-hidden="true" style={{ color: 'green', fontSize: '20px' }}></i></a>
                                </div> : null}
                              {isverifyOTPbtnClicked && !isRegMobileNoVerified ?
                                <div>
                                  <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto', width: '60%' }}>
                                    OTP does not matched
                      </div>
                                </div> : null}
                              {submitted && !isRegMobileNoVerified ?
                                <div>
                                  <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto', width: '75%' }}>
                                    Mobile Number is not verified
                      </div>
                                </div> : null}
                            </div> : null}
                        </div>
                      </div>
                      <div className="row" style={{ marginBottom: '15px' }}>
                        <div className="col" style={{ marginLeft: '15px' }}>
                          <label className="control-label col-sm-2" for="password" style={{ paddingLeft: '2px' }}>Password:</label>
                          <input type="text" id="password" value={userInfo.password} onChange={InputEvent} style={{ width: '39%' }} name="password" className="form-control" placeholder="Password"
                          />
                          <div>
                            {/* <div  style={{color:'red',fontSize: '14px',fontFamily: 'auto'}}>
                    Password is Required Field.
                  </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '9%;' }}>
                        <div class="col-sm-4">
                          <input className="form-control" id="cpatchaTextBox" autocomplete="off" placeholder="Enter Captcha" onChange={event => setcaptchaTextBoxValue(event.target.value)} />
                          {(submitted && isInvalidCaptcha) ? <div style={{ color: 'red', fontSize: '14px', fontFamily: 'auto' }}>
                            Invalid Captcha Code.
                  </div> : null}
                          <div id="captcha" style={{ float: 'left' }}></div>
                          <i class="fa fa-refresh" area-hidden="true" style={{ float: 'right', cursor: 'pointer', color: 'mediumblue', fontSize: '28px', paddingTop: '3%' }} onClick={() => createCaptcha()} ></i>
                        </div>
                      </div>
                      {/* {(submitted && inActiveEmailID) ? <div class="col-sm-12 col-sm-12 col-lg-12">
                        <em style={{ color: 'red' }}>{{ errorMessage }}</em>
                      </div> : null} */}
                    
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">

                          <div style={{ float: 'left', width: '100%' }}>
                            <div style={{ float: 'left', width: '40%' }}>
                              <div className="buttonSection">
                                <div className="text-center">
                                  <input type="submit" style={{ width: '200px;' }} value="Sign Up"
                                    className="btn btn-info btn-block rounded-0 py-2" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        </>
    )
}

export default Registration