import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import styles from "./Doctoreditdisplaylist.module.css";
import { Doctorprofile } from './Modals/Doctorprofile'
import { Companymaster } from './Modals/Companymaster'


const Doctoreditdisplaylist = () => {

    const closeModalHandler = () => {
        setShow(false);
    }
    const [doctorid, setDoctorID] = useState('');

    const [inputForVerifyOTP1, setinputForVerifyOTP1] = useState({
        userEmail: '',
        OTPAPIValue: '',
        regMobileNo: '',
    });

    const [currentUser, setcurrentUser] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [doctorListData, setDoctorListData] = useState([]);

    //openVerifyOTPPopup
    const [showVerifyOTPPopup, setShowVerifyOTPPopup] = useState(false);
    const closeVerifyOTPPopup = () => setShowVerifyOTPPopup(false);
    const openVerifyOTPPopup = () => setShowVerifyOTPPopup(true);


    useEffect(() => {
        setcurrentUser(JSON.parse(window.sessionStorage.getItem("userToken")));

        const getDoctorsList = async (load) => {
            let loadResponse = await Api.getDoctorsList(load);
            if (loadResponse.status) {
                setDoctorListData(loadResponse.data);
            }
        };

        let dataobj = {};
        getDoctorsList(dataobj);


    }, []);

    // arrayBufferToBase64local((buffer) => {
    //     alert(buffer)
    //     //val.newimage.data.data
    //     //
    //   })

    function arrayBufferToBase64local(buffer) {
        return arrayBufferToBase64(buffer)
    }

    function openDoctorProfilePopup(id){
        setDoctorID(id);
        // alert(doctorid)
        setShowVerifyOTPPopup(true)
    }


    return (
        <>
            <div className="container" style={{ position: 'absolute', top: '17%', left: '7%' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.card}>
                            {/* <div className="card-header">
                            </div> */}
                                {
                                    doctorListData.map((data, ind) => {
                                        console.log(data)
                                        return (
                                            <div className={styles['gaadiex-list']}>
                                                <div className={[styles['gaadiex-list-item'], styles['border-b1']].join(' ')} style={{ marginBottom: '5px', height: '185px', border: '3px solid rgb(57 180 155 / 32%)' }}>
                                                    <div className="row" style={{ width: '100%', float: 'left' }}>
                                                        <div style={{ width: '11%', float: 'left' }}>

                                                            <img className={styles['gaadiex-list-item-img']}
                                                                src={arrayBufferToBase64local(data.newimage?.data?.data) || 'https://i.pinimg.com/originals/8c/8b/37/8c8b3766126753c6d098cdb2e42cff49.png'} alt="Photo of sunset" />
                                                        </div>
                                                        <div style={{ width: '1%', float: 'left' }}>
                                                        </div>
                                                        <div style={{ width: '66%', float: 'left' }}>
                                                            <div className="gaadiex-list-item-text">

                                                                <div style={{ width: '86%', float: 'left', height: '55px' }}>
                                                                    <div style={{ width: '40%', float: 'left' }}>
                                                                        <h5 className="item-card-title mt-3 mb-3" style={{ fontWeight: '700', color: '#39b49b' }}>Dr. {data.name}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                                <div style={{width:'10%',float:'right'}}>
                                                                    <div style={{width:'30%',float:'left'}} className="card-title1">
                                                                    {currentUser.user.role==11 && <i className="fa fa-pencil" style={{fontSize: '20px'}} aria-hidden="true"
                                                                        onClick={() => openDoctorProfilePopup(data._id)}></i> } 
                                                                        {/* <i className="fa fa-pencil" style={{fontSize: '20px'}} aria-hidden="true"
                                                                        onClick={() => openVerifyOTPPopup(true)}></i> */}
                                                                    </div>
                                                                    <div style={{float:'left',width:'4%'}} className="card-title1">
                                                                    {currentUser.user.role==11 &&  <i className="fa fa-trash" aria-hidden="true"
                                                                        style={{color:'red',fontSize: '20px'}}></i> } 
                                                                   
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div style={{ width: '60%', float: 'left', marginBottom: '3%' }}>
                                                                <div style={{ width: '42%', float: 'left' }}>
                                                                    <h6 className="rupeesymbol"><span style={{ fontWeight: 'bold' }}> {data.experties}</span></h6>
                                                                </div>
                                                                <div style={{ width: '30%', float: 'right' }}>
                                                                    <h6 className="rupeesymbol">Charges: {' '}
                                <span style={{ fontWeight: 'bold' }}> {data.charges.toLocaleString('en-IN')}</span></h6>
                                                                </div>
                                                            </div>
                                                            <p className="card-text" style={{ float: 'left' }}>
                                                                {data.description}
                                                            </p>

                                                        </div>
                                                        <div style={{ width: '2%', float: 'left' }}>
                                                        </div>
                                                        <div style={{ width: '20%', float: 'left', paddingTop: '2%' }}>

                                                            <p style={{ fontSize: '18px !important', fontWeight: 'bold' }}><img src="https://www.blkhospital.com/images/phone-icon.png"
                                                                style={{ float: 'left', verticalAlign: 'middle', width: '11%', paddingTop: '2px', height: 'auto' }} />
                                                                +91-9716342619</p>
                                                            <a style={{ cursor: 'pointer', backgroundColor: '#3eb299', height: '33px', color: '#fff', padding: '5px 25px', display: 'inline-block', boxShadow: '5px 1px 30px rgba(0,0,0,0.4)' }}
                                                            >Book an Appointment{' '} <span className={`white ${styles.bgpink}`}>
                                                                </span></a>

                                                            <div style={{ textAlign: 'left' }} className="mkssssssss">
                                                                <p style={{ marginBottom: '3px', marginTop: '8px' }}><strong>Days: </strong>Mon - Sat</p>
                                                                <p style={{ marginBottom: '5px' }}><strong>Time: </strong>9:00 am to 5:00 pm</p>
                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            
                        </div>
                    </div>
                </div>
            </div>

            {showVerifyOTPPopup && <Doctorprofile showVerifyOTPPopup={showVerifyOTPPopup}  doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup}/>}
            {/* {showVerifyOTPPopup && <Companymaster showVerifyOTPPopup={showVerifyOTPPopup}  doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup}/>} */}

            
    {/* <Doctorprofile showVerifyOTPPopup={showVerifyOTPPopup}  doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup}></Doctorprofile>  */}

        </>
    )
}

export default Doctoreditdisplaylist