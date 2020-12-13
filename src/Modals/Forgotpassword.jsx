import React from 'react'

import './Modal.css'
import './Forgotpassword.css';

export const ModalForgotPassword = ({ showForgotPassword, closeForgotPassword }) => {
  return (
    <div className="modal-wrapper"
      style={{
        transform: showForgotPassword ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: showForgotPassword ? '1' : '0'
      }}
    >
      {/* <div className="modal-header">
        <p>Welcome To Our Site</p>
        <span onClick={closeForgotPassword} className="close-modal-btn">x</span>
      </div> */}
      <div className="modal-content">
        <div className="modal-body">
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
                                                  <input className="form-control" id="email"
                                                      formControlName="email" placeholder="Registered email id" />
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

              </div>
              <div className="modal-footer">
                  {/* <button onClick={closeForgotPassword} className="btn-cancel">Close</button> */}
                  <div class="buttonSection" style={{width:'100%',float:'left'}}>
                      <button style={{width:'30%',float:'left'}} class="primartButton" type="submit" onClick={closeForgotPassword}>Send OTP</button>
                      <button style={{width:'40%',float:'left'}}  class="secondryButton" type="reset" onClick={closeForgotPassword}>Cancel</button>
                  </div>

              </div>
          </div>
    </div>
  )
};