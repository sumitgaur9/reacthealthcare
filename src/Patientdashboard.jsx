import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import {Pie, Doughnut} from 'react-chartjs-2';
import noimgfound from '../src/images/nodatafound.png';
import stylesPatDesh from "./Patientdashboard.module.css";



const Patientdashboard = () => {

  const [doctorAppointmentListData, setdoctorAppointmentListData] = useState([]);
  const [doctorAppointmentHistoryData, setdoctorAppointmentHistoryData] = useState([]);
  const [showRequestPatMedHomeDelivery, setshowRequestPatMedHomeDelivery] = useState(false);
  const [pharmaReqForHomeDelData, setpharmaReqForHomeDelData] = useState([]);
  const [errorMessage, seterrorMessage] = useState({});
  const [showVisitForAl, setshowVisitForAll] = useState(false);
  const [showBookAppointmentPopup, setshowBookAppointmentPopup] = useState(false);
  const [visitAppointmentId, setvisitAppointmentId] = useState('');
  const [completeDoctorListData, setcompleteDoctorListData] = useState([]);
  const [expertiesArrayData, setexpertiesArrayData] = useState([]);
  const [patientAppointmentData, setpatientAppointmentData] = useState([]);
  const [isDataExistInindividualToPackageLabTestCount, setisDataExistInindividualToPackageLabTestCount] = useState(false);
  const [doctorExperties, setdoctorExperties] = useState([{
    experties: '',
  }]);
  const [currentUser, setcurrentUser] = useState({});
  const [filterDoctorData, setfilterDoctorData] = useState([]);
  const [labTestBookingData, setlabTestBookingData] = useState([]);
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
  const [labTestWiseTestCount, setlabTestWiseTestCount] = useState([]);
  const [individualToPackageLabTestCount, setindividualToPackageLabTestCount] = useState({});
  //  const [pieChartOptions,setpieChartOptions: ChartOptions = {
  //     responsive: true,
  //   };

  const [pieChartLabels, setpieChartLabels] = useState([]);
  const [pieChartData, setpieChartData] = useState([]);
  const [backgroundOdd, setbackgroundOdd] = useState({backgroundColor: '#85e0ce'});
  const [backgroundEven, setbackgroundEven] = useState({backgroundColor: '#e5f9f5'});


  const [pieChartColor, setpieChartColor] = useState([
    {
      backgroundColor: ['#157fda',
        '#39b49b',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        '#157fda',
        '#39b49b',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        '#157fda',
        '#39b49b',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ]);

 





  const [pieChartType, setpieChartType] = useState('pie');
  const [pieChartLegend, setpieChartLegend] = useState(true);
  const [pieChartPlugins, setpieChartPlugins] = useState([]);
  const [pieChartPharmacistLabels, setpieChartPharmacistLabels] = useState([]);
  const [pieChartPharmacistData, setpieChartPharmacistData] = useState([]);
  const [pieChartIndividualToPackageLabTestCountLabels, setpieChartIndividualToPackageLabTestCountLabels] = useState(['individualTestCount', 'packageCount']);
  const [pieChartIndividualToPackageLabTestCountData, setpieChartIndividualToPackageLabTestCountData] = useState([]);
  //IndividualToPackageLabTestCount
  //  const [barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  const [barChartLabels, setbarChartLabels] = useState(['2006', '2007', '2008', '2009', '2010', '2011', '2012']);
  const [barChartType, setbarChartType] = useState('bar');
  const [barChartLegend, setbarChartLegend] = useState(true);
  const [barChartPlugins, setbarChartPlugins] = useState([]);

  const [doughnutChartLabels, setdoughnutChartLabels] = useState(['individualTestCount', 'packageCount']);
  const [doughnutChartData, setdoughnutChartData] = useState([]);
  const [doughnutChartType, setdoughnutChartType] = useState('doughnut');


 // const [doughnutChartData, setdoughnutChartData] = useState([]);
  //const [doughnutChartLabels, setdoughnutChartLabels] = useState(['individualTestCount', 'packageCount']);


  const data = {
    labels: doughnutChartLabels,
    datasets: [{
      data: doughnutChartData,
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


  const datapie = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
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

  const datapiepharmacist = {
    labels: pieChartPharmacistLabels,
    datasets: [{
      data: pieChartPharmacistData,
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


  const datadoctorwisecount = {
    labels: pieChartLabels,
    datasets: [{
      data: pieChartData,
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

    // displayName: 'DoughnutExample',


    useEffect(() => {
      Get_PharmaReqForHomeDel();
      Get_CommonDashboardCount();
        Get_IndividualToPackageLabTestCount();
        Get_LabTestWiseTestCount();
        Get_DoctorWiseApptCount();
        Get_DoctorsList();
        Get_LabTestsBookings();

    }, []);
  const Get_IndividualToPackageLabTestCount = async () => {
    let dataobj = {
    };
    let patientid;
    //  if (this.currentUser.user.role != 11) {
    patientid = '5f2ea5d1bcbc050004709a3c';// this.currentUser.roleBaseId;
    // }

    let loadResponse = await Api.Get_IndividualToPackageLabTestCount(dataobj, patientid);
    if (loadResponse.status) {
      console.log("  this.individualToPackageLabTestCount  this.individualToPackageLabTestCount", loadResponse)

      let dataarray = [];
      let individualToPackageLabTestCount = loadResponse.data;
      if (individualToPackageLabTestCount) {
        dataarray.push(individualToPackageLabTestCount.individualTestCount);
        //   setdoughnutChartData(individualToPackageLabTestCount.individualTestCount)
        // .push(this.individualToPackageLabTestCount.individualTestCount);
        if (individualToPackageLabTestCount.packageCount > 0) {
          let isDataExistInindividualToPackageLabTestCount = true;
        }
        dataarray.push(individualToPackageLabTestCount.packageCount);
        //setdoughnutChartData(individualToPackageLabTestCount.packageCount) 
        //this.doughnutChartData.push(this.individualToPackageLabTestCount.packageCount);
      }
      setdoughnutChartData(dataarray);
      // console.log("  this.individualToPackageLabTestCount  this.individualToPackageLabTestCount", this.individualToPackageLabTestCount)

      // const [doughnutChartData,setdoughnutChartData]=useState({});
      // const [doughnutChartLabels,setdoughnutChartLabels]=useState([]);
    }
  }

  const Get_CommonDashboardCount = async () => {
    let dataobj = {
    };
    let loadResponse = await Api.Get_CommonDashboardCount(dataobj);
    if (loadResponse.status) {
      setcommonDashBoardCountData(loadResponse.data);
      console.log("  this.commonDashBoardCountData  this.commonDashBoardCountData",loadResponse.data)
    }
  }

  const Get_LabTestWiseTestCount = async () => {
    let dataobj = {
    };
    let patientid;
    //  if (this.currentUser.user.role != 11) {
    patientid = '5f2ea5d1bcbc050004709a3c';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_LabTestWiseTestCount(dataobj,patientid);
    if (loadResponse.status) {
      let dataarray=loadResponse.data;
      //setlabTestWiseTestCount(loadResponse.data);
      // setlabTestWiseTestCount(prevState => {
      //   return {
      //     ...prevState,
      //     loadResponse.data
      //   };
      // });

     
      //   setlabTestWiseTestCount(() => ({
      //     dataarra
      // }));



       // console.log("  this.labTestWiseTestCount  this.labTestWiseTestCount", labTestWiseTestCount)


      if (dataarray && dataarray.length > 0) {
        for (var i = 0; i < dataarray.length; i++) {
         // if (this.currentUser.user.role == 11) {
           // this.pieChartPharmacistLabels.push(this.labTestWiseTestCount[i].testName);
           // this.pieChartPharmacistData.push(this.labTestWiseTestCount[i].testCount);
          //  setpieChartPharmacistLabels(oldArray => [...oldArray, dataarray[i].testName]);
          //  setpieChartPharmacistData(oldArray => [...oldArray, dataarray[i].testCount]);
        //  }
          // else if (this.labTestWiseTestCount[i].testCount > 0) {
          //   this.pieChartPharmacistLabels.push(this.labTestWiseTestCount[i].testName);
          //   this.pieChartPharmacistData.push(this.labTestWiseTestCount[i].testCount);
          // }

          if (dataarray[i].testCount > 0) {
            setpieChartPharmacistLabels(oldArray => [...oldArray, dataarray[i].testName]);
            setpieChartPharmacistData(oldArray => [...oldArray, dataarray[i].testCount]);
            }

          console.log("  this.labTestWiseTestCount  this.labTestWiseTestCount", dataarray)

        }
      }

    }

  }



  const Get_DoctorWiseApptCount = async () => {
    let dataobj = {
    };
    let patientid;
    //  if (this.currentUser.user.role != 11) {
    patientid = '5f2ea5d1bcbc050004709a3c';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_DoctorWiseApptCount(dataobj,patientid);
    if (loadResponse.status) {
      let dataarray=loadResponse.data;
      if (dataarray && dataarray.length > 0) {
        for (var i = 0; i < dataarray.length; i++) {
          if (dataarray[i].apptCount > 0) {
            setpieChartLabels(oldArray => [...oldArray, dataarray[i].doctorName]);
            setpieChartData(oldArray => [...oldArray, dataarray[i].apptCount]);
            }

          console.log("  this.doctorWiseApptCount  this.doctorWiseApptCount", dataarray)
        }
      }
    }
  }

  const Get_DoctorsList = async () => {
    let dataobj = {
    };
    let loadResponse = await Api.Get_DoctorsList(dataobj);
    if (loadResponse.status) {
      let dataarray=loadResponse.data;
       setcompleteDoctorListData(loadResponse.data);
       Get_AppointmentsByPatientID(loadResponse.data);
    }
  }

  const Get_AppointmentsByPatientID = async (completeDoctorListData) => {
    let dataobj = {
    };
    let patientid;
    //  if (this.currentUser.user.role != 11) {
    patientid = '5f2ea5d1bcbc050004709a3c';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_AppointmentsByPatientID(dataobj,patientid);
    if (loadResponse.status) {
    //  setpatientAppointmentData(loadResponse.data);
    loadResponse.data.forEach(apptElement => {
        apptElement.timeSlotValue = '';
        completeDoctorListData.forEach(doctorElement => {
          if (apptElement.doctorID == doctorElement._id) {
            apptElement["doctorIsInActive"] = doctorElement.inActive
          }
        })
        switch (apptElement.timeSlot) {
          case 0:
            apptElement.timeSlotValue = '10:00 AM - 11:00 AM';
            break;
          case 1:
            apptElement.timeSlotValue = '11:00 AM - 12:00 AM';
            break;
          case 2:
            apptElement.timeSlotValue = '12:00 PM - 01:00 PM';
            break;
          case 3:
            apptElement.timeSlotValue = '01:00 PM - 02:00 PM';
            break;
          case 4:
            apptElement.timeSlotValue = '02:00 PM - 03:00 PM';
            break;
          case 5:
            apptElement.timeSlotValue = '03:00 PM - 04:00 PM';
            break;
          case 6:
            apptElement.timeSlotValue = '04:00 PM - 05:00 PM';
            break;
          case 7:
            apptElement.timeSlotValue = '05:00 PM - 06:00 PM';
            break;
        }
  })

  setpatientAppointmentData(loadResponse.data);
}
console.log("Get_AppointmentsByPatientIDGet_AppointmentsByPatientID",loadResponse.data);

}

  const Get_LabTestsBookings = async () => {
    let dataobj = {
      patientID:'5f2ea5d1bcbc050004709a3c'
    };
  //  let patientid;
    //  if (this.currentUser.user.role != 11) {
   //  dataobj.patientid = '5f2ea5d1bcbc050004709a3c';// this.currentUser.roleBaseId;
    // }
    let loadResponse = await Api.Get_LabTestsBookings(dataobj);
    if (loadResponse.status) {

      let dataarray = loadResponse.data.filter(function (item) {
        return item.isReportGenerated == true;
      });

      setlabTestBookingData(dataarray);

     // console.log("Get_LabTestsBookingsGet_LabTestsBookings",dataarray);
    }
  }


  const Get_PharmaReqForHomeDel = async () => {
    let dataobj = {
      patientID: '5f2ea5d1bcbc050004709a3c'
    };
    let loadResponse = await Api.getPharmacyReqForHomeDel(dataobj);
    if (loadResponse.status) {
let data=loadResponse.data;
      // let dataarray = loadResponse.data.filter(function (item) {
      //   return item.isReportGenerated == true;
      // });
      // setlabTestBookingData(dataarray);


let temppharmaReqForHomeDelData=[];
      console.log("Get_PharmaReqForHomeDelGet_PharmaReqForHomeDel", data);
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].medicinesData.length; j++) {
          let temp = {};
          let tempMedicineName= [];
          temp.medicineSNo = data[i].medicinesData[j].medicineSNo;
          temp.medicineScheduleDate = data[i].medicinesData[j].medicineScheduleDate;
          temp.processInfo = data[i].medicinesData[j].processInfo;//'After Lunch';

          let month = (new Date().getMonth() + 1).toString();
          let year = (new Date().getFullYear()).toString();

          let yesterdayDateFromNewDate;
          let yest_date = (new Date().getDate() < 9 ? '0' + (new Date().getDate() + 1) : new Date().getDate() + 1).toString();
          yesterdayDateFromNewDate = (yest_date + '/' + month + '/' + year);

          let todayDateFromNewDate;
          let today_date = (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()).toString();
          todayDateFromNewDate = (today_date + '/' + month + '/' + year);

          let tommorowDateFromNewDate;
          let tomm_date = (new Date().getDate() < 11 ? '0' + (new Date().getDate() - 1) : new Date().getDate() - 1).toString();
          tommorowDateFromNewDate = (tomm_date + '/' + month + '/' + year);

          if (yesterdayDateFromNewDate == data[i].medicinesData[j].medicineScheduleDate) {
            temp.yesterday_today_tommorrow = 'yesterday';
            temp.circleBackgroundColor = '#3fb49a';
          } else if (todayDateFromNewDate == data[i].medicinesData[j].medicineScheduleDate) {
            temp.yesterday_today_tommorrow = 'today';
            temp.circleBackgroundColor = '#147fda';
          } else if (tommorowDateFromNewDate == data[i].medicinesData[j].medicineScheduleDate) {
            temp.yesterday_today_tommorrow = 'tommorow';
            temp.circleBackgroundColor = '#f6a52d';
          } else {
            if (new Date(data[i].medicinesData[j].medicineScheduleDate).getTime() < new Date().getTime()) {
              temp.circleBackgroundColor = '#3fb49a';
            }
            else if (new Date(data[i].medicinesData[j].medicineScheduleDate).getTime() == new Date().getTime()) {
              temp.circleBackgroundColor = '#147fda';
            }
            else if (new Date(data[i].medicinesData[j].medicineScheduleDate).getTime() > new Date().getTime()) {
              temp.circleBackgroundColor = '#f6a52d';
            }
            temp.yesterday_today_tommorrow = data[i].medicinesData[j].medicineScheduleDate;
          }

          temp.medicineScheduleTime = data[i].medicinesData[j].medicineScheduleTime;
          if (parseInt(data[i].medicinesData[j].medicineScheduleTime.substring(0, 2)) < 12) {
            temp.am_pm = 'am';
          } else {
            temp.am_pm = 'pm';
            if (parseInt(data[i].medicinesData[j].medicineScheduleTime.substring(0, 2)) == 12) {
              temp.medicineScheduleTime = data[i].medicinesData[j].medicineScheduleTime;
            } else {
              let hours = parseInt(data[i].medicinesData[j].medicineScheduleTime.substring(0, 2)) - 12;
              temp.medicineScheduleTime = hours + data[i].medicinesData[j].medicineScheduleTime.substring(2, 5);
            }

          }
          for (var k = 0; k < data[i].medicinesData[j].medicinesdataArrayForFixTimeSlot.length; k++) {
            tempMedicineName.push(data[i].medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineName)
          }
          temp.medicineName = tempMedicineName.toString();

          temppharmaReqForHomeDelData.push(temp);
          temppharmaReqForHomeDelData.reverse();
        }
      }
      setpharmaReqForHomeDelData(temppharmaReqForHomeDelData);
      console.log("pharmaReqForHomeDelDatapharmaReqForHomeDelData ", pharmaReqForHomeDelData);
    }
  }

  function openBookAppointmentPopup(){

  }








  
    return (
        <>
       

       <div className="content" style={{position: 'absolute',top:'17%',width:'96%',left:'2%',right:'2%'}}>
    <div className="container-fluid p-0">
            <div style={{float:'left',width:'100%'}}>
              <div style={{float:'left',width:'67%',marginLeft:'1%',marginBottom:'1%'}}>
                <h3 style={{color:'#39b49b'}}><strong style={{color:'#39b49b'}}>Patient</strong> Dashboard</h3>
              </div>
              <div style={{float:'left',width:'13%'}}>
                <div className="text-center">
                  <button className={stylesPatDesh.btn} style={{width: '200px'}}
                    onClick={() => openBookAppointmentPopup()}><i className="fa fa-book" aria-hidden="true"></i><span
                      style={{marginLeft:'5px'}}>Book Appointment</span></button>
                </div>
              </div>
              <div style={{float:'left',marginLeft:'4%',width:'13%'}}>
                <div className="text-center">
                   <button className={stylesPatDesh.btn} style={{width: '200px'}} onClick={() => openBookAppointmentPopup()}><i className="fa fa-list"
                    aria-hidden="true"></i><span style={{marginLeft:'5px'}}>Lab Tests List</span></button> 
                </div>
              </div>
            </div>

            <div className="row">
        <div className="col-xl-6 col-xxl-7">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Welcome to see your medicine schedule</h5>
            </div>
            <div className="card-body py-3" style={{height:'320px',overflow:'scroll'}}>
              <div className="chart chart-sm">

                
             



                {
                  pharmaReqForHomeDelData.map((data, ind) => {
                      console.log(data)
                      return (
                        <div  className={ind%2==0?stylesPatDesh["even"]:stylesPatDesh["odd"]}     style={{float: 'left',width:'100%',paddingLeft:'3%',lineHeight:'1.15'}}>

                        <div style={{float: 'left',width:'15%'}}>
                          <div style={{height: '20px',marginLeft: '7px',borderLeft: '3px solid gray'}}></div>
                          <div style={{height: '15px',width: '20%',borderRadius: '8px',border: '1px solid #147fda',...{backgroundColor:data.circleBackgroundColor}}}
                          ></div>
                          <div style={{height: '20px',marginLeft: '7px',borderLeft: '3px solid gray'}}></div>
                        </div>
                        <div style={{float: 'left',width:'40%',paddingTop: '4%'}}>
                          <a style={{display: 'block',paddingLeft: '10%',fontSize: 'small'}}>{data.yesterday_today_tommorrow}</a>
                          <p style={{display: 'inline',fontSize:'20px'}}>{data.medicineScheduleTime.substring(0,2)}</p>
                          <p style={{display: 'inline'}}>{data.medicineScheduleTime.substring(2,5)} {data.am_pm}</p>
                          <p style={{display: 'inline',fontSize: 'small'}}> ({data.processInfo})</p>
                        </div>
                        <div style={{float: 'left',width:'40%',paddingTop: '6%'}}>
                          <a style={{fontSize: '16px'}}><img
                              src="https://www.logolynx.com/images/logolynx/97/9781fd9c436d7323a93c48f03f51d7af.png"
                              style={{width: '9%',display: 'inherit',height:'auto'}}/> {data.medicineName}</a>
                        </div>
                   
                        </div>
                      )
                  })
              }

             




              {/* <ng-container *ngIf="pharmaReqForHomeDelData.length>0;else other_content">
                  <div *ngFor="let data of pharmaReqForHomeDelData ; let odd=odd; let even=even;"
                  [ngclassName]="{ odd: odd, even: even }" style={{float: 'left',width:'100%',paddingLeft:'3%',lineHeight:'1.15'}}>
                  <div style={{float: 'left',width:'15%'}}>
                    <div style={{height: '20px',marginLeft: '7px',borderLeft: '3px solid gray'}}></div>
                    <div style={{height: '15px',width: '20%',borderRadius: '8px',border: '1px solid #147fda'}}
                      [ngStyle]="{ 'backgroundColor': data.circleBackgroundColor}"></div>
                    <div style={{height: '20px',marginLeft: '7px',borderLeft: '3px solid gray'}}></div>
                  </div>
                  <div style={{float: 'left',width:'40%',paddingTop: '4%'}}>
                    <a style={{display: 'block',paddingLeft: '10%',fontSize: 'small'}}>{{data.yesterday_today_tommorrow}}</a>
                    <p style={{display: 'inline',fontSize:'20px'}}>{{data.medicineScheduleTime.substring(0,2)}}</p>
                    <p style={{display: 'inline'}}>{{data.medicineScheduleTime.substring(2,5)}} {{data.am_pm}}</p>
                    <p style={{display: 'inline',fontSize: 'small'}}> ({{data.processInfo}})</p>
                  </div>
                  <div style={{float: 'left',width:'40%',paddingTop: '6%'}}>
                    <a style={{fontSize: '16px'}}><img
                        src="https://www.logolynx.com/images/logolynx/97/9781fd9c436d7323a93c48f03f51d7af.png"
                        style={{width: 9%;display: inherit;"> {{data.medicineName}}</a>
                  </div>
                </div>
                </ng-container>
                <ng-template #other_content>
                  <img src="../../assets/images/nodatafound.png">
                </ng-template> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-xxl-5 d-flex">
          <div className="w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Total Service Count</h5>
            </div>
            <div className="row" style={{paddingRight: '5px',paddingLeft: '10px'}}>
              <div className="col-sm-6" style={{marginTop:'2%;'}}>
                <div className="card" style={{color: 'black',height: '73px',backgroundImage: 'linear-gradient(to right, #0068ca, #00b3fb8f)'}}>
                  <div className="card-body">
                    <h1 className="display-5" style={{display: 'inline'}}>{commonDashBoardCountData.total_no_of_doctors} </h1>
                    <h5 className="card-title" style={{display: 'inline'}}> Total Doctors</h5>
                  </div>
                </div>
                <div className="card" style={{marginTop: '24%', color: 'black',height: '73px',backgroundImage: 'linear-gradient(to right, #84de83, #84db9275)'}}>                  
                  <div className="card-body">
                    <h1 className="display-5" style={{display: 'inline'}}>{commonDashBoardCountData.total_no_of_nurses} </h1>
                    <h5 className="card-title" style={{display: 'inline'}}> Total Nurses</h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6" style={{marginTop:'12%'}}>
                  <div className="card" style={{color: 'black',height: '73px',backgroundImage: 'linear-gradient(to right, #f0a12c, #f1a83496)'}}>                  
                  <div className="card-body">
                    <h1 className="display-5" style={{display: 'inline'}}>{commonDashBoardCountData.total_no_of_patients} </h1>
                    <h5 className="card-title" style={{display: 'inline'}}> Total Patient</h5>
                  </div>
                </div>
                  <div className="card" style={{marginTop: '24%', color: 'black',height: '73px',backgroundImage: 'linear-gradient(to right, #33ccff, #34cae42e)'}}>             
                  <div className="card-body">
                    <h1 className="display-5" style={{display: 'inline'}}>{commonDashBoardCountData.total_no_of_pharmacists} </h1>
                    <h5 className="card-title" style={{display: 'inline'}}> Total Pharmacist</h5>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>


 <div className="row">
        <div className="col-4 d-flex order-2 order-xxl-3">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Individual To Package Lab Test Count</h5>
            </div>
            <div className="card-body d-flex">
              <div className="align-self-center w-100">
                <div className="py-3">
                  <div className="chart chart-xs">
                    {/* <div *ngIf="isDataExistInindividualToPackageLabTestCount;else other_content" style={{display: 'block'}}>
                      <canvas baseChart [data]="doughnutChartData" [labels]="doughnutChartLabels"
                        [chartType]="doughnutChartType" [colors]="pieChartColor">
                      </canvas>
                    </div>
                    <ng-template #other_content>
                      <img src="../../assets/images/nodatafound.png">
                    </ng-template> */}




                    <Doughnut data={data} />



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 d-flex order-1 order-xxl-1">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Lab Test Count</h5>
            </div>
            <div className="card-body d-flex">
              <div className="align-self-center w-100">
                <div className="chart">


<Pie
          data={datapiepharmacist}
          // options={{
          //   legend:{
          //     display:true,
          //     position:'right'
          //   }
          // }}
        />




                  {/* <div *ngIf="pieChartPharmacistData.length>0;else other_content">
                    <canvas baseChart [data]="pieChartPharmacistData" [labels]="pieChartPharmacistLabels"
                    [chartType]="pieChartType" [options]="pieChartOptions" [plugins]="pieChartPlugins"
                    [legend]="pieChartLegend" [colors]="pieChartColor">
                  </canvas>
                  </div>
                  <ng-template #other_content>
                    <img src="../../assets/images/nodatafound.png">
                  </ng-template> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 d-flex order-1 order-xxl-1">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Doctor Wise Count</h5>
            </div>
            <div className="card-body py-3">
              <div className="chart chart-sm">
              <Pie data={datadoctorwisecount} />

                {/* <div *ngIf="pieChartData.length>0;else other_content" style={{display: 'block'}}>
                  <canvas baseChart [data]="pieChartData" [labels]="pieChartLabels" [chartType]="pieChartType"
                  [options]="pieChartOptions" [plugins]="pieChartPlugins" [legend]="pieChartLegend"
                  [colors]="pieChartColor">
                </canvas>
                </div>
                <ng-template #other_content>
                  <img src="../../assets/images/nodatafound.png">
                </ng-template> */}
              </div>
            </div>
          </div>
        </div>

      </div>
      <br/>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Appointments</h5>
            </div>
            <table className="table table-hover my-0">
              <thead style={{backgroundColor: '#39b49b'}}>
                <tr>
                  <th>DoctorName</th>
                  <th className="d-none d-xl-table-cell">Pat Name</th>
                  <th className="d-none d-xl-table-cell">Pat Email</th>
                  <th className="d-none d-xl-table-cell">Disease</th>
                  <th>Appt Date</th>
                  <th>Slot</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>

              {
                        patientAppointmentData.map((data, ind) => {
                            console.log(data)
                            return (


                              <tr>
                                            <td className="d-none d-xl-table-cell">{data.doctorName}</td>

                              <td className="d-none d-xl-table-cell">{data.patientNname}</td>
                              <td className="d-none d-md-table-cell">{data.patientEmail}</td>
                              <td className="d-none d-xl-table-cell">{data.disease}</td>
                              {/* <td className="d-none d-xl-table-cell">{data.appointmentDate}</td> */}



                              <td className="d-none d-md-table-cell">{data.appointmentDate.substr(8, 10)}/{data.appointmentDate.substr(5, 2)}/{data.appointmentDate.substr(0, 4)}</td> 
                  <td className="d-none d-md-table-cell">{data.timeSlotValue}</td>
                  <td>
{data.isPaymentDone?  <a   className="btn" style={{fontSize:"13px"}}><i
                        className="fa fa-rupee" aria-hidden="true"></i>
                      Make Payment</a>:  <a  className="btn"
                      style={{fontSize:"13px",backgroundColor: "green",cursor: "not-allowed"}}><i className="fa fa-paypal"
                        aria-hidden="true"></i>
                      Payment Done</a>}
                  
                  </td>


                                </tr>
                               

                            )
                        })
                    }








              </tbody>
            </table>
            {/* <ng-template #other_content>
              <img src="../../assets/images/nodatafound.png">
            </ng-template> */}
          </div>
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Lab Test</h5>
            </div>


            {labTestBookingData.length>0 ?  <table className="table table-hover my-0">
            
              <thead style={{backgroundColor: '#39b49b'}}>
                <tr>
                  <th className="d-none d-xl-table-cell">Pat Name</th>
                  <th className="d-none d-md-table-cell">Pat Contact</th>
                  <th className="d-none d-xl-table-cell">Pat Email</th>
                  <th className="d-none d-xl-table-cell">Price</th>
                  <th>Test Type</th>
                  <th>Get Report</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr *ngFor="let data of labTestBookingData">
                  <td className="d-none d-xl-table-cell">{{data.patientNname}}</td>
                  <td className="d-none d-md-table-cell">{{data.patientMob}}</td>
                  <td className="d-none d-md-table-cell">{{data.patientEmail}}</td>
                  <td className="d-none d-xl-table-cell">{{data.price}}</td>
                  <td className="d-none d-md-table-cell">{{data.testType}}</td>
                  <td>
                    <a *ngIf="data.isReportGenerated"
                      href="https://mongowithnode.herokuapp.com/api/userModel/Get_UploadedTestReportbyBookLabTestID/{{data._id}}"
                      className="btn" style={{fontSize:'13px'}}><i className="fa fa-download" aria-hidden="true"></i>
                      Download</a>
                  </td>
                </tr> */}

{
                        labTestBookingData.map((data, ind) => {
                            console.log(data)
                            return (


                              <tr>
                          
                          <td className="d-none d-xl-table-cell">{data.patientNname}</td>
                  <td className="d-none d-md-table-cell">{data.patientMob}</td>
                  <td className="d-none d-md-table-cell">{data.patientEmail}</td>
                  <td className="d-none d-xl-table-cell">{data.price}</td>
                  <td className="d-none d-md-table-cell">{data.testType}</td>
{data.isReportGenerated?
                  <td>
                    <a
                      href="https://mongowithnode.herokuapp.com/api/userModel/Get_UploadedTestReportbyBookLabTestID/{{data._id}}"
                      className="btn" style={{fontSize:"13px"}}><i className="fa fa-download" aria-hidden="true"></i>
                      Download</a>
                  </td>:null}


                             

                                </tr>
                               

                            )
                        })
                    }

              </tbody>
            </table>:<img src={noimgfound}/>
            }

            {/* <ng-template #other_content>
              <img src="../../assets/images/nodatafound.png">
            </ng-template>  */}
          </div>
        </div>
      </div>








            </div>
            </div>




            </>
    )
}

export default Patientdashboard
