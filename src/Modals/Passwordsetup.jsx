import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from '../api/apiService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 

import './Forgotpassword.css';

 export const Passwordsetup=(props) => {


    const [passwordInfo, setpasswordInfo] = useState(
        {oldpassword: '',
         newPassword: '',
        confirmPassword:''});

    const InputEventVerifyOTP = (event) => {
        const { name, value } = event.target;

        setpasswordInfo((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        })
    };
    // const forgotPasswordformSubmit = (e) => {
    //     e.preventDefault();
    //     if (passwordInfo.newPassword != passwordInfo.confirmPassword) {
    //         return;
    //       }
    //       let values;   
    //       values['newPassword'] = passwordInfo.newPassword;
    //       values['email'] = props.userEmail;
    //       values['isActivationRequired'] = props.isActivateAccountRequired;
    //       ForgotPassword(values);
    // };

    function forgotPasswordformSubmit() {
      //  e.preventDefault();
        if (passwordInfo.newPassword != passwordInfo.confirmPassword) {
            return;
          }
          let values={
            newPassword:passwordInfo.newPassword,
            email:props.userEmail,
            isActivationRequired:props.isActivateAccountRequired,
          }  
          ForgotPassword(values);
    };

    const ForgotPassword = async (load) => {
        let loadResponse = await Api.ForgotPassword(load);
        if (loadResponse.status) {
            alert("You have successfully changed your password")
            // history.push("/");
            // props.closePasswordSetupPopup();
        }
    };

    
    return(
            <> 
       <form>
            <Modal 
               show={props.showPasswordSetupPopup}
               onHide={props.closePasswordSetupPopup} 
               backdrop="static"
               keyboard={false}  >
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
                                   Password Setup
                    </h2>
                              </div>
                          </div>
                          <div className="formSection" style={{ textAlign: 'center' }}>
                              <div className="col-12" style={{ marginTtop: '3%' }}>
                                  <div className="row">
                                      <div className="col-sm-12">

                                          <div className="form-group">
                                              <span className="has-float-label">
                                              <input type="text" className="form-control" id="newPassword" name="newPassword" onChange={InputEventVerifyOTP}  value={passwordInfo.newPassword} placeholder="New Password" />
                                                  <label for="newPassword">New Password</label>
                                              </span>
                                          </div>
                                          <div className="form-group">
                                              <span className="has-float-label">
                                              <input type="text" className="form-control" id="confirmPassword" name="confirmPassword" onChange={InputEventVerifyOTP}  value={passwordInfo.confirmPassword} placeholder="Confirm Password" />
                                                  <label for="confirmPassword">Confirm Password</label>
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
                <div class="buttonSection" style={{width:'100%',float:'left'}}>
                      <button style={{width:'33%',float:'left'}} className="primartButton" type="button" onClick={()=>forgotPasswordformSubmit()}>Continue</button>
                      <button style={{width:'40%',float:'left'}}  className="secondryButton" type="reset">Cancel</button>
                  </div>
                  
              </Modal.Footer> 
            </Modal> 
            </form>
          </>   
        
    )

}


