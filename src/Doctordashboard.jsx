import React, { useState, useEffect,useRef } from 'react'
import Api from './api/apiService'
import {Pie, Doughnut,Bar} from 'react-chartjs-2';
import { ToDisplayDateFormat } from './utils/utils'

import noimgfound from '../src/images/nodatafound.png';
import stylesPatDesh from "./Patientdashboard.module.css";
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ReqMedHomeDel } from './Modals/ReqMedHomeDelivery'



//OverlayTrigger
import Button from 'react-bootstrap/Button';


const Doctordashboard = () => {
  const [doctorAppointmentHistoryListData, setdoctorAppointmentHistoryListData] = useState([]);
  const [doctorUpComingAppointmentData, setdoctorUpComingAppointmentData] = useState([]);
  const [showRequestPatMedHomeDelivery, setshowRequestPatMedHomeDelivery] = useState(false);
  const [apptHistoryData, setapptHistoryData] = useState([]);
  const [reqByDoctorId, setreqByDoctorId] = useState('');
  const [reqByPatientId, setreqByPatientId] = useState('');
  const [reqByAppointmentDate, setreqByAppointmentDate] = useState('');
  const [reqByDoctorName, setreqByDoctorName] = useState('');
  const [commonDashBoardCountData, setcommonDashBoardCountData] = useState({
    total_no_of_doctors: 0,
    total_no_of_nurses: 0,
    total_no_of_patients: 0,
    total_no_of_pharmacists: 0,
  });
  const [diseaseWiseApptCount, setdiseaseWiseApptCount] = useState({});
  const [medicineWiseApptCount, setmedicineWiseApptCount] = useState({});
  const [pharmacistWiseApptCount, setpharmacistWiseApptCount] = useState({});
  const [doctorWiseApptCount, setdoctorWiseApptCount] = useState({});
  const [monthlyHomeOnlineApptCount, setmonthlyHomeOnlineApptCount] = useState({});
  const [completeDoctorVisitData, setcompleteDoctorVisitData] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  const [visitAppointmentId, setvisitAppointmentId] = useState('');
  const [patientname, setpatientname] = useState('');

  const [inputrequesPatMedHomeDelivery, setinputrequesPatMedHomeDelivery] = useState({
    patientNname: '',
    patientMob: '',
    patientPIN: '',
    patientAddres: '',
  })
  const [diseaseWiseCountPieChartLabels, setdiseaseWiseCountPieChartLabels] = useState([]);
  const [diseaseWiseCountPieChartData, setdiseaseWiseCountPieChartData] = useState([]);

  const [pharmacistWiseCountPieChartLabels, setpharmacistWiseCountPieChartLabels] = useState([]);
  const [pharmacistWiseCountPieChartData, setpharmacistWiseCountPieChartData] = useState([]);

  const [onlineHomeVistBarChartLabels, setonlineHomeVistBarChartLabels] = useState([]);
  const [barChartData, setbarChartData] = useState([
    {
      data: [],
      label: 'HomeVisitCount',
    },
    { data: [], label: 'OnlineConsultationCount' }
  ]);

  const [currentUser, setcurrentUser] = useState({});
  const [usersParams, setusersParams] = useState({});
  const [historyApptSortParam, sethistoryApptSortParam] = useState({});
  const [patientMedicinesHomeDelivery, setpatientMedicinesHomeDelivery] = useState([]);
  const [popoverstate, setpopoverstate] = useState({
    open: false
  });
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const diseasesWiseCountPieChart = {
    labels: diseaseWiseCountPieChartLabels,
    datasets: [{
      data: diseaseWiseCountPieChartData,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };
  const pharmacistWiseCountPieChart = {
    labels: pharmacistWiseCountPieChartLabels,
    datasets: [{
      data: pharmacistWiseCountPieChartData,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };
  const onlineHomeVisitChart = {
    labels: onlineHomeVistBarChartLabels,
    datasets: [
      {
        label: barChartData[0].label,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: barChartData[0].data
      },
      {
        label: barChartData[1].label,
        backgroundColor: 'red',
        borderColor: 'yellow',
        borderWidth: 2,
        data: barChartData[1].data
      }
    ]
  }

  useEffect(() => {
    Get_CommonDashboardCount();
    Get_DiseaseWiseApptCount();
    Get_PharmacistWiseApptCount();
    Get_MonthlyHomeOnlineApptCount();
    Get_PatientMedicinesHomeDelivery();
  }, []);

  const Get_DiseaseWiseApptCount = async () => {
    let dataobj = {
    };
    let doctorID;
    //  if (this.currentUser.user.role != 11) {
    doctorID = '5f65dc7169364d00044f2fa2';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_DiseaseWiseApptCount(dataobj, doctorID);
    if (loadResponse.status) {
      let dataarray = loadResponse.data;
      if (dataarray && dataarray.length > 0) {
        for (var i = 0; i < dataarray.length; i++) {
          if (dataarray[i].apptCount > 0) {
            setdiseaseWiseCountPieChartLabels(oldArray => [...oldArray, dataarray[i].diseaseName]);
            setdiseaseWiseCountPieChartData(oldArray => [...oldArray, dataarray[i].apptCount]);
          }
          console.log("  this.Get_DiseaseWiseApptCount  this.Get_DiseaseWiseApptCount", dataarray)
        }
      }
    }

  }

  const Get_PharmacistWiseApptCount = async () => {
    let dataobj = {
    };
    let doctorID;
    //  if (this.currentUser.user.role != 11) {
    doctorID = '5f65dc7169364d00044f2fa2';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_PharmacistWiseApptCount(dataobj, doctorID);
    if (loadResponse.status) {
      let dataarray = loadResponse.data;
      if (dataarray && dataarray.length > 0) {
        for (var i = 0; i < dataarray.length; i++) {
          if (dataarray[i].apptCount > 0) {
            setpharmacistWiseCountPieChartLabels(oldArray => [...oldArray, dataarray[i].pharmacistName]);
            setpharmacistWiseCountPieChartData(oldArray => [...oldArray, dataarray[i].apptCount]);
          }
          console.log("  this.Get_PharmacistWiseApptCount  this.Get_PharmacistWiseApptCount", dataarray)
        }
      }
    }
  }

  const Get_MonthlyHomeOnlineApptCount = async () => {
    let dataobj = {
    };
    let doctorID;
    //  if (this.currentUser.user.role != 11) {
    doctorID = '5f65dc7169364d00044f2fa2';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_MonthlyHomeOnlineApptCount(dataobj, doctorID);
    if (loadResponse.status) {
      let dataarray = loadResponse.data;
      var lablehomevisitdataandseriesname = {
        data: [],
        label: 'HomeVisitCount',
      }
      var lableOnlineConsultationCountdataandseriesname = {
        data: [],
        label: 'OnlineConsultationCount',
      }
      let barchartDataArray = [
        {
          data: [],
          label: 'HomeVisitCount',
        },
        { data: [], label: 'OnlineConsultationCount' }
      ]

      if (dataarray && dataarray.length > 0) {
        for (var i = 0; i < dataarray.length; i++) {
          setonlineHomeVistBarChartLabels(oldArray => [...oldArray, dataarray[i].Month]);
          barchartDataArray[0].data.push(dataarray[i].HomeVisitCount)
          barchartDataArray[1].data.push(dataarray[i].OnlineConsultationCount)
        }
      }
      setbarChartData(barchartDataArray);
      console.log("  this.Get_PharmacistWiseApptCount  this.Get_PharmacistWiseApptCount", dataarray)
    }

  }

  const Get_PatientMedicinesHomeDelivery = async () => {
    let dataobj = {
    };
    let loadResponse = await Api.Get_PatientMedicinesHomeDelivery(dataobj);
    if (loadResponse.status) {
      let dataarray = loadResponse.data;
      if (dataarray && dataarray.length > 0) {
        setpatientMedicinesHomeDelivery(dataarray);
        Get_AppointmentsByDocID();
      }
    }
  }

  function closeRequestPatMedHomeDelivery(calllistapi) {
    setshowRequestPatMedHomeDelivery(false);
   // $('#showRequestPatMedHomeDeliveryModal').modal('hide');
    if(calllistapi)
    {
     // this.Get_PatientMedicinesHomeDelivery();//indise this we already call Get_AppointmentsByDocID api
    }
  }

  function openRequestPatMedHomeDelivery(data) {
    // if(!data.isVisitCompleted){
    //   this.toastr.warning('Complete its Visit first');
    //   return;
    // }
    setshowRequestPatMedHomeDelivery(true);
    setvisitAppointmentId(data._id);
    setreqByDoctorId(data.doctorID);
    setreqByPatientId(data.patientID);
    setreqByDoctorName(data.doctorName);
    setreqByAppointmentDate(setreqByAppointmentDate);
    //setreqByAppointmentDate = this.utilityservice.ToDBDateFormat(data.appointmentDate);
    console.log("data is this", data);
   // inputrequesPatMedHomeDelivery(setreqByAppointmentDate);
    setreqByAppointmentDate(setreqByAppointmentDate);
    setreqByAppointmentDate(setreqByAppointmentDate);
    setinputrequesPatMedHomeDelivery({...inputrequesPatMedHomeDelivery,
       patientNname: data.patientNname,
      patientMob:data.patientMob,
      patientPIN:data.patientPIN,
      patientAddres:data.patientAddres,
     });

   
    // setTimeout(() => {
    //   $(window).scrollTop(0);
    //   $('#showRequestPatMedHomeDeliveryModal').modal('show');
    // }, 100);
  }

  function valueoftimeslot(id) {
    switch (id) {
      case 0:
        return '10 AM - 11 AM';
        break;
      case 1:
        return '11 AM - 12 AM';
        break;
      case 2:
        return '12 PM - 01 PM';
        break;
      case 3:
        return '01 PM - 02 PM';
        break;
      case 4:
        return '02 PM - 03 PM';
        break;
      case 5:
        return '03 PM - 04 PM';
        break;
      case 6:
        return '04 PM - 05 PM';
        break;
      case 7:
        return '05 PM - 06 PM';
        break;
    }
  }

  function getTimeSlotAmPm(sheduledTime) {
    let splitbycolon = sheduledTime.split(':');
    //  let getHours=sheduledTime.substring(0, 2);
    if (splitbycolon[0] <= 12) {
      return sheduledTime + 'AM'
    }
    else {
      let getTime = parseInt(splitbycolon[0]) - 12;
      let finalTime = getTime.toString() + ':' + splitbycolon[1] + ':' + splitbycolon[2] + 'PM'
      return finalTime
    }
  }

  function getTimeSlot(id) {
    switch (id) {
      case 0:
        return '10 AM - 11 AM';
        break;
      case 1:
        return '11 AM - 12 AM';
        break;
      case 2:
        return '12 PM - 01 PM';
        break;
      case 3:
        return '01 PM - 02 PM';
        break;
      case 4:
        return '02 PM - 03 PM';
        break;
      case 5:
        return '03 PM - 04 PM';
        break;
      case 6:
        return '04 PM - 05 PM';
        break;
      case 7:
        return '05 PM - 06 PM';
        break;
    }
  }

  function getMaxDate(tempReqPatMedDelAppointmentDateIdArray) {
    let maxdateAndApptId;
    if (tempReqPatMedDelAppointmentDateIdArray.length > 0) {
      maxdateAndApptId.maxDate = tempReqPatMedDelAppointmentDateIdArray[0].appointmentDate;
      maxdateAndApptId.apptId = tempReqPatMedDelAppointmentDateIdArray[0].appointmentId
    }
    for (var i = 0; i < tempReqPatMedDelAppointmentDateIdArray.length; i++) {
      if (maxdateAndApptId.maxDate < tempReqPatMedDelAppointmentDateIdArray[i].appointmentDate) {
        maxdateAndApptId.maxDate = tempReqPatMedDelAppointmentDateIdArray[i].appointmentDate;
        maxdateAndApptId.apptId = tempReqPatMedDelAppointmentDateIdArray[i].appointmentId
      }

    }
    return maxdateAndApptId;
  }

  const Get_AppointmentsByDocID = async () => {
    // let dataobj = {
    //   doctorID: this.currentUser.user.role != 11 ? this.currentUser.roleBaseId : null,
    //   sortBy: this.usersParams.sortBy,
    //   sortDir: this.usersParams.sortDir
    // }
    let dataobj = {
      doctorID: '5f65dc7169364d00044f2fa2',
      sortBy: '',
      sortDir: ''
    }
    if (dataobj.doctorID == null) {
      delete dataobj.doctorID;
    }
    let loadResponse = await Api.Get_AppointmentsByDocID(dataobj);
    if (loadResponse.status) {
      let dataarray = loadResponse.data;
      console.log("Get_AppointmentsByDocIDdataarraydataarraydataarray", dataarray)
      //if (dataarray && dataarray.length > 0) {
      setdoctorAppointmentHistoryListData([]);
      let tempdoctorAppointmentHistoryListDataArray = [];
      setdoctorUpComingAppointmentData([]);
      let tempdoctorUpComingAppointmentDataArray = [];
      let tempcompleteDoctorVisitDataArray = [];
      tempcompleteDoctorVisitDataArray = dataarray;
      tempcompleteDoctorVisitDataArray.forEach(element => {
        let tempReqPatMedDelAppointmentDateIdArray = [];
        element.individualsymptom = '';
        element["patientnameForApptHistory"] = element.patientNname;//this is required for fix the problem of sorting
        element.appointmentDate = new Date(element.appointmentDate);
        element.appointmentDate = ToDisplayDateFormat(new Date(element.appointmentDate));
        element.symptomsData.forEach(element1 => {
          element.individualsymptom = element.individualsymptom + ' ' + element1.symptomName + ','
        });
        element.individualillness = '';
        element.illnessHistoryData.forEach(element2 => {
          element.individualillness = element.individualillness + ' ' + element2.illnessName + ','
        });
        element["patientMedicinesHomeDelivery"] = [];
        let patientMedicinesHomeDeliveryInfo = patientMedicinesHomeDelivery.filter(function (item) {
          return (item.doctorID == element.doctorID && item.patientID == element.patientID)
        });

        for (var i = 0; i < patientMedicinesHomeDeliveryInfo.length; i++) {
          if (patientMedicinesHomeDeliveryInfo[i].appointmentDate != undefined && patientMedicinesHomeDeliveryInfo[i].appointmentDate != null && patientMedicinesHomeDeliveryInfo[i].appointmentDate != '') {
            let tempReqPatMedApptIdDateObj = {};
            tempReqPatMedApptIdDateObj.appointmentId = patientMedicinesHomeDeliveryInfo[i].appointmentID;

            tempReqPatMedApptIdDateObj.appointmentDate = patientMedicinesHomeDeliveryInfo[i].appointmentDate;

            tempReqPatMedApptIdDateObj.appointmentDate = ToDisplayDateFormat(patientMedicinesHomeDeliveryInfo[i].appointmentDate);
            tempReqPatMedDelAppointmentDateIdArray.push(tempReqPatMedApptIdDateObj);
          }

          for (var j = 0; j < patientMedicinesHomeDeliveryInfo[i].medicinesData.length; j++) {
            let temp = {};
            let tempMedicineName = [];
            temp.medicineScheduleDate = patientMedicinesHomeDeliveryInfo[i].medicinesData[j].medicineScheduleDate;
            temp.processInfo = patientMedicinesHomeDeliveryInfo[i].medicinesData[j].processInfo;//'After Lunch';
            for (var k = 0; k < patientMedicinesHomeDeliveryInfo[i].medicinesData[j].medicinesdataArrayForFixTimeSlot.length; k++) {
              tempMedicineName.push(patientMedicinesHomeDeliveryInfo[i].medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineName)
            }
            temp.medicineName = tempMedicineName.toString();
            element["patientMedicinesHomeDelivery"].push(temp);
          }
          let tempabc = {
            medicineScheduleDate: '',
            processInfo: '',
            medicineName: ''
          }
          element["patientMedicinesHomeDelivery"].push(tempabc);
        }

        //logic to show latest medicine deliver data for this doctor and this patnet
        element["latestMedicineDeliverInfo"] = [];
        if (tempReqPatMedDelAppointmentDateIdArray && tempReqPatMedDelAppointmentDateIdArray.length > 0) {
          let maximumDateAndApptId = getMaxDate(tempReqPatMedDelAppointmentDateIdArray);
          console.log("maximumDateAndApptId", maximumDateAndApptId);
          let templatestMedicineRequestInfo = patientMedicinesHomeDeliveryInfo.filter(function (item) {
            return (item.appointmentID == maximumDateAndApptId.apptId)
          });
          for (var j = 0; j < templatestMedicineRequestInfo[0].medicinesData.length; j++) {
            let latestMediineDeliverObj = {};
            let tempMedicineName = [];
            latestMediineDeliverObj.medicineScheduleTime = getTimeSlotAmPm(templatestMedicineRequestInfo[0].medicinesData[j].medicineScheduleTime);

            latestMediineDeliverObj.medicineScheduleTime = templatestMedicineRequestInfo[0].medicinesData[j].medicineScheduleTime;
            latestMediineDeliverObj.medicineScheduleDate = templatestMedicineRequestInfo[0].medicinesData[j].medicineScheduleDate;
            latestMediineDeliverObj.processInfo = templatestMedicineRequestInfo[0].medicinesData[j].processInfo;//'After Lunch';
            for (var k = 0; k < templatestMedicineRequestInfo[0].medicinesData[j].medicinesdataArrayForFixTimeSlot.length; k++) {
              tempMedicineName.push(templatestMedicineRequestInfo[0].medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineName)
            }
            latestMediineDeliverObj.medicineName = tempMedicineName.toString();
            element["latestMedicineDeliverInfo"].push(latestMediineDeliverObj);
          }
        }

        if (element.appointmentDate < ToDisplayDateFormat(new Date())) {
          tempdoctorAppointmentHistoryListDataArray.push(element);
        }
        else {
          tempdoctorUpComingAppointmentDataArray.push(element);
        }
      });
      setcompleteDoctorVisitData(tempcompleteDoctorVisitDataArray);
      setdoctorAppointmentHistoryListData(tempdoctorAppointmentHistoryListDataArray);
      setdoctorUpComingAppointmentData(tempdoctorUpComingAppointmentDataArray)
    }
  }

  const Get_CommonDashboardCount = async () => {
    let dataobj = {
    };
    let loadResponse = await Api.Get_CommonDashboardCount(dataobj);
    if (loadResponse.status) {
      setcommonDashBoardCountData(loadResponse.data);
      console.log("  this.commonDashBoardCountData  this.commonDashBoardCountData", loadResponse.data)
    }
  }
    return (
        <>
        <div className="content" style={{ position: 'absolute', top: '17%', width: '96%', left: '2%', right: '2%' }}>
          <div className="container-fluid p-0">
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ float: 'left', width: '67%', marginLeft: '1%', marginBottom: '1%' }}>
                <h3 style={{ color: '#39b49b' }}><strong style={{ color: '#39b49b' }}>Doctor</strong> Dashboard</h3>
              </div>
              <div style={{ float: 'left', width: '13%' }}>
                <div className="text-center">
                  {/* <button class="btn" style="width: 200px;"
                    *ngIf="currentUser.user.role==0 || currentUser.user.role==11"
                    (click)="openBookAppointmentPopup()"><i class="fa fa-book" aria-hidden="true"></i><span
                      style="margin-left:5px;">Book Appointment</span></button> */}
                </div>
              </div>
              <div style={{ float: 'left', marginLeft: '4%', width: '13%' }}>
                <div className="text-center">
                  {/* <button class="btn" style="width: 200px;" (click)="openGetLabTest()"><i class="fa fa-list"
                    aria-hidden="true"></i><span style="margin-left:5px;">Lab Tests List</span></button> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-xxl-5 d-flex">
                <div className="w-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Total Service Count</h5>
                  </div>
                  <div className="row" style={{ paddingRight: '5px', paddingLeft: '10px' }}>
                    <div className="col-sm-6" style={{ marginTop: '2%;' }}>
                      <div className="card" style={{ color: 'black', height: '73px', backgroundImage: 'linear-gradient(to right, #0068ca, #00b3fb8f)' }}>
                        <div className="card-body">
                          <h1 className="display-5" style={{ display: 'inline' }}>{commonDashBoardCountData.total_no_of_doctors} </h1>
                          <h5 className="card-title" style={{ display: 'inline' }}> Total Doctors</h5>
                        </div>
                      </div>
                      <div className="card" style={{ marginTop: '24%', color: 'black', height: '73px', backgroundImage: 'linear-gradient(to right, #84de83, #84db9275)' }}>
                        <div className="card-body">
                          <h1 className="display-5" style={{ display: 'inline' }}>{commonDashBoardCountData.total_no_of_nurses} </h1>
                          <h5 className="card-title" style={{ display: 'inline' }}> Total Nurses</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6" style={{ marginTop: '12%' }}>
                      <div className="card" style={{ color: 'black', height: '73px', backgroundImage: 'linear-gradient(to right, #f0a12c, #f1a83496)' }}>
                        <div className="card-body">
                          <h1 className="display-5" style={{ display: 'inline' }}>{commonDashBoardCountData.total_no_of_patients} </h1>
                          <h5 className="card-title" style={{ display: 'inline' }}> Total Patient</h5>
                        </div>
                      </div>
                      <div className="card" style={{ marginTop: '24%', color: 'black', height: '73px', backgroundImage: 'linear-gradient(to right, #33ccff, #34cae42e)' }}>
                        <div className="card-body">
                          <h1 className="display-5" style={{ display: 'inline' }}>{commonDashBoardCountData.total_no_of_pharmacists} </h1>
                          <h5 className="card-title" style={{ display: 'inline' }}> Total Pharmacist</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-xxl-7">

                <div class="card-header">
                  <h5 class="card-title mb-0">Diseases Wise Count</h5>
                </div>
                {diseaseWiseCountPieChartData.length > 0 ? <Pie data={diseasesWiseCountPieChart} /> : <img src={noimgfound} />}
              </div>
            </div>
            <br />
            <div class="row">
              <div className="col-6 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Pharmacist Count</h5>
                  </div>
                  <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                      <div className="py-3">
                        <div className="chart chart-xs">

                          {pharmacistWiseCountPieChartData.length > 0 ? <Pie data={pharmacistWiseCountPieChart} /> : <img src={noimgfound} />}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6 d-flex order-1 order-xxl-1">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Online/Home Visit</h5>
                  </div>
                  <div className="card-body py-3">
                    <div className="chart chart-sm">
                      <Bar
                        data={onlineHomeVisitChart}
                        options={{
                          title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                          },
                          legend: {
                            display: true,
                            position: 'right'
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <br />
            <div className="row">
              <div className="col-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Appointments</h5>
                  </div>
                  <table className="table table-hover my-0" style={{ textAlign: 'center' }}>
                    <thead style={{ backgroundColor: '#39b49b' }}>
                      <tr>
                        <th class="d-none d-xl-table-cell">
                          <span>Pat Name</span>
                        </th>
                        <th>Info</th>
                        <th>MedInfo</th>
                        <th class="d-none d-md-table-cell">Pat Contact</th>
                        <th class="d-none d-md-table-cell">Appt Date</th>
                        <th class="d-none d-md-table-cell">Appt Slot</th>
                        <th class="d-none d-xl-table-cell">Dr Visit</th>
                        <th>Pharmacy Req</th>
                        <th>Pharmacy</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        doctorUpComingAppointmentData.map((data, index) => {
                          console.log(data)
                          return (
                            <tr>
                              <td >{data.patientNname}/{data.patientAge}-{data.patientSex == 1 ? 'M' : 'F'}</td>
                              <td>
                                <OverlayTrigger
                                  key={index}
                                  placement="top"
                                  overlay={
                                    <Popover id={`tooltip-${index}`}>
                                      <Popover.Title as="h3">Popover bottom</Popover.Title>
                                      <Popover.Content>
                                        <b style={{ display: 'block' }}>Gender: {data.patientSex == 1 ? 'Male' : 'Female'}</b>
                                        <b style={{ display: 'block' }}>Weight: {data.patientWeight}</b>
                                        <b style={{ display: 'block' }}>Disease: {data.disease}</b>
                                        <b style={{ display: 'block' }}>Symptoms: {data.individualsymptom}</b>
                                        <b style={{ display: 'block' }}>Illness History: {data.individualillness}</b>
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <button variant="secondary"><i style={{ color: '#3eb49b', fontSize: '20px' }} class="fa fa-info-circle"></i></button>
                                </OverlayTrigger>
                              </td>
                              <td>
                                <OverlayTrigger
                                  key={index}
                                  placement="top"
                                  overlay={
                                    <Popover id={`tooltip-${index}`}>
                                      <Popover.Title as="h3">Medicine Info</Popover.Title>
                                      <Popover.Content>
                                        {
                                          data.patientMedicinesHomeDelivery.map((dataObj, index) => {
                                            console.log(data)
                                            return (
                                              <div>

                                                {dataObj.medicineName != '' &&
                                                  <div style={{ float: 'left', width: '100%' }}>
                                                    <div style={{ float: 'left', width: '30%' }}>
                                                      <b style={{ display: 'block' }}>{dataObj.medicineName}</b>
                                                    </div>
                                                    <div style={{ float: 'left', width: '33%' }}>
                                                      <b style={{ display: 'block' }}>{dataObj.medicineScheduleDate}</b>
                                                    </div>
                                                    <div style={{ float: 'left', width: '27%' }}>
                                                      <b style={{ display: 'block' }}>{dataObj.processInfo}</b>
                                                    </div>
                                                  </div>
                                                }

                                                {dataObj.medicineName == '' &&
                                                  <div style={{ float: 'left', width: '100%' }}>-----------------------------------------</div>
                                                }
                                              </div>
                                            )
                                          })
                                        }
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <button variant="secondary"><i style={{ color: '#3eb49b', fontSize: '20px' }} class="fa fa-info-circle"></i></button>
                                </OverlayTrigger>

                              </td>
                              <td >{data.patientMob}</td>
                              <td class="d-none d-md-table-cell">{data.appointmentDate}</td>
                              <td class="d-none d-md-table-cell">{valueoftimeslot(data.timeSlot)}</td>
                              <td><span className={data.isVisitCompleted ? 'badge badge-success  ' : 'badge badge-warning  '}
                                style={{ cursor: 'none' }}>{data.isVisitCompleted === true ? 'Completed' : 'To Be Visit'}</span>
                              </td>
                              <td>
                              {/* <span onClick={() => { !data.isPharmacyRequested ? openRequestPatMedHomeDelivery(data) : false(null) }} className={data.isPharmacyRequested ? 'badge badge-success' : 'badge badge-warning '}>{data.isPharmacyRequested === true ? 'Requested' : 'To Be Request'}</span> */}

                                <span onClick={() => {openRequestPatMedHomeDelivery(data) }} className={data.isPharmacyRequested ? 'badge badge-success' : 'badge badge-warning '}>{data.isPharmacyRequested === true ? 'Requested' : 'To Be Request'}</span>
                              </td>
                              <td><span className={data.isPharmacyProvided ? 'badge badge-success  ' : 'badge badge-warning  '}
                              >{data.isPharmacyProvided === true ? 'Provided' : 'To Be Provide'}</span>
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
            <br />
            <div className="row">
              <div className="col-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Appointments History</h5>
                  </div>
                  <table className="table table-hover my-0" style={{ textAlign: 'center' }}>
                    <thead style={{ backgroundColor: '#39b49b' }}>
                      <tr>
                        <th class="d-none d-xl-table-cell">
                          <span>Pat Name</span>
                        </th>
                        <th>Info</th>
                        <th>MedInfo</th>
                        <th class="d-none d-md-table-cell">Pat Contact</th>
                        <th class="d-none d-md-table-cell">Appt Date</th>
                        <th class="d-none d-md-table-cell">Appt Slot</th>
                        <th class="d-none d-xl-table-cell">Dr Visit</th>
                        <th>Pharmacy Req</th>
                        <th>Pharmacy</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        doctorAppointmentHistoryListData.map((data, index) => {
                          console.log(data)
                          return (
                            <tr>
                              <td class="d-none d-xl-table-cell">{data.patientnameForApptHistory}/{data.patientAge}-{data.patientSex == 1 ? 'M' : 'F'}</td>
                              <td>
                                <OverlayTrigger
                                  key={index}
                                  placement="top"
                                  overlay={
                                    <Popover id={`tooltip-${index}`}>
                                      <Popover.Title as="h3">Popover bottom</Popover.Title>
                                      <Popover.Content>
                                        <b style={{ display: 'block' }}>Gender: {data.patientSex == 1 ? 'Male' : 'Female'}</b>
                                        <b style={{ display: 'block' }}>Weight: {data.patientWeight}</b>
                                        <b style={{ display: 'block' }}>Disease: {data.disease}</b>
                                        <b style={{ display: 'block' }}>Symptoms: {data.individualsymptom}</b>
                                        <b style={{ display: 'block' }}>Illness History: {data.individualillness}</b>
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <button variant="secondary"><i style={{ color: '#3eb49b', fontSize: '20px' }} class="fa fa-info-circle"></i></button>
                                </OverlayTrigger>
                              </td>
                              <td>
                             

                              </td>
                              <td >{data.patientMob}</td>
                              <td class="d-none d-md-table-cell">{data.appointmentDate}</td>
                              <td class="d-none d-md-table-cell">{valueoftimeslot(data.timeSlot)}</td>
                              <td><span className={data.isVisitCompleted ? 'badge badge-success  ' : 'badge badge-warning  '}
                                style={{ cursor: 'none' }}>{data.isVisitCompleted === true ? 'Completed' : 'To Be Visit'}</span>
                              </td>
                              <td>
                                <span onClick={() => { !data.isPharmacyRequested ? openRequestPatMedHomeDelivery(data) : false(null) }} className={data.isPharmacyRequested ? 'badge badge-success' : 'badge badge-warning '}>{data.isPharmacyRequested === true ? 'Requested' : 'To Be Request'}</span>
                              </td>
                              <td><span className={data.isPharmacyProvided ? 'badge badge-success  ' : 'badge badge-warning  '}
                              >{data.isPharmacyProvided === true ? 'Provided' : 'To Be Provide'}</span>
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
            <br />
          </div>
        </div>

        {showRequestPatMedHomeDelivery && <ReqMedHomeDel inputrequesPatMedHomeDelivery={inputrequesPatMedHomeDelivery} showRequestPatMedHomeDelivery={showRequestPatMedHomeDelivery}   closeRequestPatMedHomeDelivery={closeRequestPatMedHomeDelivery}/>}

      </>
    )
}

export default Doctordashboard
