import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'
import { arrayBufferToBase64, getBase64 } from '../utils/utils'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './ImageUpload.module.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HomePageImageSize } from "../constants/constants";

export const ImageUpload = (props) => {


  const [locationEnum, setLocationEnum] = useState('');
  const [preferredImageSize, setPreferredImageSize] = useState('');

  const animatedComponents = makeAnimated();


  const [getImageValue, setImageValue]= useState('');

  const [UploadFile, setUploadFile]= useState([]);
  const [UploadFileName, setUploadFileName]= useState('');

  const  uploadFile = (fileInput) => {
    if (fileInput.length === 0) {
      return;
    }
    //setUploadFile(<Array<File>>fileInput.target.files);
    
    setUploadFile(fileInput.target.files);
    setUploadFileName(fileInput.target.files[0].name);
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
  

  var imageForDataArray = [
    { "id": '1', "name": "TopNavImage" },
    { "id": '2', "name": "WhatWeDo" },
    { "id": '3', "name": "Servicesimage1" },
    { "id": '4', "name": "Servicesimage2" },
    { "id": '5', "name": "Servicesimage3" },
    { "id": '6', "name": "Servicesimage4" },
    { "id": '7', "name": "SpecialistClinicimage1" },
    { "id": '8', "name": "SpecialistClinicimage2" },
    { "id": '9', "name": "SpecialistClinicimage3" }
  ];

  useEffect(() => {
    const Get_WebsiteImageByLocationEnum = async (load,locationEnum) => {
      let loadResponse = await Api.Get_WebsiteImageByLocationEnum(load,locationEnum);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        //setTextData(loadResponse.data.textData);
        if (loadResponse.data.image != undefined && loadResponse.data.image.data != undefined) {
          setImageValue(arrayBufferToBase64local(loadResponse.data.image.data.data));//need to update data in base 64
        }
      } else {
        setImageValue('https://i.pinimg.com/originals/8c/8b/37/8c8b3766126753c6d098cdb2e42cff49.png');
      }
    };

    let dataobj = {};
    switch (locationEnum) {
      case "1":
        setPreferredImageSize(HomePageImageSize.TopNavImage)
        break;
      case "2":
        setPreferredImageSize(HomePageImageSize.WhatWeDo)
        break;
      case "3":
        setPreferredImageSize(HomePageImageSize.Servicesimage1)
        break;
      case "4":
        setPreferredImageSize(HomePageImageSize.Servicesimage2)
        break;
      case "5":
        setPreferredImageSize(HomePageImageSize.Servicesimage3)
        break;
      case "6":
        setPreferredImageSize(HomePageImageSize.Servicesimage4)
        break;
      case "7":
        setPreferredImageSize(HomePageImageSize.SpecialistClinicimage1)
        break;
      case "8":
        setPreferredImageSize(HomePageImageSize.SpecialistClinicimage2)
        break;
      case "9":
        setPreferredImageSize(HomePageImageSize.SpecialistClinicimage3)
        break;
    }
    Get_WebsiteImageByLocationEnum(dataobj,locationEnum);

  }, [locationEnum]);


  const SaveUpdate_UploadWebsiteImages = async () => {
    var formData = new FormData();
      formData.append('image', '');
      if (UploadFile.length && UploadFileName) {
        formData.append('newimage', UploadFile[0], UploadFileName);
      } else {
        formData.append('newimage', '');
      }
      formData.append('locationEnum', locationEnum);
    let loadResponse = await Api.SaveUpdate_UploadWebsiteImages(formData);
    if (loadResponse.status) {
      props.closeImageUploadPopup(); 
      } else {
        // setExpertiesArrayData([]);
      }
  };

  return (
    <>
      <form>

        <Modal
          show={props.showImageUploadPopup}
          onHide={props.closeImageUploadPopup}
          backdrop="false"
          keyboard={false}
        >

          <Modal.Body>
            <div className="modal-header" style={{ height: '10px' }}>
              <button type="button" className="close" onClick={props.closeImageUploadPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
            </div>


            <div className="popupContainer">
              <div className="containerBlock">
                <div className="formSection">
                  <div className="container">
                    <h2 className="text-center"></h2>
                    <div className="row justify-content-center">
                      <div className="col-8">

                        <div className="card" style={{ border: 'transparent!important' }}>
                          <div className="card-header p-0">
                            <div className="bg-info text-white text-center py-2">
                              <h3><i className="fa fa-medkit"></i>Change Website Images</h3>
                            </div>
                          </div>


                          <div class="form-group">
                            <label for="exampleFormControlSelect1">ImageChangeFor</label>
                            <select class="form-control" formControlName="locationEnum" onChange={(e) => { setLocationEnum(e.target.value); }}>
                              <option value=""></option>
                              {
                                imageForDataArray.map((opt, ind) => {
                                  console.log(opt)
                                  return (
                                    <option value={opt.id}>{opt.name}</option>
                                  )
                                })
                              }
                            </select>
                          </div>

                          <div class="card-body p-3" style={{backgroundColor:'#eaf1f380'}}>
                            <div class="form-group">
                              <label for="exampleFormControlSelect1">Preferred Size:- &nbsp;</label>
                              <input type="text" disabled formControlName="preferredImageSize" value={preferredImageSize} />
                            </div>
                          </div>

                        </div>

                      </div>
                     

                      <div class="col-md-4">
                      <img className="otpPopup-img" src={getImageValue} alt="passwordsetImg" style={{borderRadius: '10%'}} />

                         {/* <img *ngIf="getImageValue==''" class="otpPopup-img" src="../../../../assets/images/passwordsetImg.png" alt="passwordsetImg"> */}
                        {/* <img  class="otpPopup-img" [src]="getImageValue" alt="passwordsetImg"  style="border-radius: 10%;"> */}
                        <div class="form-group">
                          <div class="input-group mb-2">
                              <input type="file" id="myfile" class="form-control" name="file" onChange={uploadFile}  style={{padding: '5px',fontSize: '11px',border: '2px dashed #0000ff9c',backgroundColor: '#36afa37a',height: '39px'}}/>
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
                <input type="submit" onClick={SaveUpdate_UploadWebsiteImages} style={{ width: '200px', fontWeight: '600' }} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </>

  )

}


