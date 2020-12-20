import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Nursedashboard.module.css";
import { Labtechnicianprofile } from './Modals/Labtechnicianprofile'

const Nursedashboard = () => {

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
        var getDoctorsList = async (load) => {
            let loadResponse = await Api.getLabTestsBooking(load);
            if (loadResponse.status) {
                setDoctorListData(loadResponse.data);
            }
        };

        let dataobj = {};
        // if (this.currentUser.user.role != 11) {
        //   dataobj = {
        //     nurseID: this.currentUser.roleBaseId
        //   };
        // }
        getDoctorsList(dataobj);


    }, []);

    var paymentType = '';

    

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

    function openShowVisitForAll(data){

    }


    return (
        <>
            <div className="content" style={{ position: 'absolute', top: '17%', width: '100%' }}>
                <div className="row">
                    <div className="col-12 col-lg-8 col-xxl-9 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Lab Test List</h5>
                            </div>
                            <table className="table table-hover my-0">
                                <thead style={{backgroundColor: '#39b49b'}}>
                                    <tr>
                                        <th className="d-none d-xl-table-cell">S.No</th>
                                        <th className="d-none d-xl-table-cell">Nurse Name</th>
                                        <th className="d-none d-xl-table-cell">Patient Name</th>
                                        <th className="d-none d-xl-table-cell">Patient Mob</th>
                                        <th className="d-none d-xl-table-cell">Price</th>
                                        <th className="d-none d-xl-table-cell">Collection</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        doctorListData.map((data, ind) => {
                                            console.log(data)
                                            return (

                                                <tr className="gaadiex-list">
                                                    <td scope="row">{ind + 1}.</td>

                                                    <td className="d-none d-xl-table-cell">{data.nurseName}</td>
                                                    <td className="d-none d-xl-table-cell">{data.patientNname}</td>
                                                    <td className="d-none d-xl-table-cell">{data.patientMob}</td>
                                                    <td className="d-none d-xl-table-cell"><i className="fa fa-inr" style={{ fontSize: '15px' }} aria-hidden="true"></i> &nbsp;{data.price}</td>

                                                    <td>
                                                        {!data.isCollectionCollected && <a onClick="openShowVisitForAll(data)" className="btn" style={{ fontSize: '13px' }}><i className="fa fa-times" aria-hidden="true"></i>Not Collected</a>}
                                                        {data.isCollectionCollected && <a className="btn" style={{ fontSize: '13px', backgroundColor: 'green', cursor: 'not-allowed' }}><i className="fa fa-check" aria-hidden="true"></i> Collected</a>}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

            {showVerifyOTPPopup && <Labtechnicianprofile showVerifyOTPPopup={showVerifyOTPPopup} doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup} />}

        </>
    )
}

export default Nursedashboard
