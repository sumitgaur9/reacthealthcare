import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './WebsiteTextData.module.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const WebsiteTextData = (props) => {


  const [locationEnum, setLocationEnum] = useState('');
  const [textData, setTextData] = useState('');

  const animatedComponents = makeAnimated();


  const [takeCareByDataArray, setTakeCareByDataArray] = useState([]);

  useEffect(() => {
    const Get_ExpertiseList = async (load) => {
      let loadResponse = await Api.Get_ExpertiseList(load);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        setTakeCareByDataArray(loadResponse.data);
      } else {
        setTakeCareByDataArray([]);
      }
    };

    let dataobj = {};
    Get_ExpertiseList(dataobj);

  }, []);

  var imageForDataArray =[
    { "id": '1', "name": "TopNavFirstSectionFirstHeading" },
    { "id": '2', "name": "TopNavFirstSectionSecondHeading" },
    { "id": '3', "name": "TopNavSecondSectionFirstHeading" },
    { "id": '4', "name": "TopNavSecondSectionSecondHeading" },
    { "id": '5', "name": "TopNavSecondSectionThirdHeading" },
    { "id": '6', "name": "TopNavSecondSectionFourthHeading" },
    { "id": '7', "name": "TopNavThirdSectionFirstHeading" },
    { "id": '8', "name": "TopNavThirdSectionSecondHeading" },
    { "id": '9', "name": "WhatWeDoFirstHeading" },
    { "id": '10', "name": "WhatWeDoSecondHeading" },
    { "id": '11', "name": "WhatWeDoThirdHeading" },
    { "id": '12', "name": "WhatWeDoFourthHeading" },
    { "id": '13', "name": "WhatWeDoFirstImgHeading" },
    { "id": '14', "name": "WhatWeDoSecondImgHeading" },
    { "id": '15', "name": "WhatWeDoThirdImgHeading" },
    { "id": '16', "name": "WhatWeDoForthImgHeading" },
    { "id": '17', "name": "SpecialistImage1Heading1" },
    { "id": '18', "name": "SpecialistImage1Heading2" },
    { "id": '19', "name": "SpecialistImage1Heading3" },
    { "id": '20', "name": "SpecialistImage2Heading1" },
    { "id": '21', "name": "SpecialistImage2Heading2" },
    { "id": '22', "name": "SpecialistImage2Heading3" },
    { "id": '23', "name": "SpecialistImage3Heading1" },
    { "id": '24', "name": "SpecialistImage3Heading2" },
    { "id": '25', "name": "SpecialistImage3Heading3" },
    { "id": '26', "name": "FooterFisrtSectionHeading1" },
    { "id": '27', "name": "FooterSecondSectionHeading1" },
    { "id": '28', "name": "FooterSecondSectionHeading2" },
    { "id": '29', "name": "FooterSecondSectionHeading3" },
    { "id": '30', "name": "FooterSecondSectionHeading4" },
    { "id": '31', "name": "FooterThirdSectionHeading1" },
    { "id": '32', "name": "FooterThirdSectionHeading2" },
  ];

  useEffect(() => {
    const Get_WebsiteTextDataByLocationEnum = async (load,locationEnum) => {
      let loadResponse = await Api.Get_WebsiteTextDataByLocationEnum(load,locationEnum);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        setTextData(loadResponse.data.textData);
        setLocationEnum(loadResponse.data.locationEnum);
      } else {
        setTextData('');
      }
    };

    let dataobj = {};
    Get_WebsiteTextDataByLocationEnum(dataobj,locationEnum);

  }, [locationEnum]);

  const SaveUpdate_WebsiteTextData = async () => {
    var dataobj = new Object();
    dataobj.textData = textData;
    dataobj.locationEnum = locationEnum;
    let loadResponse = await Api.SaveUpdate_WebsiteTextData(dataobj);
    if (loadResponse.status) {
      props.closeWebsiteTextDataPopup();
    } else {
      // setTakeCareByDataArray([]);
    }
  };

  return (
    <>
      <form>

        <Modal
          show={props.showWebsiteTextDataPopup}
          onHide={props.closeWebsiteTextDataPopup}
          backdrop="false"
          keyboard={false}
        >

          <Modal.Body>
            <div className="modal-header" style={{ height: '10px' }}>
              <button type="button" className="close" onClick={props.closeWebsiteTextDataPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
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
                              <h3><i className="fa fa-medkit"></i>Change Website Text</h3>
                            </div>
                          </div>


                          <div class="form-group">
                            <label for="exampleFormControlSelect1">TextChangeFor</label>
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

                          <div className="form-group">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fa fa-comment text-info"></i></div>
                              </div>
                              <textarea id="textData" name="textData" formControlName="textData" value={textData} onChange={(e) => { setTextData(e.target.value); }} cols="40" rows="3"
                                className="form-control" placeholder="textData"></textarea>
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
                <input type="submit" onClick={SaveUpdate_WebsiteTextData} style={{ width: '200px', fontWeight: '600' }} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </>

  )

}


