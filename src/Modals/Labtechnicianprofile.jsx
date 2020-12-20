import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'
import { arrayBufferToBase64, getBase64} from '../utils/utils'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 

import styles from './Labtechnicianprofile.module.css';

 export const Labtechnicianprofile=(props) => {

    
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
      let loadResponse = await Api.getLabtechnicianProfile(load,props.doctorid); 
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
            setImageValue('https://previews.123rf.com/images/dxinerz/dxinerz1801/dxinerz180102964/93710577-scientist-medical-laboratory-icon-vector-image-can-also-be-used-for-professionals-suitable-for-web-a.jpg');
          }


        }
    };

    let dataobj = {};
    getDoctorsList(dataobj);


}, []);

const Update_LabTechnicianProfile = async () => {
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
      formData.append('charges', data.charges);
      formData.append('area', data.area);
      formData.append('id', data.id);
      formData.append('participantID', data.participantID);
      formData.append('description', data.description);
    let loadResponse = await Api.Update_LabTechnicianProfile(formData,props.doctorid);
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
                        <div className="modal-header" style={{ height: '47px', background: 'linear-gradient(to right, #39b49a 0%, #1d86df 100%)' }}>
                            <button type="button" className="close" onClick={props.closeVerifyOTPPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
                            <p className="cc popupheaderheading"><i className="fa fa-medkit"></i><span style={{ marginLeft: '5px' }}> Welcome
                                &nbsp;<span style={{color:'white'}}> Patient &nbsp;[{data.name}]</span></span>
                            </p>
                        </div>
                        <div className="overlay"></div>
                        <div className="popupContainer">
                            <div className="containerBlock">
                                <div className="formSection">
                                    <div className="container">
                                        <h2 className="text-center"></h2>
                                        <div className="row justify-content-center">
                                            <div className="col-8">
                                                <div className="card" style={{ border: 'transparent!important' }}>
                                                    <div className="card-body p-3">
                                                        <div className="form-group">
                                                            <div className="input-group mb-2">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" id="name" name="name" onChange={InputEvent} value={data.name} disabled
                                                                    placeholder="Name" formControlName="name" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group mb-2">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                                                </div>
                                                                <input type="email" className="form-control" id="email" name="email" onChange={InputEvent} value={data.email} disabled
                                                                    placeholder="Patient123@gmail.com" formControlName="email" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <div className="input-group mb-2">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" id="phoneno" maxlength="10" name="phoneno" onChange={InputEvent} value={data.phoneno} disabled
                                                                    placeholder="Phone No" formControlName="phoneno" />                          </div>
                                                        </div>
                                                        
                                                        
                                                        <div className="form-group">
                                                            <div className="input-group mb-2">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="fa fa-inr text-info"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" id="charges" name="charges" onChange={InputEvent} value={data.charges}
                                                                    placeholder="Charges" formControlName="charges" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group mb-2">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="fa fa-address-card-o text-info"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" id="area" name="area" onChange={InputEvent} value={data.area}
                                                                    placeholder="Area" formControlName="area" />
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-md-4">
                                                <img className="otpPopup-img" src={getImageValue} alt="passwordsetImg" style={{ borderRadius: '10%' }} />
                                                <div className="form-group">
                                                    <div className="input-group mb-2">
                                                        <input type="file" id="myfile" className="form-control" name="file" onChange={uploadFile} style={{ padding: '5px', fontSize: '11px', border: '2px dashed #0000ff9c', backgroundColor: '#36afa37a', height: '39px' }} />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-12">
                                                <div className="card" style={{ border: 'transparent!important', flexDirection: 'column-reverse' }}>
                                                    <div className="card-header p-0">
                                                    </div>
                                                    <div className="card-body p-3">

                                                        <div className="form-group">
                                                            <div className="input-group mb-2">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="fa fa-comment text-info"></i></div>
                                                                </div>
                                                                <textarea id="Description" name="description" onChange={InputEvent} value={data.description} formControlName="description" cols="80" rows="2"
                                                                    className="form-control" placeholder="Description"></textarea>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="buttonSection">
                            <div className="text-center">
                                <input type="submit" onClick={Update_LabTechnicianProfile} style={{ width: '200px', fontWeight: '600' }} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal> 
            </form>
          </>   
        
    )

}


