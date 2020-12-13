import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 

import './Forgotpassword.css';

export const Example=({ show, handleClose,email }) => {

    const [forgotpasswordData,setforgotpasswordData]=useState({
        email:email
    })

    const forgotPasswordSubmit=()=>{
      //  e.preventDefault();
        alert(`
        My email id is ${forgotpasswordData.email}.
        `);    }

    const InputEventForgotPasswordEmail = (event) => {
        const { name, value } = event.target;

        setforgotpasswordData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        })
    };

    // const  openVerifyOTPPopup=()
    // {

    // }



    // public openVerifyOTPPopup() {
    //     this.inputForVerifyOTP.userEmail = this.forgotPasswordInfo.controls.email.value;
    //     this.forgotPasswordSet.emit(this.inputForVerifyOTP);
    //   }

      


    
    return(
            <> 
       <form>

            <Modal 
              show={show} 
              onHide={handleClose} 
              backdrop="static"
              keyboard={false} 
            > 
              {/* <Modal.Header closeButton> 
                <Modal.Title>Modal title</Modal.Title>  
              </Modal.Header>  */}
              <Modal.Body> 
            
                  <div className="overlay"></div>
                  <div className="popupContainer">
                      <div className="containerBlock">
                          <div className="rowDiv">

                              <div className="col-SectionLeft" style={{ width: '366px' }}>
                                  <h2 className="headingTitle" style={{
                                      fontFamily: 'Poppins,sans-serif',
                                      color: '#515151',
                                      lineHeight: '44px',
                                      marginTop: '0',
                                      marginLeft: '3%',
                                      marginBottom: '50px',
                                      fontWeight: '700',
                                      textTransform: 'uppercase'
                                  }}>
                                      FORGOT PASSWORD
                    </h2>
                              </div>
                          </div>
                          <div className="formSection" style={{ textAlign: 'center' }}>
                              <div className="col-12" style={{ marginTtop: '3%' }}>
                                  <div className="row">
                                      <div className="col-sm-12">

                                          <div className="form-group">
                                              <span className="has-float-label">
                                              <input type="email" className="form-control" id="email" name="email" onChange={InputEventForgotPasswordEmail}  value={forgotpasswordData.email} placeholder="Email" />

                                                 
                                                  {/* <input className="form-control" id="email"
                                                      formControlName="email" placeholder="Registered email id" /> */}
                                                  <label for="email">Email ID</label>

                                                  {/* <div *ngIf="submitted && forgotPasswordInfo.controls.email.errors" 
                              style={{"color:red;text-align: left;font-size:13px;">
                              <div *ngIf="forgotPasswordInfo.controls.email.errors.required">Email address is required</div>
                              <div *ngIf="forgotPasswordInfo.controls.email.errors.pattern">Please enter a valid email
                                  address</div>
                          </div>
                          <div className="invalid-feedback-error" *ngIf="submitted && errorMessage">
                              <div>{{errorMessage}}</div>
                          </div> */}
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

         
              </Modal.Body> 
              <Modal.Footer> 
                {/* <Button variant="primary" onClick={handleClose}> 
                  Close 
                </Button>  */}
                <div class="buttonSection" style={{width:'100%',float:'left'}}>
                      <button style={{width:'33%',float:'left'}} className="primartButton" type="button"  onClick={() => forgotPasswordSubmit()}>Send OTP</button>
                      <button style={{width:'40%',float:'left'}}  className="secondryButton" type="reset" onClick={handleClose}>Cancel</button>
                  </div>
                  
              </Modal.Footer> 
            </Modal> 
            </form>
          </>   
        
    )

}

