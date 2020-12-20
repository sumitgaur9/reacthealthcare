import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Phamracistdashboard.module.css";
import { Labtechnicianprofile } from './Modals/Labtechnicianprofile'

const Pharmacistdashboard = () => {

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
            let loadResponse = await Api.getPharmacyReqForHomeDel(load);
            if (loadResponse.status) {
                setDoctorListData(loadResponse.data);
            }
        };

        let dataobj = {};
        // if (this.currentUser.user.role != 11) {
        //   dataobj = {
        //     pharmacistID: this.currentUser.roleBaseId
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

    function openPharmacistVisitCompleteIntimation(data){

    }


    return (
        <>
            <div className="content" style={{ position: 'absolute', top: '17%', width: '96%', left: '2%', right: '2%' }}>
                <div className="container-fluid p-0">



                    <div className="row">
                        <div className="col-md-10">
                            <div className="card flex-fill w-100">
                                <div className="card-header">

                                    <h5 className="card-title mb-0">Pharmacy Provided Status</h5>
                                </div>
                                <div className="card-body d-flex">
                                    <div className="align-self-center w-100">
                                        <div className="py-3">
                                            <div className="chart chart-xs">
                                                <div style={{ display: 'block' }}>
                                                    <table className="table">
                                                        <thead style={{ backgroundColor: '#17a2b8' }}>
                                                            <tr>
                                                                <th scope="col">SNo</th>
                                                                <th scope="col">Pharmacist Name</th>
                                                                <th scope="col">Doctor Name</th>
                                                                <th scope="col">Patient Name</th>
                                                                <th scope="col">Pat Contact</th>
                                                                <th scope="col">Patient PIN</th>
                                                                <th scope="col">Dose Count</th>

                                                                <th scope="col">Pharmacy Provided</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                doctorListData.map((data, ind) => {
                                                                    console.log(data)
                                                                    return (

                                                                        <tr className="gaadiex-list">
                                                                            <td scope="row">{ ind+ 1}.</td>

                                                                            <td>{data.pharmacistName}</td>
                                                                            <td className="d-none d-xl-table-cell">{data.doctorName}</td>
                                                                            <td className="d-none d-xl-table-cell">{data.patientName}</td>
                                                                            <td className="d-none d-xl-table-cell">{data.patientContactNo}</td>
                                                                            <td className="d-none d-xl-table-cell">{data.patientPIN}</td>
                                                                            <td className="d-none d-xl-table-cell">{data.medicinesData.length}</td>

                                                                            <td>
                                                                                {!data.isPharmacyProvided && <a onClick="openPharmacistVisitCompleteIntimation(data)" className="btn" style={{ fontSize: '13px', backgroundColor: '#007bff' }}><i className="fa fa-times" aria-hidden="true"></i> Comp Visit</a>}
                                                                                {data.isPharmacyProvided && <a className="btn" style={{ fontSize: '13px', backgroundColor: 'green', cursor: 'not-allowed' }}><i className="fa fa-check" aria-hidden="true"></i> Provided</a>}
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
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {showVerifyOTPPopup && <Labtechnicianprofile showVerifyOTPPopup={showVerifyOTPPopup} doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup} />}

        </>
    )
}

export default Pharmacistdashboard
