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
import styles from './BookAppointment.module.css';


 export const BookAppointment=(props) => {


  const animatedComponents = makeAnimated();

    
  const [getImageValue, setImageValue]= useState('');

  const [doctorListData, setDoctorData] = useState({});

  const [visiblePatientNameSelect, setvisiblePatientNameSelect] = useState(false);

  const [textareaValue, settextareaValue] = useState('');
  

  const [patientListData, setPatientListData] = useState([]);
  const [completeDoctorListData, setCompleteDoctorListData] = useState([]);
  const [filterDoctorListData, setFilterDoctorListData] = useState([]);
  const [newArray1, setnewArray1] = useState([]);
  
  const appointmentTypeData = [{ "name": "HomeVisit" }, { "name": "Online" }]
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

  const [completeTimeSlotDataArray, setcompleteTimeSlotDataArray] = useState([]);
  const [filterTimeSlotDataArray, setfilterTimeSlotDataArray] = useState([]);
  
  function resetSlotData(){
    let completeTimeSlotDataArray = [
      { "id": 0,"name":"10:00 AM - 11:00 AM", "isSlotBooked": false },
      { "id": 1,"name":"11:00 AM - 12:00 PM", "isSlotBooked": false },
      { "id": 2,"name":"12:00 PM - 01:00PM", "isSlotBooked": false },
      { "id": 3,"name":"01:00 PM - 02:00PM", "isSlotBooked": false },
      { "id": 4,"name":"02:00 PM - 03:00PM", "isSlotBooked": false },
      { "id": 5,"name":"03:00 PM - 04:00PM", "isSlotBooked": false },
      { "id": 6,"name":"04:00 PM - 05:00PM", "isSlotBooked": false },
      { "id": 7,"name":"05:00 PM - 06:00PM", "isSlotBooked": false },
    ]
    setcompleteTimeSlotDataArray(completeTimeSlotDataArray);
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
    // let appointmentDateevent ={
    //     target: {
    //         value: date,
    //         name: 'appointmentDate'
    //     }
    // }
    // InputEvent(appointmentDateevent);
    console.log("date",date)
    // let abc =  moment(date).format("YYYY/MM/DD");
    setData({
      appointmentDate: date
    });

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

  


  function patientNameChangeEvent($event) {
    let newArray = patientListData.filter(function (item) {
      return item._id == $event.target.value;
    });
    if (newArray) {
      updatePatientDetails(newArray[0]);
    }
  }
  
  function updatePatientDetails(patientdetail) {
      setData({
      patientNname: patientdetail?.name,
      patientAge: patientdetail?.age,
      patientSex: patientdetail?.gender,
      patientEmail: patientdetail?.email,
      patientMob: patientdetail?.phoneno,
      patientAddres: patientdetail?.address,
      patientID: patientdetail?._id,
      patientWeight: patientdetail?.weight,
      });

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
    const Get_DoctorsList = async (load) => {
      let loadResponse = await Api.Get_DoctorsList(load);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        setCompleteDoctorListData(loadResponse.data);
      } else {
        setCompleteDoctorListData([]);
      }
    };

    let dataobj = {};
    Get_DoctorsList(dataobj);

  }, []);
  


  const [data, setData] = useState({
    patientNname: '',
    patientAge: '',
    patientSex: '',
    patientEmail: '',
    patientMob: '',
    patientAddres: '',
    patientID: '',
    patientWeight: '',

    doctorID: '',
    doctorName: '',
    appointmentDate: '',
    appointmentType: '',
    description: '',
    patientID: '',
    timeSlot: '',
    charges: '',
    diseasesData: [],
    symptomsData: [],
    illnessHistoryData: [],
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

    function get_AppointmentsByDocID() {
        const gett_AppointmentsByDocID = async (load) => {
            let loadResponse = await Api.Get_AppointmentsByDocID(load);
            if (loadResponse.status) {
                resetSlotData();
                let data = loadResponse.data;
                if (data) {
                  resetSlotData();
                  if(data.length>0)
                  {
                    setfilterTimeSlotDataArray([]);

                    let tempcompleteTimeSlotDataArray = completeTimeSlotDataArray;
                    let tempfilterTimeSlotDataArray = filterTimeSlotDataArray;

                    let doctorWiseAppointmentData = data.filter(function (item) {
                      return item.isVisitCompleted == false;
                    });
                    for (var i = 0; i < tempcompleteTimeSlotDataArray.length; i++) {
                      var ispush=true;
                      for (var j = 0; j < doctorWiseAppointmentData.length; j++) {
                        if (tempcompleteTimeSlotDataArray[i].id == doctorWiseAppointmentData[j].timeSlot) {
                          ispush=false;
                          break;
                        }
                      }
                      if (ispush) {
                        tempcompleteTimeSlotDataArray[i].isSlotBooked = false
                      } else {
                        tempcompleteTimeSlotDataArray[i].isSlotBooked = true
                      }
                      tempfilterTimeSlotDataArray.push(tempcompleteTimeSlotDataArray[i])
                    }
                    setfilterTimeSlotDataArray(tempfilterTimeSlotDataArray)
                    console.log("filterTimeSlotDataArray",filterTimeSlotDataArray)
                  }
                  else{
                    //this.filterTimeSlotDataArray =this.completeTimeSlotDataArray;
                    setfilterTimeSlotDataArray(completeTimeSlotDataArray)
                    console.log("filterTimeSlotDataArray",filterTimeSlotDataArray)
                  }
                  setvisibleTimeSlot(true)
                }
            } else {
                // setExpertiesArrayData([]);
              }
          };
        
          let dataobj={
            doctorID: data.doctorID,
                // let abc =  moment(data.appointmentDate).format("DD/MM/YYYY");
            appointmentDate: ToDBDateFormatlocal(moment(data.appointmentDate).format("DD/MM/YYYY")),//"2021/01/25"
          }
          gett_AppointmentsByDocID(dataobj);
    }

    function changeDisease(selectedOption) {
        setSelectedDiseases(selectedOption);
        setImageValue('');
        setFilterDoctorListData([]);
        let tempDoctorData = [];
        let tempSameExpertiseDoctorData = [];
        for (var i = 0; i < selectedOption?.length; i++) {

            let newArray = diseasListData.filter(function (item) {
                return item.value == selectedOption[i].value;
            });

            if (newArray) {
                tempSameExpertiseDoctorData = completeDoctorListData.filter(function (item) {
                    return item.experties == newArray[0].takeCareBy;
                });
            }
            for (var j = 0; j < tempSameExpertiseDoctorData?.length; j++) {
                tempDoctorData.push(tempSameExpertiseDoctorData[j]);
            }
        }

        console.log("before tempDoctorData......", tempDoctorData)

        var result = tempDoctorData.reduce((unique, o) => {
            if (!unique.some(obj => obj._id === o._id)) {
                unique.push(o);
            }
            return unique;
        }, []);

        console.log("after tempDoctorData......", result)
        setFilterDoctorListData(result);
    }

    
    function openPatientProfilePopup(){

    }

    function doctorChangeEvent(e) {
        setImageValue('');// this.getImageValue ='';
        setStartDate('');
        setData({
          doctorName: e.target.value
        });
        // let doctorNameevent ={
        //     target: {
        //         value: e.target.value,
        //         name: 'doctorName'
        //     }
        // }
        // InputEvent(doctorNameevent);
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
        setData({
          appointmentDate: '',
        });
        // this.bookAppointmentForm.patchValue({
        //     appointmentDate: ''
        // })
        let newArray1 = filterDoctorListData.filter(function (item) {
            return item.name == e.target.value;
        });
        setnewArray1(newArray1);

        if (newArray1) {
          setData({
            doctorID: newArray1[0]?._id,
            charges: newArray1[0]?.charges
          });
            // this.bookAppointmentForm.controls.doctorID.setValue(newArray1[0]?._id);
            // this.bookAppointmentForm.controls.charges.setValue(newArray1[0]?.charges);
            if(newArray1[0]?.newimage?.data?.data){
                setImageValue(arrayBufferToBase64(newArray1[0]?.newimage?.data?.data))//need to update data in base 64
            }else {
                setImageValue('https://i.pinimg.com/originals/8c/8b/37/8c8b3766126753c6d098cdb2e42cff49.png');
            }
        }

    }

const Update_DoctorProfile = async () => {
  var formData = new FormData();
    formData.append('image', '');
    if (UploadFile.length && UploadFileName) {
      formData.append('newimage', UploadFile[0], UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phoneno', data.phoneno);
    formData.append('experties', data.experties);
    formData.append('charges', data.charges);
    formData.append('area', data.area);
    formData.append('qualification', data.qualification);
    formData.append('id', data.id);
    formData.append('participantID', data.participantID);
    formData.append('description', data.description);
  let loadResponse = await Api.Update_DoctorProfile(formData,props.doctorid);
  if (loadResponse.status) {
    props.closeBookAppointmentPopup(); 
    } else {
      // setExpertiesArrayData([]);
    }
};
    
    return(
            <> 
       <form>

          <Modal
            show={props.showBookAppointmentPopup}
            onHide={props.closeBookAppointmentPopup}
            backdrop="false"
            keyboard={false}
          >

            <Modal.Body>
            <div className="modal-header" style={{ height: '47px', background: 'linear-gradient(to right, #39b49a 0%, #1d86df 100%)' }}>
                <button type="button" className="close" onClick={props.closeBookAppointmentPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
                <p className="cc popupheaderheading"><i className="fa fa-medkit"></i><span style={{ marginLeft: '5px' }}> Welcome
                    &nbsp;<span style={{color:'white'}}> Book Appointment</span></span>
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

                        <div class="form-group">
                            <label>Appointment Type</label>
                            <select className="form-control" name="appointmentType" value={data.appointmentType} onChange={InputEvent}>
                                <option value=""></option>
                                {
                                    appointmentTypeData.map((opt, ind) => {
                                        
                                        return (
                                            <option value={opt.name}>{opt.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div class="form-group">
                            <Select options={symptomsListData} isMulti components={animatedComponents} className="basic-multi-select" placeholder="Select Symptoms (If Any)" classNamePrefix="select" onChange={(selectedOption) => {
                                if (selectedOption.length) {
                                    setSelectedSymptomItems(selectedOption)
                                }
                            }} />
                        </div>

                        <div class="form-group">
                            <Select options={illnessHistoryListData} isMulti components={animatedComponents} className="basic-multi-select" placeholder="Select Illness History (If Any)" classNamePrefix="select" onChange={(selectedOption) => {
                                if (selectedOption.length) {
                                    setSelectedIllnessItems(selectedOption)
                                }
                            }} />
                        </div>

                        <div class="form-group">
                            <div class="input-group mb-2">
                                <textarea id="Description" name="Description" value={data.description} onChange={InputEvent} rows="4" cols="30"
                                    class="form-control" placeholder="Description"></textarea>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card-body">
                        <div class="form-group">
                            <Select options={diseasListData} isMulti components={animatedComponents} className="basic-multi-select" placeholder="Select Diseases"
                                classNamePrefix="select" onChange={(selectedOption) => { changeDisease(selectedOption) }} />
                        </div>

                                {filterDoctorListData.length > 0 &&
                                    <div className="form-group">
                                        <label for="exampleFormControlSelect1">Doctor</label>
                                        <select className="form-control" onChange={(e) => { doctorChangeEvent(e); }} name="doctorName">
                                            <option value=""></option>
                                            {
                                                filterDoctorListData.map((opt, ind) => {
                                                    
                                                    return (
                                                        <option value={opt.name}>{opt.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                }

                                {getImageValue != '' &&
                                    <div>
                                        <div style={{ width: '60%', float: 'left' }}>
                                            <img width="140" class="otpPopup-img" src={getImageValue} alt="passwordsetImg" />
                                        </div>

                                        <div style={{ width: '40%', float: 'right' }}>
                                            <b> Dr. {newArray1[0]?.name}</b><br></br>
                                            <a> {newArray1[0]?.qualification}</a><br></br>
                                            <a>&#8377; </a><b>{newArray1[0]?.charges?.toLocaleString('en-IN')}</b><br></br>
                                        </div>
                                    </div>
                                }
                                
                                {getImageValue != '' &&
                                    <div class="form-group" style={{paddingTop:'12%'}}>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-calendar text-info"></i></div>
                                            </div>
                                            <div style={{ border: '0.3px solid gray' }}>
                                                <DatePicker selected={data.appointmentDate} dateFormat="dd/MM/yyyy"  onChange={date =>datechange(date)}
                                                minDate={new Date()} maxDate={endDate} showDisabledMonthNavigation placeholder="Appointment Date" />
                                            </div>                                            
                                        </div>
                                    </div>
                                }

                                {getImageValue != '' && data.appointmentDate != '' &&
                                    <div class="buttonSection">
                                    <div class="text-center">
                                      <h4 class={styles.bookappointmentbtn}>
                                        <input type="button" disabled={disableAvailableTimeSlotBtn}
                                          style={{color: 'white', backgroundColor: '#1589d8c7'}} value="AvailableTimeSlot"
                                          onClick={() => get_AppointmentsByDocID()}/> </h4>
                                    </div>
                                  </div>
                                }

                                {visibleTimeSlot &&
                                    <div class="form-group">
                                    <label>Time Slot</label>
                                    <select className="form-control" onChange={(e) => { patientNameChangeEvent(e); }}>
                                        <option value=""></option>
                                    {
                                        filterTimeSlotDataArray.map((opt, ind) => {
                                            
                                            return (
                                                <option value={opt.id} style={{color: opt.isSlotBooked ? 'red': 'black'}} disabled={opt.isSlotBooked}>{opt.isSlotBooked? opt.name+ '  Slot Full': opt.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                  </div>
                                }
                        

                    </div>
                </div>

            </div>


            </Modal.Body>
            <Modal.Footer>              
              <div className="buttonSection">
                <div className="text-center">
                  <input type="submit" onClick={Update_DoctorProfile}  style={{width: '200px',fontWeight: '600'}} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
                </div>
              </div>
            </Modal.Footer>
          </Modal> 
            </form>
          </>   
        
    )

}