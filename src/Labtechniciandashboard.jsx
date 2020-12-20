import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Labtechniciandashboard.module.css";
import { Labtechnicianprofile } from './Modals/Labtechnicianprofile'

const Labtechniciandashboard = () => {

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
                let tempdata = loadResponse.data.filter(function (item) {
                    return item.isCollectionCollected == true;
                });
                setDoctorListData(tempdata);
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

    function openUploadReport(data){

    }


    return (
        <>
            <div className="content" style={{ position: 'absolute', top: '17%', width: '100%' }}>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead style={{backgroundColor:'#17a2b8'}}>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Patient Name</th>
                                        <th scope="col">Patient Email</th>
                                        <th scope="col">Patient Address</th>
                                        <th scope="col">Is Collection Collected</th>
                                        <th scope="col">Patient Mob</th>
                                        <th scope="col">Patient testType</th>
                                        <th scope="col">Upload Report</th>                                
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        doctorListData.map((data, ind) => {
                                            console.log(data)
                                            return (

                                                <tr className="gaadiex-list">
                                                    <td scope="row">{ind + 1}.</td>

                                                    <td>{data.patientNname}</td>
                                                    <td>{data.patientEmail}</td>
                                                    <td>{data.patientAddres}</td>
                                                    <td>{data.isCollectionCollected? 'true': 'false'}</td>
                                                    <td>{data.patientMob}</td>
                                                    <td style={{textTransform: 'capitalize'}}>{data.testType}</td>

                                                    <td>
                                                        {!data.isReportGenerated && <a onClick="openUploadReport(data)" class="btn" style={{fontSize:'13px'}}><i class=" fa fa-upload" aria-hidden="true"></i> Upload Report</a>}
                                                        {data.isReportGenerated && <a class="btn" style={{fontSize:'13px',backgroundColor: 'green',cursor: 'not-allowed'}}><i class="fa fa-upload" aria-hidden="true"></i> Uploaded</a>}
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

            {showVerifyOTPPopup && <Labtechnicianprofile showVerifyOTPPopup={showVerifyOTPPopup} doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup} />}

        </>
    )
}

export default Labtechniciandashboard
