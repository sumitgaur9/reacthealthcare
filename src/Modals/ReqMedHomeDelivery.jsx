import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'
import { arrayBufferToBase64, getBase64} from '../utils/utils'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'bootstrap/dist/css/bootstrap.min.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { ToDisplayDateFormat } from '../utils/utils';
import { ToDBDateFormat } from '../utils/utils';



import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 

import styles from './Physiotherapistprofile.module.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

 export const ReqMedHomeDel=(props) => {

     const animatedComponents = makeAnimated();
     const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));

     const [getImageValue, setImageValue] = useState('');
     const [displayDate, setdisplayDate] = useState('');
     const [sheduleMedicineTableData, setsheduleMedicineTableData] = useState([]);
     const [medicineListDataArray, setmedicineListDataArray] = useState([]);
     const [submitted, setsubmitted] = useState(false);
     const [errorMessage, seterrorMessage] = useState('');
     const [itemList, setitemList] = useState([]);
     const [selectedItems, setselectedItems] = useState([]);
     const [keyword, setkeyword] = useState('name');
     const [settings, setsettings] = useState({});
     const [labtestListDataArray, setlabtestListDataArray] = useState([]);
     const [selectedLabTestItems, setselectedLabTestItems] = useState([]);
     const [settingsLabTest, setsettingsLabTest] = useState({});
     const [reqPatientMedicinesHomeDeliveryForm, setreqPatientMedicinesHomeDeliveryForm] = useState({
         patientName: props.inputrequesPatMedHomeDelivery.patientNname,
         patientContactNo: props.inputrequesPatMedHomeDelivery.patientMob,
         pharmacistID: "",
         pharmacistName: "",
         patientAddress: props.inputrequesPatMedHomeDelivery.patientAddress,
         patientPIN:props.inputrequesPatMedHomeDelivery.patientPIN,
         scheduleDate: "",
         scheduleTime: "",
         processInfo: "",
         medicineName: [],
         LabTestName: [],
         isNextVisitRequired: false,
         nextAppointmentDate: "",
         nextAppointmentTime: "",
     });
     const [passwordPatternError, setpasswordPatternError] = useState(false);
     const [pharmacistListDataArray, setpharmacistListDataArray] = useState([]);
     const [getmedicineprofileid, setgetmedicineprofileid] = useState('');
     const [showMedicineprofileformpopup, setshowMedicineprofileformpopup] = useState(false);
     const [currentUser, setcurrentUser] = useState();
     const [filterTimeSlotDataArray, setfilterTimeSlotDataArray] = useState([]);
     const [doctorWiseAppointmentData, setdoctorWiseAppointmentData] = useState([]);
     const [completeTimeSlotDataArray, setcompleteTimeSlotDataArray] = useState([]);
     const [patientMedicinesHomeDeliveryList, setpatientMedicinesHomeDeliveryList] = useState([]);
     const [repeatedMedicineData, setrepeatedMedicineData] = useState([]);
     const [visibleTimeSlot, setvisibleTimeSlot] = useState(false);
     const [disableAvailableTimeSlotBtn, setdisableAvailableTimeSlotBtn] = useState(true);

     const [instructionDataArray, setinstructionDataArray] = useState([
         { "label": "Before Breakfast", "value": "Before Breakfast" },
         { "label": "After Breakfast", "value": "After Breakfast" },
         { "label": "Before Lunch", "value": "Before Lunch" },
         { "label": "After Lunch", "value": "After Lunch" },
         { "label": "Before Dinner", "value": "Before Dinner" },
         { "label": "After Dinner", "value": "Before Dinner" }
     ])




     useEffect(() => {

         Get_PharmacistsList();
         Get_LabTestsList();
         Get_MedicinesList();

     }, []);

     const InputEvent = (event) => {
         const { name, value } = event.target;
         setreqPatientMedicinesHomeDeliveryForm((preVal) => {
             return {
                 ...preVal,
                 [name]: value,
             }
         })
     };


     const Get_PharmacistsList = async () => {
         let dataobj = {
         };

         let loadResponse = await Api.getPharmacistsList(dataobj);
         if (loadResponse.status) {
             let dataarray = loadResponse.data;
             if (dataarray && dataarray.length > 0) {
                 setpharmacistListDataArray(dataarray);
             }
         }
     }

     const Get_LabTestsList = async () => {
         let dataobj = {
         };

         let loadResponse = await Api.getLabTestsList(dataobj);
         if (loadResponse.status) {
             let data = loadResponse.data;
             if (data && data.length > 0) {

                 setlabtestListDataArray([]);
                 let dataobj = []
                 for (var i = 0; i < data.length; i++) {
                     let dataobj1 = {
                         "id": loadResponse.data[i]._id,
                         "label": data[i].testName,
                         "value": data[i].testName,
                     }
                     dataobj.push(dataobj1);
                 }
                 setlabtestListDataArray(dataobj);


             }
         }
     }

     const Get_MedicinesList = async () => {
         let dataobj = {
         };

         let loadResponse = await Api.getMedicinesList(dataobj);
         if (loadResponse.status) {
             let data = loadResponse.data;
             if (data && data.length > 0) {

                 console.log("medicineListDataArray ", data);
                 setmedicineListDataArray([]);
                 let dataobj = []

                 for (var i = 0; i < data.length; i++) {
                     let dataobj1 = {
                         "id": loadResponse.data[i]._id,
                         "label": data[i].medicineName,
                         "value": data[i].medicineName,
                     }
                     dataobj.push(dataobj1);
                 }
                 setmedicineListDataArray(dataobj);




             }
         }
     }


     function pharmacistChangeEvent(e) {

        let pharmacistNameEvent ={
            target: {
                value: e.target.value,
                name: 'pharmacistName'
            }
        }
        InputEvent(pharmacistNameEvent);
        let newArray = pharmacistListDataArray.filter(function (item) {
            return item.name == e.target.value;
        });
        if (newArray) {
          let pharmacistID ={
            target: {
                value: newArray[0]?._id,
                name: 'pharmacistID'
            }
        }
        InputEvent(pharmacistID);
        }
    }

    function getDateDayDifference(medicinesheduledate) {

        var date2 = new Date();
        var date1 = medicinesheduledate;
    
    
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
        //alert(diffDays)​;
      }

      
      function getMaxDate(tempReqPatMedDelAppointmentDateIdArray) {
        let maxdateAndApptId = {};
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


      function  getRepeatedMedicineData() {
        let tempReqPatMedDelAppointmentDateIdArray = [];
        this.repeatedMedicineData = [];
        let self = this;
        let patientMedicinesHomeDeliveryInfo = patientMedicinesHomeDeliveryList.filter(function (item) {
          return (item.doctorID == self.reqByDoctorId && item.patientID == self.reqByPatientId)
        });
    
        for (var i = 0; i < patientMedicinesHomeDeliveryInfo.length; i++) {
          if (patientMedicinesHomeDeliveryInfo[i].appointmentDate != undefined && patientMedicinesHomeDeliveryInfo[i].appointmentDate != null && patientMedicinesHomeDeliveryInfo[i].appointmentDate != '') {
            let tempReqPatMedApptIdDateObj = {};
            tempReqPatMedApptIdDateObj.appointmentId = patientMedicinesHomeDeliveryInfo[i].appointmentID;
            tempReqPatMedApptIdDateObj.appointmentDate = ToDisplayDateFormat(patientMedicinesHomeDeliveryInfo[i].appointmentDate);
            tempReqPatMedDelAppointmentDateIdArray.push(tempReqPatMedApptIdDateObj);
          }
        }
        if (tempReqPatMedDelAppointmentDateIdArray && tempReqPatMedDelAppointmentDateIdArray.length > 0) {
          let maximumDateAndApptId = getMaxDate(tempReqPatMedDelAppointmentDateIdArray);
          console.log("maximumDateAndApptId", maximumDateAndApptId);
          let templatestMedicineRequestInfo = patientMedicinesHomeDeliveryInfo.filter(function (item) {
            return (item.appointmentID == maximumDateAndApptId.apptId)
          });
          let temparrayrepeatedMedicineData=[];
          let temparraysheduleMedicineTableData=[];

          for (var j = 0; j < templatestMedicineRequestInfo[0].medicinesData.length; j++) {
            let latestMediineDeliverObj= {};
            let tempMedicineName= [];
            let tempMedicineID = [];
            latestMediineDeliverObj.medicineScheduleTime = templatestMedicineRequestInfo[0].medicinesData[j].medicineScheduleTime;
            let dayDifference = getDateDayDifference(new Date(ToDBDateFormat(templatestMedicineRequestInfo[0].medicinesData[j].medicineScheduleDate)));
            latestMediineDeliverObj.medicneScheduleDate = ToDisplayDateFormat(new Date(ToDBDateFormat(templatestMedicineRequestInfo[0].medicinesData[j].medicineScheduleDate)).setDate(new Date().getDate() + dayDifference));
            latestMediineDeliverObj.processInfo = templatestMedicineRequestInfo[0].medicinesData[j].processInfo;//'After Lunch';
            for (var k = 0; k < templatestMedicineRequestInfo[0].medicinesData[j].medicinesdataArrayForFixTimeSlot.length; k++) {
              tempMedicineName.push(templatestMedicineRequestInfo[0].medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineName)
              tempMedicineID.push(templatestMedicineRequestInfo[0].medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineID)
            }
            latestMediineDeliverObj.medicineScheduleName = tempMedicineName.toString();
            latestMediineDeliverObj.medicineScheduleId = tempMedicineID.toString();
            temparrayrepeatedMedicineData(latestMediineDeliverObj);
            temparraysheduleMedicineTableData(latestMediineDeliverObj);
          }
          setrepeatedMedicineData(temparrayrepeatedMedicineData);
          setsheduleMedicineTableData(temparraysheduleMedicineTableData);
        }
      }
      

      function datechangescheduleDate(date) {
         let scheduleDateevent ={
            target: {
                value: date,
                name: 'scheduleDate'
            }
        }
        InputEvent(scheduleDateevent);
        setdisableAvailableTimeSlotBtn(false);
        setvisibleTimeSlot(false);
      }

      function datechangescheduleTime(date) {
        let scheduleTimeevent ={
           target: {
               value: date,
               name: 'scheduleTime'
           }
       }
       InputEvent(scheduleTimeevent);
     }




     function changeLabTestItem(selectedOption) {
        setselectedLabTestItems(selectedOption);
     }
     function changeMedicineItem(selectedOption) {
        setselectedItems(selectedOption);
     }

     function isNextVisitRequiredChangeEvent(event) {
        let isNextVisitRequiredEvent ={
            target: {
                value: event.target.value,
                name: 'isNextVisitRequired'
            }
        }
        InputEvent(isNextVisitRequiredEvent);
        setdisableAvailableTimeSlotBtn(true);
        setvisibleTimeSlot(false);
      }



      function SendDataInTableValue() {
        let  initialsheduleMedicineTableDataarray=sheduleMedicineTableData;

      // if (this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value == undefined ||
      //   this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value == null ||
      //   this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value == '') {
      //   this.toastr.warning("Please Select ScheduleDate", '', {
      //     timeOut: 6000,
      //   });
      //   return;
      // }
      // else if (this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value == undefined ||
      //   this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value == null ||
      //   this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value == '') {
      //   this.toastr.warning("Please Select ScheduleTime", '', {
      //     timeOut: 6000,
      //   });
      //   return;
      // }
      // else if (this.selectedItems.length < 1) {
      //   this.toastr.warning("Please Select Medicine", '', {
      //     timeOut: 6000,
      //   });
      //   return;
      // }
      // else if (this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value == undefined ||
      //   this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value == null || this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value == '') {
      //   this.toastr.warning("Please Select Instruction", '', {
      //     timeOut: 6000,
      //   });
      //   return;
      // }
      let selectedDataValue = [];
      let selectedMedicineName = [];
      let selectedMedicineID = [];
  
      let dataobj = {};
      dataobj.medicneScheduleDate = reqPatientMedicinesHomeDeliveryForm.scheduleDate;
      dataobj.medicineScheduleTime = reqPatientMedicinesHomeDeliveryForm.scheduleTime;
      dataobj.processInfo = reqPatientMedicinesHomeDeliveryForm.processInfo;
      let tempsheduleMedicineTableDataArray=[];
      for (var i = 0; i < selectedItems.length; i++) {
        let testdataobj = {
          "id": selectedItems[i].id,
          "itemName": selectedItems[i].label,
        }
        selectedDataValue.push(testdataobj);
        selectedMedicineName.push(selectedItems[i].itemName);
        selectedMedicineID.push(selectedItems[i].id);
      }
      dataobj.medicineScheduleName = selectedMedicineName.toString();
      dataobj.medicineScheduleId = selectedMedicineID.toString();
      initialsheduleMedicineTableDataarray.push(dataobj);
      // this.reqPatientMedicinesHomeDeliveryForm.patchValue({
      //   scheduleDate: '',
      //   scheduleTime: '',
      //   processInfo: '',
      // })
      setselectedItems([]);

      setsheduleMedicineTableData(initialsheduleMedicineTableDataarray);
    }


    return(
            <> 
            <form>

                <Modal 
                    show={props.showRequestPatMedHomeDelivery}
                    onHide={props.closeRequestPatMedHomeDelivery}
                    backdrop="false"
                    keyboard={false}
                    contentClassName="custom-modal-style"
                    dialogClassName="custom-modal-style1"
                >

                    <Modal.Body>

                        <div className="modal-header" style={{ height: '47px', background: 'linear-gradient(to right, #39b49a 0%, #1d86df 100%)' }}>
                            <button type="button" className="close" onClick={props.closeReqMedHomeDelPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
                            {/* <p className="cc popupheaderheading"><i className="fa fa-medkit"></i><span style={{ marginLeft: '5px' }}> Welcome
                                &nbsp;<span style={{ color: 'white' }}> Patient &nbsp;[{data.name}]</span></span>
                            </p> */}
                        </div>
                        <div className="overlay"></div>
                        <div className="popupContainer">


                            <div class="row">
                                <div class="col-md-3 card-body">
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                            </div>
                                            <input type="text" class="form-control" id="patientName" name="patientName" placeholder="Patient Name"
                                                formControlName="patientName" />
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-2 card-body">
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                            </div>
                                            <input type="text" class="form-control" id="patientPIN" name="patientPIN" placeholder="PIN"
                                                formControlName="patientPIN" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3 card-body">
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                            </div>
                                            <input type="text" class="form-control" id="patientContactNo" name="patientContactNo"
                                                placeholder="Patient ContactNo" formControlName="patientContactNo" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4 card-body">
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                            </div>
                                            <input type="text" class="form-control" id="patientAddress" name="patientAddress"
                                                placeholder="Patient Address" formControlName="patientAddress" />
                                        </div>
                                    </div>
                                </div>


                            


                                <div class="col-md-4">
                                    <div class="card-body">

                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Pharmacist</label>
                                            {/* <select class="form-control" formControlName="pharmacistName" (change)="pharmacistChangeEvent($event)">
                <option value=""></option>
                <option *ngFor="let opt of pharmacistListDataArray" [value]="opt.name">{{opt.name}}</option>
              </select>
              <div *ngIf="submitted && f.pharmacistID.errors" style="color:red;font-size: 10px;">
                <div *ngIf="f.pharmacistID.errors.required">Pharmacist is required</div>
              </div> */}

<select className="form-control" name="appointmentType" value={reqPatientMedicinesHomeDeliveryForm.pharmacistName} onChange={(e) => { pharmacistChangeEvent(e); }}>
                                <option value=""></option>
                                {
                                    pharmacistListDataArray.map((opt, ind) => {
                                        
                                        return (
                                            <option value={opt.name}>{opt.name}</option>
                                        )
                                    })
                                }
                            </select>

                                        </div>

                                    </div>
                                </div>

                                <div class="col-md-1">

                                </div>

                                <div class="col-md-7" style={{ paddingTop: '3%' }}>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <div style={{ width: '100%', float: 'left' }}>
                                                {/* <angular2-multiselect [data]="labtestListDataArray" [(ngModel)]="selectedLabTestItems" [settings]="settingsLabTest"
                  (onSelect)="onLabTestItemSelect($event)" (onDeSelect)="OnLabTestItemDeSelect($event)" (onSelectAll)="onLabTestSelectAll($event)"
                  (onDeSelectAll)="onLabTestDeSelectAll($event)" formControlName="LabTestName" style="width: 89%;">
                </angular2-multiselect> */}

<div class="form-group">
                            <Select options={labtestListDataArray} isMulti components={animatedComponents} className="basic-multi-select" placeholder="Select Diseases"
                                classNamePrefix="select" onChange={(selectedOption) => { changeLabTestItem(selectedOption) }} />
                        </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: '100%', float: 'left', marginBottom: '4px' }}>
                                    <div style={{ marginLeft: '3%', float: 'left' }}>
                                        <div class="buttonSection">
                                            <div class="text-center">
                                                <a type="button" onClick={() => getRepeatedMedicineData()} style={{ width: '200px', fontSize: '14px', padding: '0', color: 'white' }}
                                                    class="btn btn-info btn-block rounded-0 py-2"><i class="fa fa-clock-o" style={{ color: 'white', fontSize: '20px', paddingRight: '5px' }}></i>Last Medicine Prescription</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#f6f9f8', border: '3px solid rgb(57 180 155 / 32%)', padding: '7px' }}>
                                <div style={{ width: '100%', float: 'left', marginTop: '3%', marginBottom: '4px' }}>
                                    <div style={{ width: '20%', float: 'left' }}>
                                        <div class="form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text"><i class="fa fa-calendar text-info"></i></div>
                                                </div>
                                                <DatePicker selected={reqPatientMedicinesHomeDeliveryForm.scheduleDate} onChange={date =>datechangescheduleDate(date)} dateFormat="dd/MM/yyyy"  
                                                minDate={new Date()} maxDate={endDate} showDisabledMonthNavigation placeholder="Schedule Date" />

                                                {/* <input class="form-control" (onChange)="datechange()" type="text" [dpDayPicker]="dayPickerConfig"
                  [theme]="'dp-material'" formControlName="scheduleDate" [mode]="'day'" placeholder="Schedule Date" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '16%', float: 'left', marginLeft: '1%' }}>
                                        <div class="form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text"><i class="fa fa-calendar text-info"></i></div>
                                                </div>
                                                <DatePicker selected={reqPatientMedicinesHomeDeliveryForm.scheduleTime} dateFormat="dd/MM/yyyy"  
                                                minDate={new Date()} maxDate={endDate} showDisabledMonthNavigation placeholder="Schedule Time" onChange={(data)=>datechangescheduleTime(data)} />
                                                {/* <input class="form-control" type="text" [dpDayPicker]="dayPickerTimeConfig" [theme]="'dp-material'"
                  formControlName="scheduleTime" [mode]="'time'" placeholder="ScheduleTime" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '20%', float: 'left', marginLeft: '1%' }}>
                                        {/* <angular2-multiselect [data]="medicineListDataArray" [(ngModel)]="selectedItems" [settings]="settings"
              (onSelect)="onItemSelect($event)" (onDeSelect)="OnItemDeSelect($event)"
              (onSelectAll)="onSelectAll($event)" (onDeSelectAll)="onDeSelectAll($event)" formControlName="medicineName"
              style="width: 89%;">
            </angular2-multiselect> */}

<Select options={medicineListDataArray} isMulti components={animatedComponents} className="basic-multi-select" placeholder="Medicine"
                                classNamePrefix="select" onChange={(selectedOption) => { changeMedicineItem(selectedOption) }} />

                                    </div>
                                   
                                    <div style={{ width: '10%', float: 'left' }}>
                                        <div class="buttonSection">
                                            <div class="text-center">
                                            {/* <a    onClick={() => openMedicineProfilePopup()}  style={{ color: 'white', width: '75px', fontSize: '12px', padding: '0' }} */}

                                                <a      style={{ color: 'white', width: '75px', fontSize: '12px', padding: '0' }}
                                                    class="btn btn-info btn-block rounded-0 py-2"><i class="fa fa-plus" style={{ color: 'white', fontSize: '15px', paddingRight: '3px' }}></i> Create</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ width: '27%', float: 'left', marginTop: '-3%' }}>
                                        <div style={{ marginBottom: '6px' }}>
                                            <label for="exampleFormControlSelect1">Instruction</label>
                                            <div class="ng-autocomplete" style={{width:'285px'}}>

                                            <Autocomplete
                                id="combo-box-demo"
                                options={instructionDataArray}
                                getOptionLabel={(option) => option.label}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}  label="Combo box" variant="outlined" />}
                              />


                                                {/* <ng-autocomplete [data]="instructionDataArray" [searchKeyword]="keyword"
                  (selected)='selectEventInstruction($event)' (inputChanged)='onChangeSearchInstruction($event)'
                  (inputFocused)='onFocusedInstruction($event)' [itemTemplate]="itemTemplate"
                  [notFoundTemplate]="notFoundTemplate">
                </ng-autocomplete>

                <ng-template #itemTemplate let-item>
                  <a [innerHTML]="item.name"></a>
                </ng-template> */}

                                                {/* <ng-template #notFoundTemplate let-notFound>
                  <div [innerHTML]="notFound"></div>
                </ng-template> */}
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{ float: 'right' }}>
                                        <div class="buttonSection">
                                            <div class="text-center">
                                                <a onClick={()=>SendDataInTableValue()} type="button" style={{ width: '50px', color: 'white', fontSize: '13px', padding: '0' }}
                                                    class="btn btn-info btn-block rounded-0 py-2"><i style={{ color: 'white', paddingRight: '3px', fontSize: '12px' }} class="fa fa-file-text-o" aria-hidden="true"></i>OK</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <table class="table table-hover my-0">
                                    <thead style={{ backgroundColor: '#39b49b5e' }}>
                                        <tr>
                                            <th>Delete</th>
                                            <th>Date</th>
                                            <th class="d-none d-xl-table-cell">Time</th>
                                            <th class="d-none d-xl-table-cell">MedicineName</th>
                                            <th class="d-none d-xl-table-cell">Instruction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                        sheduleMedicineTableData.map((data, index) => {
                          return (
                              <tr>
                                  <td class="d-none d-xl-table-cell" style={{verticalAlign: 'middle'}}><i class="fa fa-trash"
                                      aria-hidden="true" style={{cursor: 'pointer',fontSize: '18px',color:'red',marginLeft: '15%',color:'red'}}
                                  ></i></td>
                                  <td>{data.medicneScheduleDate}</td>
                                  <td class="d-none d-xl-table-cell">{data.medicineScheduleTime}</td>
                                  <td class="d-none d-md-table-cell">
                                      {data.medicineScheduleName}
                                  </td>
                                  <td class="d-none d-md-table-cell">
                                      {data.processInfo}
                                  </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                                <div style={{ width: '100%', float: 'left', marginTop: '3%;' }}>
                                    <div style={{ width: '20%', float: 'left' }}>
                                        <div class="form-group">
                                            <input type="checkbox" onChange={e =>isNextVisitRequiredChangeEvent(e)} />
                                            <label for="exampleFormControlSelect1" style={{ paddingLeft: '5%' }}>Next Visit Req</label>
                                        </div>
                                    </div>
                                    <div style={{ width: '80%', float: 'left' }}>
                                        <div class="form-group">
                                            <div class="input-group mb-2" style={{ width: '35%', float: 'left' }}>
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text"><i class="fa fa-calendar text-info"></i></div>
                                                </div>
                                                {/* <input class="form-control"  type="text" [dpDayPicker]="dayPickerConfigApptDate" [theme]="'dp-material'"
                  formControlName="nextAppointmentDate" (onChange)="datechange()" [mode]="'day'" [displayDate]="displayDate"
                  placeholder="Appointment Date" /> */}
                                            </div>
                                            <div style={{ width: '20%', float: 'left' }}>
                                                <div class="buttonSection">
                                                    <div class="text-center">
                                                        <a type="button" style={{ width: '135px', fontSize: '14px', padding: '0', color: 'white' }}
                                                            class="btn btn-info btn-block rounded-0 py-2"><i class="fa fa-clock-o" style={{ color: 'white', fontSize: '20px', paddingRight: '5px' }}></i>Available Slot</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: '35%', float: 'right' }}>
                                                {/* <select class="form-control" formControlName="nextAppointmentTime" style="width: 100%;">
                  <option value=""></option>
                  <option *ngFor="let opt of filterTimeSlotDataArray" [disabled]="opt.isSlotBooked"
                    [ngStyle]="{  'color': opt.isSlotBooked ? 'red': 'black' }" [value]="opt.id">{{opt.isSlotBooked? opt.name+ '  Slot Full': opt.name}}</option>
                </select> */}
                                            </div>
                                        </div>

                                        {/*             
             <div class="form-group" [hidden]="!visibleTimeSlot">
              <label for="exampleFormControlSelect1">Time Slot</label>
              
            </div>  */}



                                    </div>


                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="buttonSection">
                            <div className="text-center">
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </form>
        </>   
        
    )

}


