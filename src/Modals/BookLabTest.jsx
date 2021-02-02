import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'
import { arrayBufferToBase64, getBase64,ToDBDateFormat } from '../utils/utils'
import * as moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from './BookLabTest.module.css';


 export const BookLabTest=(props) => {


  const animatedComponents = makeAnimated();

    
  const [getImageValue, setImageValue]= useState('');

  const [doctorListData, setDoctorData] = useState({});

  const [visiblePatientNameSelect, setvisiblePatientNameSelect] = useState(false);

  const [textareaValue, settextareaValue] = useState('');
  
  const [submitted, setsubmitted] = useState(false);

  const [patientListData, setPatientListData] = useState([]);
  const [completeDoctorListData, setCompleteDoctorListData] = useState([]);
  const [testPackageListData, setTestPackageListData] = useState([]);
  const [nurseListData, setNurseListData] = useState([]);
  const [showSelectedTestInfoData, setShowSelectedTestInfoData] = useState([]);
  
  
  const [labTestData, setLabTestData] = useState([]);
  const [completelabTestData, setCompletelabTestData] = useState([]);
  

  const [newArray1, setnewArray1] = useState([]);
  
  const sampleTypeListData = [{ "name": "package" }, { "name": "individual" }]

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  const [selectedSymptomItems, setSelectedSymptomItems] = useState([]);
  const [selectedIllnessItems, setSelectedIllnessItems] = useState([]);
  const [diseasListData, setDiseasListData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  
  const [disableAvailableTimeSlotBtn, setdisableAvailableTimeSlotBtn] = useState(true);
  const [visibleTimeSlot, setvisibleTimeSlot] = useState(false);

  var completetimeslotarr = [
    { "id": 0,"name":"10:00 AM - 11:00 AM", "isSlotBooked": false },
    { "id": 1,"name":"11:00 AM - 12:00 PM", "isSlotBooked": false },
    { "id": 2,"name":"12:00 PM - 01:00PM", "isSlotBooked": false },
    { "id": 3,"name":"01:00 PM - 02:00PM", "isSlotBooked": false },
    { "id": 4,"name":"02:00 PM - 03:00PM", "isSlotBooked": false },
    { "id": 5,"name":"03:00 PM - 04:00PM", "isSlotBooked": false },
    { "id": 6,"name":"04:00 PM - 05:00PM", "isSlotBooked": false },
    { "id": 7,"name":"05:00 PM - 06:00PM", "isSlotBooked": false },
  ]; 


  const [completeTimeSlotDataArray, setcompleteTimeSlotDataArray] = useState(completetimeslotarr);
  const [filterTimeSlotDataArray, setfilterTimeSlotDataArray] = useState([]);
  
  function resetSlotData(){
    setcompleteTimeSlotDataArray(completetimeslotarr);
  }

  const symptomsListData = [
    {'id': '1', 'label': 'Headache', 'value': 'Headache'},
    {'id': '2', 'label': 'Headache', 'value': 'Headache'},
    {'id': '3', 'label': 'Chest Pain', 'value': 'Chest Pain'},
    {'id': '4', 'label': 'Weight Loss', 'value': 'Weight Loss'},
    {'id': '5', 'label': 'Weight Gain', 'value': 'Weight Gain'},
    {'id': '6', 'label': 'Tiredness', 'value': 'Tiredness'},
    {'id': '7', 'label': 'Stomachache', 'value': 'Stomachache'},
  ];
  const illnessHistoryListData = [
    {'id': '1', 'label': 'Low BP', 'value': 'Low BP'},
    {'id': '2', 'label': 'High BP', 'value': 'High BP'},
    {'id': '3', 'label': 'Diabetes', 'value': 'Diabetes'},
  ];
  function datechange(date) {
    
    console.log("date",date)
    //  let abc =  moment(date).format("YYYY/MM/DD");
     let appointmentDateevent ={
        target: {
            value: date,
            name: 'appointmentDate'
        }
    }
    InputEvent(appointmentDateevent);
    // setData({
    //   appointmentDate: date
    // });

    setdisableAvailableTimeSlotBtn(false);
    // setStartDate(date);
  }

  useEffect(() => {
    const Get_DiseasesList = async (load) => {
      let loadResponse = await Api.Get_DiseasesList(load);
      if (loadResponse.status) {
        // this.completeDiseasListData=loadResponse.data;
        let temparray = [];
        for (var i = 0; i < loadResponse.data.length; i++) {
          let dataobj1 = {
            "id": loadResponse.data[i]._id,
            "label": loadResponse.data[i].diseaseName,
            "value": loadResponse.data[i].diseaseName,
            "itemName": loadResponse.data[i].diseaseName,
            "takeCareBy": loadResponse.data[i].takeCareBy,
          }
           temparray.push(dataobj1);
           setDiseasListData(temparray);
        }
        console.log("diseasListDatadiseasListData...........",diseasListData)
      } else {
        setDiseasListData([]);
      }
    };

    let dataobj = {};
    Get_DiseasesList(dataobj);

  }, []);

  useEffect(() => {
    const Get_LabTestsPackageList = async (load) => {
      let loadResponse = await Api.Get_LabTestsPackageList(load);
      if (loadResponse.status) {
        // this.completeDiseasListData=loadResponse.data;
        setTestPackageListData(loadResponse.data);
        console.log("testPackageListDatatestPackageListData...........",testPackageListData)
      } else {
        setTestPackageListData([]);
      }
    };

    let dataobj = {};
    Get_LabTestsPackageList(dataobj);

  }, []);



  useEffect(() => {
    const Get_LabTestsList = async (load) => {
      let loadResponse = await Api.Get_LabTestsList(load);
      if (loadResponse.status) {
        // this.completeDiseasListData=loadResponse.data;
        setCompletelabTestData(loadResponse.data);

        let templabTestData = [];
        for (var i = 0; i < loadResponse.data.length; i++) {
          let dataobj1 = {
            "id": loadResponse.data[i]._id,
            "itemName": loadResponse.data[i].testName,
            "label": loadResponse.data[i].testName,
            "value": loadResponse.data[i].testName,
            "price": loadResponse.data[i].price
          }
          templabTestData.push(dataobj1);
        }
        setLabTestData(templabTestData);
        console.log("testtestListDatatesttestListData...........",labTestData)
      } else {
        setLabTestData([]);
      }
    };

    let dataobj = {};
    Get_LabTestsList(dataobj);

  }, []);


  
  


  function patientNameChangeEvent($event) {
    let newArray = patientListData.filter(function (item) {
      return item._id == $event.target.value;
    });
    if (newArray) {
      updatePatientDetails(newArray[0]);
    }
  }
  
 
 


  useEffect(() => {
    let currentUserLoginResponse = JSON.parse(window.sessionStorage.getItem("userToken"));//role not coming in userme api so need to take value from both storage because patient all info come in userme not in login response
    let currentUserMeRes = JSON.parse(window.sessionStorage.getItem("currentusermedata"));
    
    if (currentUserLoginResponse && currentUserLoginResponse.user && currentUserLoginResponse.user.role == 11) {
        setvisiblePatientNameSelect(true);
      } else {
        setvisiblePatientNameSelect(false);
      }
      setvisiblePatientNameSelect(true);
  }, []);

  useEffect(() => {
    const Get_PatientsList = async (load) => {
      let loadResponse = await Api.getPatientsList(load);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        setPatientListData(loadResponse.data);
      } else {
        setPatientListData([]);
      }
    };

    let dataobj = {};
    Get_PatientsList(dataobj);

  }, []);


  useEffect(() => {
    const Get_NursesList = async (load) => {
      let loadResponse = await Api.getNursesList(load);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        setNurseListData(loadResponse.data);
      } else {
        setNurseListData([]);
      }
    };

    let dataobj = {};
    Get_NursesList(dataobj);

  }, []);
  


  const [data, setData] = useState({

    patientNname: '',
    patientMob: '',
    patientEmail: '',
    patientID: '',
    patientAddres: '',
    patientPIN: '',
    testType: '',
    packageID: '',
    packageName: '',
    testsDataUIName: '',
    testsDataUIID: '',
    price: '',
    skills: [],
    nurseID: '',
    nurseName: '',
  });

 const InputEvent = (event) => {
   const { name, value } = event.target;
   setData((preVal) => {
      return {
          ...preVal,
          [name]: value,
      }
    })
  };

  const [expertiesArrayData, setExpertiesArrayData] = useState([]);


  const [UploadFile, setUploadFile]= useState([]);
  const [UploadFileName, setUploadFileName]= useState('');

    function arrayBufferToBase64local(buffer) {
        return arrayBufferToBase64(buffer)
    }

    function ToDBDateFormatlocal(date){
        return ToDBDateFormat(date)   
    }

useEffect(() => {
  const Get_ExpertiseList = async (load) => {
    let loadResponse = await Api.Get_ExpertiseList(load);
    if (loadResponse.status) {
         setExpertiesArrayData(loadResponse.data);
      } else {
        setExpertiesArrayData([]);
      }
  };

  let dataobj = {};
  Get_ExpertiseList(dataobj);

}, []);

  
    
    function openPatientProfilePopup(){

    }

    function nurseChangeEvent(e) {
      let newArray = nurseListData.filter(function (item) {
        return item.name == e.target.value;
      });
      if (newArray) {
        let doctorNameevent = {
          target: {
            value: e.target.value,
            name: 'nurseName'
          }
        }
        InputEvent(doctorNameevent);
        let nurseIDevent = {
          target: {
            value: newArray[0]._id,
            name: 'nurseID'
          }
        }
        InputEvent(nurseIDevent);
      }
    }

    function testTypeChangeEvent(e){
      //
      let testTypeevent = {
        target: {
          value: e.target.value,
          name: 'testType'
        }
      }
      InputEvent(testTypeevent);
      setShowSelectedTestInfoData([])
    }

    function labtestChangeEvent(selectedOption){
      let skillsEvent = {
        target: {
          value: selectedOption,
          name: 'skills'
        }
      }
      InputEvent(skillsEvent);
      
      calculatePrice(selectedOption);
    }
    
   function calculatePrice(selecteddata) {
     let pricearray = [];
     let selectedlabtestInfo = [];
     for (var i = 0; i < selecteddata.length; i++) {
       let newArray = completelabTestData.filter(function (item) {
         return item._id == selecteddata[i].id;
       });
       pricearray.push(newArray[0].price);
       selectedlabtestInfo.push(newArray[0]);
     }
     let sum = 0;
     for (var i = 0; i < pricearray.length; i++) {
       sum = sum + pricearray[i]
     }
     let price = {
       target: {
         value: sum,
         name: 'price'
       }
     }
     InputEvent(price);
     setShowSelectedTestInfoData(selectedlabtestInfo)
   }

    function packageNameChangeEvent(e) {
      setShowSelectedTestInfoData([]); //this.showSelectedTestInfoData=[];
      let tempShowSelectedTestInfoData = [];
      let newArray = testPackageListData.filter(function (item) {
        return item.packageNname == e.target.value;
      });
      if (newArray) {
        let packageIDevent = {
          target: {
            value: newArray[0]._id,
            name: 'packageID'
          }
        }
        InputEvent(packageIDevent);
        let priceevent = {
          target: {
            value: newArray[0].packageAmount,
            name: 'price'
          }
        }
        InputEvent(priceevent);        
        tempShowSelectedTestInfoData.push(newArray[0])
        console.log("tempShowSelectedTestInfoDatatempShowSelectedTestInfoData",tempShowSelectedTestInfoData)
      }
      setShowSelectedTestInfoData(tempShowSelectedTestInfoData); // this.showSelectedTestInfoData.push(newArray[0]);
      console.log("1111111111",showSelectedTestInfoData)
    }

    function doctorChangeEvent(e) {
        setImageValue('');// this.getImageValue ='';
        setStartDate('');
      //  setData({...data, doctorName: e.target.value});        

        let doctorNameevent ={
            target: {
                value: e.target.value,
                name: 'doctorName'
            }
        }
        InputEvent(doctorNameevent);
        // let doctorIdevent ={
        //     target: {
        //         value: e.target.value,
        //         name: 'doctorID'
        //     }
        // }
        // InputEvent(doctorIdevent);

        // this.bookAppointmentForm.controls.appointmentDate.enable();
        // this.bookAppointmentForm.controls.appointmentDate.updateValueAndValidity();
        setvisibleTimeSlot(false); // this.visibleTimeSlot = false; 
        let appointmentDate ={
          target: {
              value: '',
              name: 'appointmentDate'
          }
      }
      InputEvent(appointmentDate);

       // setData({...data, appointmentDate: ''});        
        // this.bookAppointmentForm.patchValue({
        //     appointmentDate: ''
        // })
        let newArray1 = testPackageListData.filter(function (item) {
            return item.name == e.target.value;
        });
        setnewArray1(newArray1);

        if (newArray1) {
          let doctorID ={
            target: {
                value: newArray1[0]?._id,
                name: 'doctorID'
            }
        }
        InputEvent(doctorID);

        let charges ={
          target: {
              value: newArray1[0]?.charges,
              name: 'charges'
          }
        }
        InputEvent(charges);


          // setData({...data, doctorID: newArray1[0]?._id});
          // setData({...data, charges: newArray1[0]?.charges });

            // this.bookAppointmentForm.controls.doctorID.setValue(newArray1[0]?._id);
            // this.bookAppointmentForm.controls.charges.setValue(newArray1[0]?.charges);
            if(newArray1[0]?.newimage?.data?.data){
                setImageValue(arrayBufferToBase64(newArray1[0]?.newimage?.data?.data))//need to update data in base 64
            }else {
                setImageValue('https://i.pinimg.com/originals/8c/8b/37/8c8b3766126753c6d098cdb2e42cff49.png');
            }
        }

    }

const Save_BookLabTest = async () => {
  let dataobj = {};
  dataobj.patientNname = data.patientNname;
  dataobj.patientMob = data.patientMob;
  dataobj.patientEmail = data.patientEmail;
  dataobj.patientID = data.patientID;
  dataobj.patientAddres = data.patientAddres;
  dataobj.patientPIN = data.patientPIN;
  dataobj.testType = data.testType;
  dataobj.packageID = data.packageID;
  dataobj.packageName = data.packageName;
  dataobj.nurseID = data.nurseID;
  dataobj.nurseName = data.nurseName;
  dataobj.price = data.price;

  dataobj["testsData"] = [];
    if (dataobj.packageID == null || dataobj.packageID == '' || dataobj.packageID == undefined) {
      dataobj["testsData"]=[];
      for (var i = 0; i < data.skills.length; i++) {
        let testdataobj = {
          "testID": data.skills[i].id,
          "testname": data.skills[i].itemName,
        }
        dataobj["testsData"].push(testdataobj);
      }
    }


  let loadResponse = await Api.Save_BookLabTest(dataobj);
  if (loadResponse.status) {
    props.closeBookLabTestPopup(); 
    } else {
      // setExpertiesArrayData([]);
    }
};


function updatePatientDetails(patientdetail) {
  // setData({
  // patientNname: patientdetail?.name,
  // patientAge: patientdetail?.age,
  // patientSex: patientdetail?.gender,
  // patientEmail: patientdetail?.email,
  // patientMob: patientdetail?.phoneno,
  // patientAddres: patientdetail?.address,
  // patientID: patientdetail?._id,
  // patientWeight: patientdetail?.weight,
  // });

  let patientNname = {
    target: {
      value: patientdetail?.name,
      name: 'patientNname'
    }
  }
  InputEvent(patientNname);////
  let patientAge = {
    target: {
      value: patientdetail?.age,
      name: 'patientAge'
    }
  }
  InputEvent(patientAge);////
  let patientSex = {
    target: {
      value: patientdetail?.gender,
      name: 'patientSex'
    }
  }
  InputEvent(patientSex);////
  let patientEmail = {
    target: {
      value: patientdetail?.email,
      name: 'patientEmail'
    }
  }
  InputEvent(patientEmail);////
  let patientMob = {
    target: {
      value: patientdetail?.phoneno,
      name: 'patientMob'
    }
  }
  InputEvent(patientMob);////  
  let patientAddres = {
    target: {
      value: patientdetail?.address,
      name: 'patientAddres'
    }
  }
  InputEvent(patientAddres);////  
  let patientID = {
    target: {
      value: patientdetail?._id,
      name: 'patientID'
    }
  }
  InputEvent(patientID);////
  let patientWeight = {
    target: {
      value: patientdetail?.weight,
      name: 'patientWeight'
    }
  }
  InputEvent(patientWeight);////
  
let textareaValue = 
`  ----Patient Details----
Name: ${patientdetail.name}
Age: ${patientdetail.age}
Weight: ${patientdetail.weight}
Sex: ${patientdetail.gender==1?'Male':'Female'}
Email: ${patientdetail.email}
Phone: ${patientdetail.phoneno}
Add: ${patientdetail.address}`;

settextareaValue(textareaValue)

// this.getpatientprofileid = this.bookAppointmentForm.controls.patientID.value;   //for sending in patient profile popup
}
    
    return(
            <> 
       <form>

          <Modal
            show={props.showBookLabTestPopup}
            onHide={props.closeBookLabTestPopup}
            backdrop="false"
            keyboard={false}
          >

            <Modal.Body>
            <div className="modal-header" style={{ height: '47px', background: 'linear-gradient(to right, #39b49a 0%, #1d86df 100%)' }}>
                <button type="button" className="close" onClick={props.closeBookLabTestPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
                <p className="cc popupheaderheading"><i className="fa fa-medkit"></i><span style={{ marginLeft: '5px' }}> Welcome
                    &nbsp;<span style={{color:'white'}}> Book Lab Test</span></span>
                </p>
            </div>
             
            <div className="row">

                <div className="col-md-6">
                    <div className="card-body">

                        {visiblePatientNameSelect &&
                            <div className="form-group">
                                <label>Patient Name</label>
                                <select className="form-control" onChange={(e) => { patientNameChangeEvent(e); }}>
                                    <option value=""></option>
                                    {
                                        patientListData.map((opt, ind) => {
                                            
                                            return (
                                                <option value={opt._id}>{opt.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        }

                        <div className="form-group">
                            <div className="input-group mb-2" style={{ border: '0.1px dashed slategray' }} onClick={() => openPatientProfilePopup()}>

                                <textarea name="comment" rows="8" cols="100" style={{ color: 'slategray' }} disabled
                                    value={textareaValue}>Enter text here...</textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                            </div>
                            <input id="description" name="description" value={data.description} onChange={InputEvent} rows="4" cols="30"
                                    className="form-control" placeholder="Patient PIN"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Test Type</label>
                            <select className="form-control" name="testType" value={data.testType} onChange={(e) => { testTypeChangeEvent(e); }}>
                                <option value=""></option>
                                {
                                    sampleTypeListData.map((opt, ind) => {
                                        
                                        return (
                                            <option value={opt.name}>{opt.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        


                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card-body">


                        { data.testType=='individual'  &&
                          <div className="form-group">
                                <Select options={labTestData} isMulti components={animatedComponents} className="basic-multi-select" placeholder="Select Test" classNamePrefix="select" 
                                // onChange={(selectedOption) => {
                                //     if (selectedOption?.length) {
                                //         setSelectedSymptomItems(selectedOption)
                                //     }
                                // }} 
                                onChange={(selectedOption) => { labtestChangeEvent(selectedOption); }} 
                                />
                          </div>
                        }


                        { data.testType=='package'  &&
                          <div className="form-group">
                            <label for="exampleFormControlSelect1">PackageName</label>
                            <select className="form-control" onChange={(e) => { packageNameChangeEvent(e); }} name="packageName">
                              <option value=""></option>
                              {
                                testPackageListData.map((opt, ind) => {

                                  return (
                                    <option value={opt.packageNname}>{opt.packageNname}</option>
                                  )
                                })
                              }
                            </select>
                          </div>
                        }


                        

                        <div className="form-group">
                                <label for="exampleFormControlSelect1">Nurse</label>
                                <select className="form-control" onChange={(e) => { nurseChangeEvent(e); }} name="doctorName">
                                    <option value=""></option>
                                    {
                                        nurseListData.map((opt, ind) => {
                                            
                                            return (
                                                <option value={opt.name}>{opt.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {showSelectedTestInfoData.length > 0 &&
                              <div className="card" style={{overflow: 'auto',height: '200px'}}>
                                {
                                  showSelectedTestInfoData.map((data1, ind) => {
                                    console.log(data1)
                                    return (
                                      <div className={styles['gaadiex-list']}>
                                        <div className={[styles['gaadiex-list-item'], styles['border-b1']].join(' ')}>
                                          <img className={styles['gaadiex-list-item-img']}
                                            src={arrayBufferToBase64local(data1.newimage?.data?.data) || 'https://previews.123rf.com/images/dxinerz/dxinerz1801/dxinerz180102964/93710577-scientist-medical-laboratory-icon-vector-image-can-also-be-used-for-professionals-suitable-for-web-a.jpg'} alt="Photo of sunset" />
                                          <div className={styles['gaadiex-list-item-text']}>
                                            <h6>{data1?.testName || data1?.packageNname}</h6>
                                            {data.testType == 'individual' &&
                                              <div className="text-right">Price:&nbsp;<span className="rupee">₹</span>&nbsp;{data1?.price?.toLocaleString('en-IN')} </div>
                                            }
                                            {data.testType != 'individual' &&
                                              <div className="text-right">Price:&nbsp;<span className="rupee">₹</span>&nbsp;{data1?.packageAmount?.toLocaleString('en-IN')} </div>
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              
                            }

                            {showSelectedTestInfoData.length > 0 &&

                              <div style={{ width: '100%', float: 'left', backgroundColor: '#36b0a145' }}>
                                <div style={{ width: '65%', float: 'left' }}>
                                  <h6>SubTotal:</h6>
                                </div>
                                <div style={{ width: '22%', float: 'left' }}>
                                  <i class="fa fa-inr" aria-hidden="true"></i> &nbsp;{data?.price.toLocaleString('en-IN')}
                                </div>
                              </div>
                            }
                       
                        

                    </div>
                </div>

            </div>


            </Modal.Body>
            <Modal.Footer>              
              <div className="buttonSection">
                <div className="text-center">
                  <input type="submit" onClick={Save_BookLabTest}  style={{width: '200px',fontWeight: '600'}} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
                </div>
              </div>
            </Modal.Footer>
          </Modal> 
            </form>
          </>   
        
    )

}