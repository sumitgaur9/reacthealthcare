import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'
import { arrayBufferToBase64, getBase64 } from '../utils/utils'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 

import styles from './Companymaster.module.css';
import PlacesAutocomplete from "react-places-autocomplete";


 export const Companymaster=(props) => {

    
  const [getImageValue, setImageValue]= useState('');

  const [doctorListData, setDoctorData] = useState({});

  const [data, setData] = useState({
    name: '',
    email: '',
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


  var UploadFile = [];
  var UploadFileName = '';  

  const uploadFile = (fileInput) => {
    if (fileInput.length === 0) {
      return;
    }
    //setUploadFile(<Array<File>>fileInput.target.files);
    UploadFile[0] = fileInput.target.files[0]; 
    UploadFileName = UploadFile[0].name;
    console.log("UploadFile",UploadFile);
    console.log("UploadFileName",UploadFileName);
    main();

   };

    async function main() {
    var files = document.querySelector('#myfile');
    const file = files.files[0];

    getBase64(file, (result) => {
      setImageValue(result);
    });
  } 


  function arrayBufferToBase64local(buffer) {
    return arrayBufferToBase64(buffer)
}

  useEffect(() => {
    const getDoctorsList = async (load) => {
       //alert(props.doctorid)
      let loadResponse = await Api.getDoctorProfile(load,props.doctorid); 
      //  let loadResponse = await Api.getDoctorProfile(load,"5f4b65e3f8872c0004c65617");  //with image
      //let loadResponse = await Api.getDoctorProfile(load,"5f8029708068bc00049fe054"); //without image
      if (loadResponse.status) {
          setData(loadResponse.data);

          if (loadResponse.data.newimage != undefined && loadResponse.data.newimage.data != undefined) {
            setImageValue(arrayBufferToBase64(loadResponse.data.newimage.data.data));//need to update data in base 64
  
            // this.doctorform.patchValue({
            //   newimage: loadResponse.data.newimage
            // });
          }
          else
          {
            setImageValue('https://i.pinimg.com/originals/8c/8b/37/8c8b3766126753c6d098cdb2e42cff49.png');
          }


        }
    };

    let dataobj = {};
    getDoctorsList(dataobj);


}, []);

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
    props.closeVerifyOTPPopup(); 
    } else {
      // setExpertiesArrayData([]);
    }
};
    
    return(
            <> 
       <form>

          <Modal
            show={props.showVerifyOTPPopup}
            onHide={props.closeVerifyOTPPopup}
            backdrop="false"
            keyboard={false}
          >

            <Modal.Body>
            <div className="modal-header" style={{height:'10px'}}>
          <button type="button" className="close" onClick={props.closeVerifyOTPPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>          
        </div>
        
  
        <div className="popupContainer">
          <div className="containerBlock">
            <div className="formSection">
              <div className="container">
                <h2 className="text-center"></h2>
                <div className="row justify-content-center">
                  <div className="col-8">
  
                      <div className="card" style={{border: 'transparent!important'}}>
                        <div className="card-header p-0">
                          <div className="bg-info text-white text-center py-2">
                            <h3><i className="fa fa-medkit"></i>Company Master</h3>
                          </div>
                        </div>
                        <div className="card-body p-3">                          
                          <label for="exampleFormControlSelect1">Name</label>
                          <div className="ng-autocomplete" style={{width:'368px'}}>
                            <PlacesAutocomplete
                                // getItemValue={(item) => item.label}
                                // items={[
                                //     { label: 'apple' },
                                //     { label: 'banana' },
                                //     { label: 'pear' }
                                // ]}
                                // renderItem={(item, isHighlighted) =>
                                //     <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                //         {item.label}
                                //     </div>
                                // }
                                // value={value}
                                // onChange={(e) => value = e.target.value}
                                // onSelect={(val) => value = val}
                            />
                            {/* <ng-autocomplete 
                              [data]="companyArrayData"
                              [searchKeyword]="keyword"
                              (selected)='selectEvent($event)'
                              (inputChanged)='onChangeSearch($event)'
                              (inputFocused)='onFocused($event)'
                              [itemTemplate]="itemTemplate"
                              [notFoundTemplate]="notFoundTemplate">                                 
                            </ng-autocomplete> */}
                             
                            {/* <ng-template #itemTemplate let-item>
                            <a [innerHTML]="item.name"></a>
                            </ng-template> */}
                             
                            {/* <ng-template #notFoundTemplate let-notFound>
                            <div [innerHTML]="notFound"></div>
                            </ng-template> */}
                            </div>


                         
                        </div>
  
                      </div>
  
  
  
                  </div>
  
                
  
  
                </div>
              </div>
  
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


