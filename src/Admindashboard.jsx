import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { ToDisplayDateFormat } from './utils/utils'
import stylesNur from "./Admindashboard.module.css";
import { Confirmation } from './Modals/Confirmation'

const Admindashboard = () => {

    const closeModalHandler = () => {
        setShow(false);
    }
    const [showData, setshowData] = useState('');

    const [inputForVerifyOTP1, setinputForVerifyOTP1] = useState({
        userEmail: '',
        OTPAPIValue: '',
        regMobileNo: '',
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [doctorListData, setDoctorListData] = useState([]);

    const [requestId, setrequestId] = useState('');

    //openVerifyOTPPopup
    const [showVerifyOTPPopup, setShowVerifyOTPPopup] = useState(false);
    const closeVerifyOTPPopup = () => setShowVerifyOTPPopup(false);
    const openVerifyOTPPopup = () => setShowVerifyOTPPopup(true);

    const closeWithYesVerifyOTPPopup = () => {
        const Save_ApproveMedicineReqUsingPrescription = async (load) => {
            let loadResponse = await Api.Save_ApproveMedicineReqUsingPrescription(load);
            if (loadResponse.status) {
                setShowVerifyOTPPopup(false); 
                getUploadPrescriptionForMedicineApprovalsList({})  
            }
        };

        let dataobj = {
            requestId: requestId,
            approvalDate: ToDisplayDateFormat(new Date()),
        }  
        Save_ApproveMedicineReqUsingPrescription(dataobj);

    }
    
    const getUploadPrescriptionForMedicineApprovalsList = async (load) => {
        let loadResponse = await Api.Get_UploadPrescriptionForMedicineApprovalsList(load);
        if (loadResponse.status) {
            let a = loadResponse.data;
            if(a && a.length){
                 console.log("api call useEffect")
                 setDoctorListData(a);
            }                
        }
    };

    useEffect(() => {
        

        let dataobj = {};      
        getUploadPrescriptionForMedicineApprovalsList(dataobj);

    }, []);


    function openConfirmationPopup(data){
        setrequestId(data._id);
        let str = "Are you sure, you want to approve request for " + data.medicineName +" ?";
        setshowData(str);
        setShowVerifyOTPPopup(true)
    }


    return (
        <>
            <div className="content" style={{ position: 'absolute',top: '17%',width:'96%',left:'2%',right:'2%' }}>
                <div className="container-fluid p-0">


                    <div class="row mb-2 mb-xl-3">
                        <div class="col-auto d-none d-sm-block">
                            <h3 style={{color:'#39b49b'}}><strong style={{color:'#39b49b'}}>Admin</strong> Dashboard</h3>
                        </div>
                        <div class="col-auto ml-auto text-right mt-n1">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb bg-transparent p-0 mt-1 mb-0">
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-lg-12 col-xxl-9 d-flex">
                            <div class="card flex-fill">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Medicine Approval Requests</h5>
                                </div>
                            

                            <table className="table table-hover my-0">
                                <thead style={{backgroundColor: '#39b49b'}}>
                                    <tr>
                                    <th class="d-none d-md-table-cell">Medicine Name</th>
                                    <th class="d-none d-xl-table-cell">
                                    <span style={{cursor: 'pointer'}}>
                                        <span>Patient Info</span>                     
                                    </span></th>
                                    <th class="d-none d-md-table-cell">Pat Contact</th>
                                    <th class="d-none d-md-table-cell">Req Date</th>
                                    <th>Pharmacy Req</th>
                                    <th class="d-none d-md-table-cell">Approval Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        doctorListData.map((data, ind) => {
                                            console.log(data)
                                            return (

                                                <tr>

                                                    <td class="d-none d-md-table-cell">{data.medicineName}</td>

                                                    <td class="d-none d-xl-table-cell">{data.patientNname}/{data.patientAge}-{data.patientSex==1 ? 'M': 'F'}</td>

                                                    <td class="d-none d-md-table-cell">{data.phoneno}</td>
                                                    <td class="d-none d-md-table-cell">{data.RequestDate}</td> 

                                                    <td>
                                                        <span onClick={()=>{!data.isPrescriptionRequestApproved ? openConfirmationPopup(data) : openConfirmationPopup(null)}} className={data.isPrescriptionRequestApproved ? 'badge badge-success deactivevisitispharmacyprovide ' : 'badge badge-warning  activevisitispharmacyprovide'}>{data.isPrescriptionRequestApproved === true ? 'Approved' : 'To Be Approved'}</span>
                                                    </td>

                                                    <td class="d-none d-md-table-cell">{data.approvalDate}</td> 

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
            {showVerifyOTPPopup && <Confirmation showVerifyOTPPopup={showVerifyOTPPopup} showData={showData} closeVerifyOTPPopup={closeVerifyOTPPopup}  closeWithYesVerifyOTPPopup={closeWithYesVerifyOTPPopup}/>}

        </>
    )
}

export default Admindashboard
