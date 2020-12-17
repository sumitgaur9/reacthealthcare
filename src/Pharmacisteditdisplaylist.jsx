import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Pharmacisteditdisplaylist.module.css";
import { Pharmacistprofile } from './Modals/Pharmacistprofile'

const Pharmacisteditdisplaylist = () => {

    const closeModalHandler = () => {
        setShow(false);
    }
    const [doctorid, setDoctorID] = useState('');

    const [inputForVerifyOTP1, setinputForVerifyOTP1] = useState({
        userEmail: '',
        OTPAPIValue: '',
        regMobileNo: '',
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [doctorListData, setDoctorListData] = useState([]);

    //openVerifyOTPPopup
    const [showVerifyOTPPopup, setShowVerifyOTPPopup] = useState(false);
    const closeVerifyOTPPopup = () => setShowVerifyOTPPopup(false);
    const openVerifyOTPPopup = () => setShowVerifyOTPPopup(true);


    useEffect(() => {
        const getDoctorsList = async (load) => {
            let loadResponse = await Api.getPharmacistsList(load);
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
        <div className="container mt-2" style={{ position:'absolute',top:'17%',left:'7%'}}>
        <div style={{ marginBottom:'1%'}}>
        </div>
                    <div className="row">
                            
                    {
                        doctorListData.map((data, ind) => {
                            console.log(data)
                            return (

                                <div className={`col-md-3 col-sm-6 ${stylesNur.item}`}>

                                    <div className={[stylesNur['card'], stylesNur['item-card']].join(' ')} style={{ padding: '2% 2%' }}>
                                        <img src={arrayBufferToBase64local(data.newimage?.data?.data) || 'https://icons.iconarchive.com/icons/icons-land/medical/256/People-Pharmacist-Male-icon.png'} alt="Photo of sunset" />
                                        <h5 className={`mt-3 mb-3 ${stylesNur['item-card-title']}`} style={{ fontWeight: '800' }}>{data.name}</h5>
                                       
                                        <p className="card-text">{data.description}</p>

                                        <div style={{float:'left',width:'100%'}}>
                                            <div style={{float:'left',width:'96%'}} class="card-title1">
                                                <i class="fa fa-pencil" onClick={() => openDoctorProfilePopup(data._id)}></i>
                                            </div>
                                            <div style={{float:'left',width:'4%'}} class="card-title1">
                                            <i class="fa fa-trash" aria-hidden="true" style={{color:'red'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                            
                        
                    </div>
                </div>
            
        {showVerifyOTPPopup && <Pharmacistprofile showVerifyOTPPopup={showVerifyOTPPopup}  doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup}/>}

        </>
    )
}

export default Pharmacisteditdisplaylist
