import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'
import { arrayBufferToBase64, getBase64 } from '../utils/utils'
import RegistrationImg from '../../src/images/registration-img.png';

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 

import styles from './Confirmation.module.css';

 export const Confirmation=(props) => {

   return (
     <>
       <form>

         <Modal
           show={props.showVerifyOTPPopup}
           onHide={props.closeVerifyOTPPopup}
           backdrop="false"
           keyboard={false}
         >

           <Modal.Body>
           <button type="button" className="close" onClick={props.closeVerifyOTPPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>

             <div className="overlay"></div>
             <div className="popupContainer">
               <div className="containerBlock" style={{ height: '191px' }}>
                 <div className="formSection">
                   <div className="container">
                     <h2 className="text-center"></h2>
                     <div className="row justify-content-center">
                       <div className="col-8">
                         <div className="card" style={{ border: '1px solid white!important', flexDirection: 'inherit', marginTop: '11%' }}>
                           <div className="card-header p-0">
                           </div>
                           <div className="card-body p-3">
                             {props.showData && <p className={styles.confirmationtext}>{props.showData}</p>}
                             {!props.showData && <p className={styles.confirmationtext}>Are You Sure About It?</p>}
                           </div>
                         </div>
                       </div>
                       <div className="col-md-4">
                         <img className="otpPopup-img" src={RegistrationImg} alt="congratulationsImg" />
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

           </Modal.Body>
           <Modal.Footer>


             <div style={{ width: '100%', float: 'left', marginBottom: '-9px' }}>
               <div style={{ width: '21%', float: 'left', marginLeft: '21%' }}>
                 <div className="buttonSection">
                   <div className="text-center">
                     <input type="button" onClick={props.closeWithYesVerifyOTPPopup} style={{ border: 'none', width: '200px', fontSize: '20px', backgroundColor: '#2e6993' }} value="Yes" className="btn btn-info btn-block rounded-0 py-2" />
                   </div>
                 </div>
               </div>
               <div style={{ width: '13%', float: 'right', marginRight: '36%' }}>
                 <div className="buttonSection">
                   <div className="text-center">
                     <input type="button" onClick={props.closeVerifyOTPPopup} style={{ border: 'none', width: '200px', fontSize: '20px', backgroundColor: '#eabb2b' }} value="No" className="btn btn-info btn-block rounded-0 py-2" />
                   </div>
                 </div>
               </div>
             </div>

           </Modal.Footer>
         </Modal>
       </form>
     </>

   )


    

}


