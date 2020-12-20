import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Labtechicianeditdisplaylist.moduele.css";
import { Labtechnicianprofile } from './Modals/Labtechnicianprofile'

const Labtechnicianeditdisplaylist = () => {

    const closeModalHandler = () => {
        setShow(false);
    }
    const [doctorid, setDoctorID] = useState('');

    const [inputForVerifyOTP1, setinputForVerifyOTP1] = useState({
        userEmail: '',
        OTPAPIValue: '',
        regMobileNo: '',
    });

    var PaymentEnumTypeArray = [
        { "id": 1, "name": "BookAppointment" },
        { "id": 2, "name": "LabTest" },
        { "id": 3, "name": "Medicine" },
        { "id": 4, "name": "MedicineLabTest" },
        { "id": 5, "name": "LabTestPackage" }
    ]


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [doctorListData, setDoctorListData] = useState([]);

    //openVerifyOTPPopup
    const [showVerifyOTPPopup, setShowVerifyOTPPopup] = useState(false);
    const closeVerifyOTPPopup = () => setShowVerifyOTPPopup(false);
    const openVerifyOTPPopup = () => setShowVerifyOTPPopup(true);


    useEffect(() => {
        var getDoctorsList = async (load,paymentTypeEnumKey) => {
            let loadResponse = await Api.getPaymentsList(load,paymentTypeEnumKey);
            if (loadResponse.status) {
                setDoctorListData(loadResponse.data);
            }
        };

        let dataobj = {};
        getDoctorsList(dataobj,null);


    }, []);

    var paymentType = '';

    function paymentTypeChangeEvent(e){
        const getDoctorsList = async (load,paymentTypeEnumKey) => {
            let loadResponse = await Api.getPaymentsList(load,paymentTypeEnumKey);
            if (loadResponse.status) {
                setDoctorListData(loadResponse.data);
            }
        };

        let dataobj = {};
        getDoctorsList(dataobj,e.target.value);    }

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
            <div style={{ position: 'absolute', top: '17%', left: '3%', width: '93%', right: '3%' }}>

                <div className="row">

                    <div style={{ width: '100%', float: 'left', marginBottom: '1%' }}>
                        <div style={{ width: '16%', float: 'left', marginLeft: '32%' }}>
                            <select class="form-control" style={{ fontSize: '12px', height: '28px' }} onChange={e => paymentTypeChangeEvent(e)}>

                                <option value="" selected>Search by PaymentType</option>
                                    {
                                    PaymentEnumTypeArray.map((opt, ind) => {
                                      console.log(opt)
                                      return (
                                        <option  value={opt.id}>{opt.name}</option>
                                              )
                                    })
                                  }
                            </select>
                        </div>
                    </div>


                    <table className="table table-hover my-0" style={{ textAlign: 'center' }}>
                        <thead style={{ backgroundColor: '#39b49b' }}>
                            <tr>
                                <th style={{ width: '5%' }}>S.No</th>
                                <th style={{ width: '13%' }}>Patient Email</th>
                                <th style={{ width: '13%' }} className="d-none d-xl-table-cell">Bank</th>
                                <th style={{ width: '13%' }} className="d-none d-xl-table-cell">Payment Type</th>
                                <th style={{ width: '13%' }} className="d-none d-xl-table-cell">Contact</th>
                                <th style={{ width: '13%' }} className="d-none d-xl-table-cell">Order ID</th>
                                <th className="d-none d-xl-table-cell" style={{ float: 'right' }}>Amount</th>
                                <th className="d-none d-xl-table-cell">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                doctorListData.map((data, ind) => {
                                    console.log(data)
                                    return (

                                        <tr className="gaadiex-list">
                                            <td>{ind + 1}.</td>

                                            <td>{data.patientEmail}</td>
                                            <td className="d-none d-xl-table-cell">{data.bank}</td>
                                            <td className="d-none d-md-table-cell" style={{ fontWeight: '600' }}>{data.paymentTypeEnumValue}</td>
                                            <td className="d-none d-xl-table-cell">{data.contact}</td>
                                            <td className="d-none d-xl-table-cell">{data.order_id}</td>
                                            <td className="d-none d-md-table-cell" style={{ textAlign: 'right', fontWeight: '600' }}>&#8377; {data.amount / 100}</td>
                                            <td className="d-none d-xl-table-cell" style={{ color: 'green' }}>{data.status}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                </div>
            </div>

            {showVerifyOTPPopup && <Labtechnicianprofile showVerifyOTPPopup={showVerifyOTPPopup} doctorid={doctorid} closeVerifyOTPPopup={closeVerifyOTPPopup} />}

        </>
    )
}

export default Labtechnicianeditdisplaylist
